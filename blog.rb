#!/usr/bin/env ruby

# this is inspired by https://barf.bt.ht/
# in that the goal is to create a blog, while
# minimizing the amount of code needed to maintain it.

require 'date'
require 'erb'

SOURCE_PATH = File.join(__dir__, 'content')
OUTPUT_PATH = File.join(__dir__, 'build')
ARTICLES_PATH = File.join(SOURCE_PATH, 'articles')
CURRENT_YEAR = Time.new.year

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

def set_up_files
  def touch file_name
    File.open(File.join(SOURCE_PATH, file_name), 'w') { |file| file.write("") }
  end

  dirs = [SOURCE_PATH, OUTPUT_PATH]
  raise "directories exist" if dirs.any? { Dir.exist? _1 }
  dirs.each { Dir.mkdir _1 }

  %w(header.erb footer.erb).each { touch _1 }

  Dir.mkdir(ARTICLES_PATH)

  touch File.join(ARTICLES_PATH, 'article_1.md')
end

class Article 
  attr_reader :title, :url, :filename, :filepath, :date, :tags, :author, :content
  def initialize(filepath:)
    @html = nil
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

      raise "Line 4 must be blank in #{filename}" unless file.readline.strip == ''

      @content = file.read # get rest of file
    end
  end

  def to_html
    @html || @html = `pandoc -f markdown -t html --highlight-style espresso <(tail -n +4 \"#{@filepath}\")`
  end

  def save_as_html
    def create path
      Dir.mkdir(path) unless Dir.exist?(path)
    end
    create OUTPUT_PATH
    create File.join(OUTPUT_PATH, 'articles')
    
    File.open(File.join(OUTPUT_PATH, 'articles', "#{@filename}.html"), 'w') do |file|
      file.write get_template('article.erb').result(binding)
    end
  end

  private
  def get_template(name) = ERB.new(File.read(File.join(SOURCE_PATH, name)))
  def format_tag(tag) = "<span class=\"tag\">#{tag}</span>"
  def get_tags_formatted = @tags.map { format_tag(_1) }.join(" ")
end

def generate_blog
  Dir["#{ARTICLES_PATH}/*"].each do |file|
    article = Article.new(filepath: file)
    article.save_as_html
  end
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
    --initialize | --init
        create all the expected files and directories
    "
  when "init", "--init", "initialize", "--initialize"
    set_up_files
  when "generate", "--generate"
	raise 'pandoc could not be found' unless which("pandoc")
    generate_blog
  else 
    puts "command not recognized. use --help for details"
  end
end
