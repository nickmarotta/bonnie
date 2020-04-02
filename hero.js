
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();
var clientInitialized = false;
var voiceConnection;  

exports.iNeedAHero = async () => { 
  if (!clientInitialized) {
    await initializeClient();
  }
  await playINeedAHero();
}

async function initializeClient() {
  client.once("ready", () => {
    console.log("Ready!");
  });

  client.once("reconnecting", () => {
    console.log("Reconnecting!");
  });

  client.once("disconnect", () => {
    console.log("Disconnect!");
  });

  client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(`${prefix}stop`)) {
      if (voiceConnection) {
        voiceConnection.dispatcher.end();
        voiceConnection = null;
      } else {
        console.log("No connetion active to stop.");
      }
      return;
    } else {
      message.channel.send("You need to enter a valid command!");
    }
  });

  await client.login(token);
  clientInitialized = true; 
}

async function playINeedAHero() {
  //instantiates the channel object for "Home"
  const voiceChannel = await client.channels.fetch("222587777529675777");

  try {
    voiceConnection = await voiceChannel.join();
    const dispatcher = voiceConnection
    .play('./resources/i_need_a_hero.mp3')
    .on("finish", () => {
      voiceChannel.leave();
    })
    .on("error", error => {
        console.error(error);
        voiceChannel.leave();
    });
  } catch (err) {
    console.log(err);
    return voiceChannel.send(err);
  }
}
