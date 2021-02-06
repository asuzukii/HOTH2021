from moviepy.editor import VideoFileClip
from moviepy.video.tools.tracking import manual_tracking

clip = VideoFileClip("strike.mp4")
# manually indicate 3 trajectories, save them to a file
trajectories = manual_tracking(clip, t1=0, t2=8, fps=2,
                                    nobjects=1, savefile="track.txt")

