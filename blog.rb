#!/usr/bin/env ruby

# this is inspired by https://barf.bt.ht/
# in that the goal is to create a blog, while
# minimizing the amount of code needed to maintain it.

require 'fileutils'
require 'date'
require 'erb'

include ERB::Util

SOURCE_PATH = File.join(__dir__, 'content')
OUTPUT_PATH = File.join(__dir__, 'docs')
ARTICLES_PATH = File.join(SOURCE_PATH, 'blog')
CURRENT_YEAR = Time.new.year

DOMAIN_NAME = "zack.fyi"

# Cross-platform way of finding an executable in the $PATH.
#
#   which('ruby') #=> /usr/bin/ruby
# 
# FROM: https://stackoverflow.com/a/5471032
def which(cmd)
  exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
  ENV['PATH'].split(File::PATH_SEPARATOR).each do |path|
    exts.each do |ext|
      exe = File.join(path, "#{cmd}#{ext}")
      return exe if File.executable?(exe) && !File.directory?(exe)
    end
  end
  nil
end

def get_template(name) 
   ERB.new(File.read(File.join(SOURCE_PATH, name)))
end

def navbar
  get_template('navbar.erb').result()
end

def header(title="Zack Sargent's Blog")
  get_template('header.erb').result(binding)
end


def create path
  Dir.mkdir(path) unless Dir.exist?(path)
end

GitCommit = Struct.new(:author, :date, :message, :changes)

class Article 
  attr_reader :title, :url, :filename, :filepath, :date, :tags, :author, :content, :preview
  def initialize(filepath:)
    @html = nil
    @length_in_minutes = nil
    @git_commits = nil
    @filepath = filepath
    @author = 'Zack Sargent'
    @filename = File.basename(filepath, ".md")
    @url = "/blog/#{@filename}.html"
  
    File.open(filepath) do |file|
      # title
      if file.readline =~ /^Title: (.*)$/
        @title = $1.strip
      else
        raise "Invalid title in '#{filename}'"
      end

      if file.readline =~ /^Preview: (.*)$/
        @preview = $1.strip
      else
        raise "Invalid preview in '#{filename}'"
      end

      # date
      if file.readline =~ /^Date: (\d{4}\-\d{1,2}\-\d{1,2})$/
        @date = Date.parse($1)
      else
        raise "Invalid date in '#{filename}'"
      end

      # tags
      if file.readline =~ /^Tags: (.*)$/
        @tags = $1.split(',').map{ _1.strip }
      else
        raise "Invalid tags in '#{filename}'"
      end

      raise "Line 5 must be blank in #{filename}" unless file.readline.strip == ''

      @content = file.read # get rest of file
    end
  end

  def to_html
    @html ||= `pandoc -f markdown -t html --table-of-contents  \
    --template \"#{File.join(SOURCE_PATH, 'pandoc-article.html5')}\" \
    --metadata title="#{@title}" \
    --highlight-style pygments <(tail -n +5 \"#{@filepath}\")`
  end

  def save_as_html
    create OUTPUT_PATH
    create File.join(OUTPUT_PATH, 'blog')
    
    File.open(File.join(OUTPUT_PATH, 'blog', "#{@filename}.html"), 'w') do |file|
      file.write get_template('blog.erb').result(binding)
    end
  end

  def length_in_minutes
    estimated_time = @content.split(/[^-a-zA-Z]/).size / 300
    @length_in_minutes ||= [estimated_time, 1].max
  end
  
  def reading_time
    "#{length_in_minutes} min#{length_in_minutes == 1 ? '' : ?s}"
  end

  def commit_history
    return @git_commits if @git_commits
    history = `git log --format="---commit-start---%n%an%n%aI%n%s" --shortstat  -- #{@filepath}`
    @git_commits = history.split("\n").each_slice(6).map { |lines|
      raise "Malformed git history" unless lines.first == "---commit-start---"
      GitCommit.new(lines[1], DateTime.parse(lines[2]), lines[3], lines[5].strip)
    }.reject { |commit|
      commit.date < @date # ignore edits before publication date
    }
  end

  def edit_times
    commit_history.map(&:date)
  end

  def get_tags_formatted = @tags.map { format_tag(_1) }.join(" ")
  def format_tag(tag) = "<a href=\"/tag/#{tag}.html\" class=\"tag\">#{tag}</a>"
  def full_url = "https://#{DOMAIN_NAME}#{@url}"
end

def build_template(from:, to:, args: nil)
  File.open(File.join(OUTPUT_PATH, *to), 'w') do |file|
    if args
      file.write get_template(from).result_with_hash(args)
    else
      file.write get_template(from).result(binding)
    end
  end
end

def generate_indicies(articles, tags)
  build_template from: 'index.erb', to: %w(index.html)
  build_template from: 'contact.erb', to: %w(contact.html)
  build_template from: 'tags_index.erb', to: %w(tag index.html)
  build_template from: 'blog_index.erb', to: %w(blog index.html)
end

def generate_tags(tags)
  create File.join(OUTPUT_PATH, "tag")
  for tag_name, articles in tags
    build_template from: 'tag.erb', to: ["tag", "#{tag_name}.html"], args: {tag_name:, articles:}
  end
end

def generate_blog
  articles = Dir["#{ARTICLES_PATH}/*"].map {|file| Article.new(filepath: file)}
  articles.sort_by!{|article| article.date }.reverse!

  tags = Hash.new { |h, k| h[k] = [] }

  articles.each do |article|
    article.save_as_html
    article.tags.each do |tag|
      tags[tag] << article
    end
  end


  tags = tags.sort { |(tag_name_1, articles_1), (tag_name_2, articles_2)| 
    # sort by count first, then alphabetically
    count_order = articles_1.size <=> articles_2.size 
    next count_order unless count_order == 0
    next tag_name_2 <=> tag_name_1
  }.reverse

  $footer = get_template('footer.erb').result(binding)
  $articles = get_template('blogroll.erb').result(binding)
  $tags = get_template('tags.erb').result(binding)

  generate_tags(tags)
  generate_indicies(articles, tags)

  FileUtils.copy_entry(File.join(SOURCE_PATH, 'assets'), File.join(OUTPUT_PATH, 'assets'), preserve: false, remove_destination: true)
end

def prepare filepath # transcode to formats appropriate for the web
  def convert_to_webp target
    without_extension = File.join(File.dirname(target), File.basename(target, ".*" ))
    webp_filename = "#{without_extension}.webp"
    puts `cwebp -mt #{target} -o #{webp_filename}`
  end
  assets_path = File.join(SOURCE_PATH, 'assets')
  unless Dir.glob("#{SOURCE_PATH}/**/#{File.basename(filepath)}")
    FileUtils.cp(filepath, assets_path)
    filepath = File.join(SOURCE_PATH, 'assets', File.basename(filepath))
  end
  convert_to_webp filepath
end


if ARGV.size == 0
  puts "blog.rb: command not recognized. use --help for details"
else
  case ARGV[0]
  when "help", "--help"
    puts "
Arguments:
    --help
        show this help text
    --generate
        transform the content from ./content into the html files in ./build
    --prepare FILEPATH
        take a file, copy it to ./content/assets, and transcode it to web-compatible formats (webp)
    --new FILENAME.md
        generate new blog post with the specified filename. Be sure to include `.md`.
    "
  when "prepare", "--prepare"
    filepath = ARGV[1]
    raise 'blog.rb: filepath must be a file' unless File.exists? filepath
    raise 'blog.rb: cwebp is not installed. consider something like "apt install webp" or "dnf install libwebp-tools"' unless which 'cwebp'
    prepare filepath
  when "generate", "--generate"
    raise 'blog.rb: pandoc could not be found' unless which 'pandoc'
    generate_blog
  when "version", "-version", "--version"
    puts "blog.rb version 0.1.0"
    puts "by Zack Sargent"
  when "new", "--new"
    raise 'No file name provided. (e.g. "new-article.md")' unless ARGV[1]
    filename = File.join(ARTICLES_PATH, ARGV[1])
    puts "blog.rb: generating basic article in \"#{filename}\""
    File.open(filename, 'w') do |file|
      file.write "Title: TEMP
Preview: TEMP
Date: #{Date.today.iso8601}
Tags: TEMP

Hello World!
"
    end
  else 
    puts "blog.rb: command not recognized. use --help for details"
  end
end
