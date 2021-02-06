# Import everything needed to edit video clips
from moviepy.editor import *

# Load myHolidays.mp4 and select the subclip 00:00:50 - 00:00:60
clip = VideoFileClip("strike.mp4")


# LATER, IN ANOTHER SCRIPT, RECOVER THESE TRAJECTORIES
from moviepy.video.tools.tracking import Trajectory
# If ever you only have one object being tracked, recover it with
traj1, = Trajectory.load_list('strike_track_1.txt')
traj2, = Trajectory.load_list('strike_track_2.txt')
traj3, = Trajectory.load_list('strike_track_3.txt')

usertext1 = "Pins"
usertext2 = "Ball"
usertext3 = "Arm"

# Generate a text clip. You can customize the font, color, etc.
txt_1 = TextClip("usertext1", fontsize=70, color='white')
txt_2 = TextClip("usertext2", fontsize=70, color='white')
txt_3 = TextClip("usertext3", fontsize=70, color='white')

# Say that you want it to appear 10s at the center of the screen
txt_1 = txt_1.set_pos(traj1).set_duration(5.367)
txt_2 = txt_2.set_pos(traj2).set_duration(5.900)
txt_3 = txt_3.set_pos(traj3).set_duration(4.600)

# Overlay the text clip on the first video clip
video = CompositeVideoClip([clip, txt_1, txt_2, txt_3], size=(1280, 720))

# Write the result to a file (many options available !)
video.write_videofile("testOutput.mp4")