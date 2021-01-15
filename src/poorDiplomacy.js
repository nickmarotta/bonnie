
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const { playMp3, stopPlaying } = require("./utilities/music-player.js");
const songPaths = require("./utilities/song-paths.json");

const client = new Discord.Client();

var shlandsWaitingRoom;
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
        voiceConnection = playMp3(songPaths.hero, shlandsWaitingRoom);
        return;
    } else if (message.content.startsWith(`${prefix}guile`)) {
        voiceConnection = playMp3(songPaths.guile, shlandsWaitingRoom);
        return;
    } else if (message.content.startsWith(`${prefix}chariots`)) {
        voiceConnection = playMp3(songPaths.chariots, shlandsWaitingRoom);
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
    const NICK_USER_ID = 223303701152923649
    const AL_USER_ID = 223597907444498432;
    const STEVE_USER_ID = 126889288624373760;

    const userHasEnteredChannel = (oldMember.channelID === null || oldMember.channelID === undefined) && newMember.channelID !== null;

    if(userHasEnteredChannel) {
      if(newMember.id == STEVE_USER_ID && allowGuileWhenSteveConnects)
        voiceConnection = playMp3(songPaths.guile, shlandsWaitingRoom); 
      if(newMember.id == AL_USER_ID)
        voiceConnection = playMp3(songPaths.dmx, shlandsWaitingRoom); 
    }
  });

  await client.login(token);

  //Instantiates the channel object for the first channel we have on the server
  shlandsWaitingRoom = await client.channels.fetch("222587777529675777");

}

// ***** UTILITIES ******

exports.setAllowGuileWhenSteveConnects = async (arg) => {
  if (arg == 'true' || arg == 1) {
    allowGuileWhenSteveConnects = true;
    console.log('Set steveGuileTheme toggle to true');
  } else if (arg == 'false' || arg == 0) {
    allowGuileWhenSteveConnects = false;
    console.log('Set steveGuileTheme toggle to false');
  } 
} 

//This allows the API to play songs without understanding channel or connections.
exports.playMp3 = async (songPath) => {
  voiceConnection = playMp3(songPath, shlandsWaitingRoom); 
}
