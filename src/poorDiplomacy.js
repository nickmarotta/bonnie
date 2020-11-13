
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();

const heroSongPath = './resources/i_need_a_hero.mp3';
const guileSongPath = './resources/guile.mp3';
const chariotsSongPath = './resources/chariots.mp3';

var clientInitialized = false;
var allowGuileWhenSteveConnects = false; 
var voiceConnection;  

exports.initializeClient = async () => {
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
        stopPlaying();
        return;
    } else if (message.content.startsWith(`${prefix}hero`)) {
        playMp3(heroSongPath);
        return;
    } else if (message.content.startsWith(`${prefix}guile`)) {
        playMp3(guileSongPath);
        return;
    } else if (message.content.startsWith(`${prefix}chariots`)) {
        playMp3(chariotsSongPath);
        return;
    } else if (message.content.startsWith(`${prefix}steve`)) {
        const splitArr = message.content.split(' ');
        this.setAllowGuileWhenSteveConnects(splitArr[1]); 
        return;
    } 
    else {
        message.channel.send("You need to enter a valid command!");
    }
  });

  client.on("voiceStateUpdate", function(oldMember, newMember) {
      ifSteveIsSpeakingPlayGuileTheme(newMember); 
  });

  await client.login(token);
  clientInitialized = true; 
}

async function playMp3(mp3Path) {
  //instantiates the channel object for "Home"
  const voiceChannel = await client.channels.fetch("222587777529675777");

  try {
    voiceConnection = await voiceChannel.join();
    const dispatcher = voiceConnection
    .play(mp3Path)
    .on("finish", () => {
      console.log(mp3Path);
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

async function stopPlaying() {
  if (voiceConnection) {
    voiceConnection.dispatcher.end();
    voiceConnection = null;
  } else {
    console.log("No connetion active to stop.");
  }
}


// ***** UTILITIES ******

async function ifSteveIsSpeakingPlayGuileTheme(user) {
  const STEVE_USER_ID = 126889288624373760;
  const MY_ID = 223303701152923649;
  if (user.id == STEVE_USER_ID && user.channelID != null && allowGuileWhenSteveConnects ) {
    playMp3(guileSongPath); 
  }
}

exports.setAllowGuileWhenSteveConnects = async (arg) => {
  if (arg == 'true' || arg == 1) {
    allowGuileWhenSteveConnects = true;
    console.log('Set steveGuileTheme toggle to true');
  } else if (arg == 'false' || arg == 0) {
    allowGuileWhenSteveConnects = false;
    console.log('Set steveGuileTheme toggle to false');
  } 
} 

exports.getAllowGuileWhenSteveConnects = async () => {
  return allowGuileWhenSteveConnects;
}

//TODO Extract the song paths to an enum, and allow the express server to just use playMp3 
exports.playINeedAHero = async () => {
  playMp3(heroSongPath); 
}
