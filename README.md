# HOTH2021
Hack off the Hill Project

## Inspiration
As dedicated meme posters by day and avid meme creators by night, we were looking for a central place to create every single meme possible. Although Imgflip and Memeatic are great, they don't offer anything with videos. Kapwing has videos, but they're fake: it's simply a text subtitle over a lame GIF. Thus, we decided to create the SpaceX of meme creation: **Memep4**.

## What it does
Take your memes out of this world with **Memep4** by creating the best motion-tracked memes that exist. Choose from one of many templates, enter some text, and the video is ready for download (under 8MB so your friends on Discord can enjoy it too). It will take whatever text you want and track it onto the template's objects so you can get the attention of girls or gain some Reddit karma (but probably not both).

## How we built it
Our project used only the trendiest technologies, that being Node.js for our backend server and socket.io for communicating with our frontend HTML/CSS. Our light frontend code enabled us to have the flexibility to focus on crafting the best memes and an excellent user experience. Using moviepy and ImageMagick, we edited the video with motion-tracked text from a user input. Express.js served as a tool for routing video requests from the frontend to the backend and included an efficient video streaming and file requesting feature for the videos on the server.

## Challenges we ran into
One of the main challenges was figuring out how to properly take in the user inputs and have that translate into the final video. Because the templates took in different parameters, it was a challenge to make sure the input lines showed up correctly, while also preserving the data for the previously inputted text. Figuring out how to manage the video through frontend and backend was also tough, because the video needed to be edited, rendered, and displayed to the user.

## Accomplishments that we're proud of
Read above. We overcame every single challenge like chads.

## What we learned
Most of the thing we tried were new to us - we learned a lot about JavaScript, Python (mostly moviepy), socket.io, website deployment, and motion tracking.

## What's next for Memep4
It's simple. We want to make more memes, you want to make more memes, everybody wants to make more memes. More hand-crafted templates and text options are already under development.

## Credits
This project was made possible by [William Hsieh](https://github.com/willhsieh), [Jason Tay](https://github.com/jason2020), [Akira Suzuki](https://github.com/asuzukii), and [Trevor Ong](https://github.com/tr89on). 
