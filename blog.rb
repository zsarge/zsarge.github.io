#!/usr/bin/env ruby

# this is inspired by https://barf.bt.ht/
# in that the goal is to create a blog, while
# minimizing the amount of code needed to maintain it.

require 'date'

SOURCE_PATH = File.join(__dir__, 'content')
OUTPUT_PATH = File.join(__dir__, 'build')
ARTICLES_PATH = File.join(SOURCE_PATH, 'articles')

def set_up_files
  def touch file_name
    File.open(File.join(SOURCE_PATH, file_name), 'w') { |file| file.write("") }
  end

  dirs = [SOURCE_PATH, OUTPUT_PATH]
  raise "directories exist" if dirs.any? { Dir.exist? _1 }
  dirs.each { Dir.mkdir _1 }

  %w(header.html footer.html).each { touch _1 }

  Dir.mkdir(ARTICLES_PATH)

  touch File.join(ARTICLES_PATH, 'article_1.md')
end

class Article 
  attr_reader :title, :url, :filename, :date, :tags, :author, :content
  def initialize(filepath:)
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
        @tags = $1.gsub(/[[:space:]]/, '').split(',')
      else
        raise "Invalid tags in '#{filename}'"
      end

      raise "Line 4 must be blank in #{filename}" unless file.readline.strip == ''
      raise "Line 5 must be blank in #{filename}" unless file.readline.strip == ''

      @content = file.read # get rest of file
    end
  end
end

def generate_blog
  Dir["#{ARTICLES_PATH}/*"].each do |file|
    p Article.new(filepath: file)
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
    generate_blog
  else 
    puts "command not recognized. use --help for details"
  end
end
