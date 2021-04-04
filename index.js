const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const path =require("path");
// const voice_list = JSON.parse(process.env.LIST_VOICE);
require("dotenv").config();
require('events').EventEmitter.defaultMaxListeners = 15;
// console.log((process.env.BOT_TOKEN))
const voice_list = JSON.parse(process.env.LIST_VOICE);
let connection;
client.once("ready", (data) => {
  // const voice_list = JSON.parse(process.env.LIST_VOICE);
  console.log(voice_list);
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
  // console.log(newState.member.user.bot)
  if(newState.member.user.bot) return;
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
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function talk_voice(){
    // console.log(voice_list.length)
    let rng = getRandomInt(voice_list.length)
    // console.log(rng)
    selected_voice =voice_list[rng]
    // selected_voice =voice_list[2]
    // console.log(selected_voice)
    filePath =path.join(__dirname,"voice",selected_voice.path)
    const dispatcher =  connection.play(filePath,{
        volume: selected_voice.volume
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