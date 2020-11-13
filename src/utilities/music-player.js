exports.playMp3 = async (mp3Path, voiceChannel) => {
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

      return voiceConnection;

    } catch (err) {
      console.log(err);
      return voiceChannel.send(err);
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