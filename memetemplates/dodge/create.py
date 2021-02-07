# Import everything needed to edit video clips
from moviepy.editor import *
import sys
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))
cwd = os.getcwd()
# this is just for mine, we can make this an env or something
os.chdir("/home/jason/HOTH2021/memetemplates/dodge")
print(cwd)
clip = VideoFileClip("dodge.mp4")

from moviepy.video.tools.tracking import Trajectory
traj1, = Trajectory.load_list('dodge_track_1.txt')
traj2, = Trajectory.load_list('dodge_track_2.txt')
traj3, = Trajectory.load_list('dodge_track_3.txt')

# # Testing text
# usertext1 = "Person1"
# usertext2 = "Person2"
# usertext3 = "Flyer"

# Actual text
usertext1 = sys.argv[1]
usertext2 = sys.argv[2]
usertext3 = sys.argv[3]

# Generate text clips
txt_1 = TextClip(usertext1, fontsize=50, font='Helvetica-Bold', color='red')
txt_2 = TextClip(usertext2, fontsize=50, font='Helvetica-Bold', color='black')
txt_3 = TextClip(usertext3, fontsize=60, font='Helvetica-Bold', color='blue')

# Track text to motion data in txt files
txt_1 = txt_1.set_position(traj1).set_duration(3.129)
txt_2 = txt_2.set_position(traj2).set_duration(3.129)
txt_3 = txt_3.set_position(traj3).set_duration(3.129)

# Overlay all text onto original video, export in 720p
video = CompositeVideoClip([clip, txt_1, txt_2, txt_3], size=(1280, 720))

# Write the result to a file
video.write_videofile("./../output/"+ sys.argv[4] + ".mp4")
print("finish")