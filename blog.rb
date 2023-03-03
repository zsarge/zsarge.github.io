#!/usr/bin/env ruby

# this is inspired by https://barf.bt.ht/
# in that the goal is to create a blog, while
# minimizing the amount of code needed to maintain it.

require 'date'
require 'erb'

include ERB::Util

SOURCE_PATH = File.join(__dir__, 'content')
OUTPUT_PATH = File.join(__dir__, 'build')
ARTICLES_PATH = File.join(SOURCE_PATH, 'articles')
CURRENT_YEAR = Time.new.year

DOMAIN_NAME = "zsarge.github.io"

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

def header(title="Zack Sargent's Blog")
  get_template('header.erb').result(binding)
end


def create path
  Dir.mkdir(path) unless Dir.exist?(path)
end

class Article 
  attr_reader :title, :url, :filename, :filepath, :date, :tags, :author, :content, :preview
  def initialize(filepath:)
    @html = nil
    @length_in_minutes = nil
    @filepath = filepath
    @author = 'Zack Sargent'
    @filename = File.basename(filepath, ".md")
    @url = "/articles/#{@filename}.html"
  
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
    @html ||= `pandoc -f markdown -t html --table-of-contents \
    --template \"#{File.join(SOURCE_PATH, 'pandoc-article.html5')}\" \
    --metadata title="#{@title}" \
    --highlight-style espresso <(tail -n +5 \"#{@filepath}\")`
  end

  def save_as_html
    create OUTPUT_PATH
    create File.join(OUTPUT_PATH, 'articles')
    
    File.open(File.join(OUTPUT_PATH, 'articles', "#{@filename}.html"), 'w') do |file|
      file.write get_template('article.erb').result(binding)
    end
  end

  def length_in_minutes
    estimated_time = @content.split(/[^-a-zA-Z]/).size / 200
    @length_in_minutes ||= [estimated_time, 1].max
  end
  
  def reading_time
    "#{length_in_minutes} min#{length_in_minutes == 1 ? '' : ?s}"
  end

  def get_tags_formatted = @tags.map { format_tag(_1) }.join(" ")
  def format_tag(tag) = "<span class=\"tag\"> <a href=\"/tag/#{tag}.html\">#{tag}</a></span>"
  def full_url = "https://#{DOMAIN_NAME}#{@url}"
end

def generate_indicies(articles, tags)
  File.open(File.join(OUTPUT_PATH, 'index.html'), 'w') do |file|
    file.write get_template('index.erb').result(binding)
  end
  File.open(File.join(OUTPUT_PATH, 'tag', "index.html"), 'w') do |file|
    file.write get_template('tags_index.erb').result(binding)
  end
  File.open(File.join(OUTPUT_PATH, 'articles', "index.html"), 'w') do |file|
    file.write get_template('articles_index.erb').result(binding)
  end
end

def generate_tags(tags)
  create File.join(OUTPUT_PATH, "tag")
  for tag_name, articles in tags
    File.open(File.join(OUTPUT_PATH, 'tag', "#{tag_name}.html"), 'w') do |file|
      file.write get_template('tag.erb').result(binding)
    end
  end
end

def generate_blog
  articles = Dir["#{ARTICLES_PATH}/*"].map {|file| Article.new(filepath: file)}
  tags = articles.sort_by{|article| article.date }.reverse

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
    return count_order unless count_order == 0
    return tag_name_2 <=> tag_name_1
  }.reverse

  $footer = get_template('footer.erb').result(binding)
  $articles = get_template('articles.erb').result(binding)
  $tags = get_template('tags.erb').result(binding)

  generate_indicies(articles, tags)
  generate_tags(tags)
end


if ARGV.size == 0
  puts "command not recognized. use --help for details"
else
  case ARGV[0]
  when "help", "--help"
    puts "
Arguments:
    --help
        show this help text
    --generate
        transform the content from ./content into the html files in ./build
    "
  when "generate", "--generate"
    raise 'pandoc could not be found' unless which("pandoc")
    generate_blog
  else 
    puts "command not recognized. use --help for details"
  end
end
