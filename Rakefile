# encoding: UTF-8
require "rubygems"
begin
  require "bundler/setup"
rescue LoadError
  puts "You must `gem install bundler` and `bundle install` to run rake tasks"
end

require "rake"
require "rdoc/task"
require "rake/testtask"

Rake::TestTask.new(:test) do |t|
  t.libs << "lib"
  t.libs << "test"
  t.test_files = Dir.glob("test/**/*_test.rb")
  t.verbose = false
end

task :default => :test

RDoc::Task.new do |rdoc|
  rdoc.rdoc_dir = "rdoc"
  rdoc.title    = "Concen"
  rdoc.options << "--line-numbers" << "--inline-source"
  rdoc.rdoc_files.include("README.rdoc")
  rdoc.rdoc_files.include("lib/**/*.rb")
end
