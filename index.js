const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const path =require("path");

require("dotenv").config();
require('events').EventEmitter.defaultMaxListeners = 15;
// console.log((process.env.BOT_TOKEN))

let connection;
client.once("ready", (data) => {
// console.log(client) 
  console.log("Ready!");
});

client.login(process.env.BOT_TOKEN);

client.on("message", (message) => {
  if (message.content === "!test_con") {
    // message.channel.send('Pong.');
    join_voice(message);
  }
  if (message.content === "!test_dis") {
    message.channel.send("Kuy.");
    dis_voice();
  }
  if (message.content === "!test_talk") {
    talk_voice();
  }
});
client.on("voiceStateUpdate",async  (oldState, newState) => {
    let oldVoice = oldState.channelID; 
    let newVoice = newState.channelID; 
    // console.log("oldVoice:"+oldVoice)
    // console.log("newVoice:"+newVoice)
    if(oldVoice != newVoice && newVoice != null && oldVoice == null){
     await join_voice(newState);
     await talk_voice();
    //  await  dis_voice();
    }
  });


async function join_voice(message) {

  if (message.member.voice.channel) {

    connection = await message.member.voice.channel.join();
  }
}

async function dis_voice() {
  connection.disconnect();
}

function talk_voice(){
    filePath =path.join(__dirname,"voice","test1.mp3")
    const dispatcher =  connection.play(filePath,{
        volume: 0.8,
      });
    // const dispatcher =  connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }));
    dispatcher.on('start', () => {
        // console.log('audio.mp3 is now playing!');
    });
    
    dispatcher.on('finish', () => {
        dis_voice();
        // // console.log('audio.mp3 has finished playing!');
    });
    // Always remember to handle errors appropriately!
    dispatcher.on('error', console.error);
}