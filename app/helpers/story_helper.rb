module StoryHelper
  def status_select_options
    %w(submit processing finish reject done)
  end

  def point_select_options
    (1..10).to_a
  end
end