#!/usr/bin/env ruby

require 'pp'
require 'csv'
require 'byebug'
require 'json'

#@people = []
#@docs = []
#@countries = []

csv_rows = CSV.table("./data/en.csv")

countries = {}
docs = {}
people = {}
@stories = []

csv_rows.group_by{|r| r[:id]}.each_pair do |story_id, rows|
  next if story_id == "X"

  puts "Parsing entry ##{story_id}..."

  story = {:id => story_id}
  puts "created story #{story}"

  story_docs = {}

  docs[story_id] ||= []
  people[story_id] ||= {}

  puts "iterating over rows"
  rows.each do |row|
    case row[:fieldname]
    when "story-title"
      story[:title] = row[:text]
    when "story-subtitle"
      story[:subtitle] = row[:text]
    when "story-narrative"
      story[:narrative] = row[:text]
    when "story-narrative-summary"
      story[:summary] = row[:text]
    when "story-biography"
      story[:biography] = row[:text]
    when /story-country-(\d)-(.*$)/
      pos = $1
      story_field = $2.to_sym
      if story_field == :code
        story[:country_code] = row[:text]
      end
      if story_field == :code
        story[:country_name] = row[:text]
      end
    when /story-document-(\d)-(.*$)/
      story_doc_id = $1
      story_field = $2.to_sym

      story_docs[story_doc_id] ||= {}
      story_docs[story_doc_id][story_field] = row[:text]
    when /data-person-(\d)-(.*$)/
      pos = $1
      story_field = $2.to_sym
      people[story_id] ||= {}
      people[story_id][story_field] = row[:text]
      people[story_id][:pos] = pos
    end

    cc = story[:country_code]
    cn = story[:country_name]

    if !cc.nil? && !cn.nil?
      countries[cc] = cn
    end

    @stories << story
  end
  story_docs.each do |doc_pair|
      sd_id = doc_pair.first
      doc_data = doc_pair.last
      doc_data[:pos] = sd_id
      docs[story_id] << doc_data
  end

end

entries = @stories.group_by{|s| s[:id]}

puts "Countries found: #{countries.size}."
puts
puts "... #{entries.size} total entries"
puts


entries.each do |id, entities|
  puts "Entry ##{id} has:"
  entities.uniq!
  byebug
  puts " - #{entities.size} entities"
  puts entities.first
  puts
  puts " - #{docs[id].size} docs"
  puts docs[id].first
end

