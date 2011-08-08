module ControlCenter
  class PerformancesController < ApplicationController
    def show

    end

    def responses
      @stats = {}
      @stats[:total_runtime] = Response.where(:created_at.gte => Time.now - 1.hour).asc(:created_at).map do |response|
        [(response.created_at.utc.to_f + response.created_at.utc_offset)*1000, response.total_runtime]
      end
      @stats[:view_runtime] = Response.where(:created_at.gte => Time.now - 1.hour).asc(:created_at).map do |response|
        if response.respond_to?("view_runtime")
          [(response.created_at.utc.to_f + response.created_at.utc_offset)*1000, response.view_runtime]
        end
      end
      @stats[:mongo_runtime] = Response.where(:created_at.gte => Time.now - 1.hour).asc(:created_at).map do |response|
        if response.respond_to?("mongo_runtime")
          [(response.created_at.utc.to_f + response.created_at.utc_offset)*1000, response.mongo_runtime]
        end
      end

      respond_to do |format|
        format.json { render :json => @stats }
      end
    end
  end
end
