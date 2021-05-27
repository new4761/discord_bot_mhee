# Discord_bot_mhee <img src="https://raw.github.com/new4761/discord_bot_mhee/master/icon/mhee_1.jpg" align="right" />
>A first learning write simple javascript bot for [Discord](https://discordapp.com/)<br>
Bot_mhee is bot who auto run voice file from random data in env file that get source from voice folder <br>
We used it to call " Mhee!! " <br>
Bot will active when any one join voice channel (not switch between channel) bot will join and auto run voice data.

## Installation
  1. Craete bot and invite them to you channel => [Creating a Bot Account](https://discordpy.readthedocs.io/en/stable/discord.html)
  2. Create .env file from demo.env and replace your bot token , voice files and volume  :
 
  ```diff
    BOT_TOKEN ="YOU TOKEN"
    LIST_VOICE =[{ "path":"YOU PATH" ,"volume": 0.8 }]
  ```
  3. Install node package:
 
    $ npm install 
    
  4. Run bot client:
  
    $ node index.js
