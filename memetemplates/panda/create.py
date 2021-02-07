# Import everything needed to edit video clips
from moviepy.editor import *
import sys
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))
cwd = os.getcwd()
# this is just for mine, we can make this an env or something
os.chdir("/home/jason/HOTH2021/memetemplates/panda")
print(cwd)
clip = VideoFileClip("panda.mp4")

from moviepy.video.tools.tracking import Trajectory
traj1, = Trajectory.load_list('panda_track_1.txt')
traj2, = Trajectory.load_list('panda_track_2.txt')
traj3, = Trajectory.load_list('panda_track_3.txt')
traj4, = Trajectory.load_list('panda_track_4.txt')

# # Testing text
# usertext1 = "Ball1"
# usertext2 = "Panda"
# usertext3 = "Ball2"
# usertext4 = "Ship"

# Actual text
usertext1 = sys.argv[1]
usertext2 = sys.argv[2]
usertext3 = sys.argv[3]
usertext4 = sys.argv[4]

# Generate text clips
txt_1 = TextClip(usertext1, fontsize=80, font='Helvetica-Bold', color='cyan')
txt_2 = TextClip(usertext2, fontsize=80, font='Helvetica-Bold', color='white')
txt_3 = TextClip(usertext3, fontsize=80, font='Helvetica-Bold', color='cyan')
txt_4 = TextClip(usertext4, fontsize=80, font='Helvetica-Bold', color='white')

# Track text to motion data in txt files
txt_1 = txt_1.set_position(traj1).set_duration(3.254)
txt_2 = txt_2.set_position(traj2).set_duration(9.010)
txt_3 = txt_3.set_position(traj3).set_duration(11.387)
txt_4 = txt_4.set_position(traj4).set_duration(14.067)

# Overlay all text onto original video, export in 720p
video = CompositeVideoClip([clip, txt_1, txt_2, txt_3, txt_4], size=(1280, 720))

# Write the result to a file
video.write_videofile("./../output/"+ sys.argv[5] + ".mp4")
print("finish")
