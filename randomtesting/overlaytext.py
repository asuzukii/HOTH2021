# Import everything needed to edit video clips
from moviepy.editor import *

# Load myHolidays.mp4 and select the subclip 00:00:50 - 00:00:60
clip = VideoFileClip("strike.mp4")


# LATER, IN ANOTHER SCRIPT, RECOVER THESE TRAJECTORIES
from moviepy.video.tools.tracking import Trajectory
# If ever you only have one object being tracked, recover it with
traj, =  Trajectory.load_list('track.txt')


# Generate a text clip. You can customize the font, color, etc.
txt_clip = TextClip("Test text", fontsize=70, color='white')

# Say that you want it to appear 10s at the center of the screen
txt_clip = txt_clip.set_pos('center').set_duration(2)

# Overlay the text clip on the first video clip
video = CompositeVideoClip([clip, txt_clip], size=(1280, 720)))

# Write the result to a file (many options available !)
video.write_videofile("testOutput.mp4")