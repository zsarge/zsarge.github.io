#!/usr/bin/env ruby

# this is inspired by https://barf.bt.ht/
# in that the goal is to create a blog, while
# minimizing the amount of code needed to maintain it.

SOURCE_PATH = File.join(__dir__, 'content')
OUTPUT_PATH = File.join(__dir__, 'build')

def set_up_files
  def touch file_name
    File.open(File.join(SOURCE_PATH, file_name), 'w') { |file| file.write("") }
  end

  dirs = [SOURCE_PATH, OUTPUT_PATH]
  raise "directories exist" if dirs.any? { Dir.exist? _1 }
  dirs.each { Dir.mkdir _1 }

  root_files = %w(index.html header.html footer.html)
  # create empty files
  root_files.each { touch _1 }

  Dir.mkdir(File.join(SOURCE_PATH, "articles"))

  touch "/articles/DELME.md"
end

def generate_blog
  puts "GENERATING"
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
