exports.playMp3 = async (mp3Path, voiceChannel) => {
    try {
      voiceConnection = await voiceChannel.join();
      const dispatcher = voiceConnection
      .play(mp3Path)
      .on("finish", () => {
        console.log(mp3Path + " finished playing.");
        voiceChannel.leave();
      })
      .on("error", error => {
          console.error(error);
          voiceChannel.leave();
      });

      return voiceConnection;

    } catch (err) {
      console.log("Caught an error while trying to play an mp3.");
      console.log(err);
      return voiceConnection;
    }
  }

exports.stopPlaying = async (voiceConnection) => {
    if (voiceConnection) {
      voiceConnection.dispatcher.end();
      voiceConnection = null;
    } else {
      console.log("No connetion active to stop.");
    }
}