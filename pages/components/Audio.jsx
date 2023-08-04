import React from "react";
import Image from "next/image";

const Audio = (props) => {
  const handleDownload = () => {
    const audioUrl = props.soundlink; // Replace with your audio URL

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audio.mp3"; // Specify the filename for the downloaded file
    link.click();
  };
  return (
    <div id="audio">
      <audio controls src={props.soundlink} />
      <button onClick={handleDownload}>Download</button>
      <Image width={500} height={500} src={props.thumbnail} alt="album art" />
      <p>{props.songName}</p> <br />
      <p>{props.artistName}</p>
    </div>
  );
};

export default Audio;
