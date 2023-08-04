const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();
var soundcloudr = require("soundcloudr");
import React from "react";
var fs = require("fs");

async function downloadSong() {
  try {
    const songURL = "https://soundcloud.com/itvlia-two/underneath";
    const song = await client.getSongInfo(songURL);
    const stream = await song.downloadProgressive();
    const stream2 = song.downloadHLS();
    /* const connectOptionsSymbol = Symbol.for("connect-options");
    const objectWithHref = stream.client.parser[connectOptionsSymbol];
    const href = objectWithHref.href;
    console.log(href); */
    /* const blob = new Blob([stream], { type: "audio/mpeg" }); // Change the MIME type if necessary

    // Create a URL pointing to the Blob object
    const url = URL.createObjectURL(blob);

    // Create an anchor element and configure it
    const a = document.createElement("a");
    a.href = url;
    a.download = "song.mp3"; // The default filename for the download
    a.style.display = "none";

    // Append the anchor element to the document, click it, then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    const filePath = `./${song.title}.mp3`; */

    /*     res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream"); */

    const filePath = `./${song.title}.mp3`;
    console.log(song.streamURL);
    console.log(song.embed);
    console.log(song.embedURL);
    console.log(song.trackURL);

    const writer = stream.pipe(fs.createWriteStream(filePath));
    writer.on("finish", () => {
      console.log("Finished writing song!");
      process.exit(1);
    });
  } catch (error) {
    console.error(error);
  }
}

const Downloader = () => {
  let url = "https://soundcloud.com/itvlia-two/underneath";
  downloadSong();

  const handleDownload = () => {
    // Call the Express.js route to trigger the download
    // window.open(`/api/download?url=${encodeURIComponent(url)}`, "_blank");
  };
  return (
    <div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Downloader;

/*   client
    .getSongInfo("https://soundcloud.com/itvlia-two/underneath")
    .then(async (song) => {
      const stream = await song.downloadProgressive();
      var fileStream = fs.createWriteStream(`./${song.title}.mp3`);
              const blob = new Blob([fileStream.path], {
          type: "application/octet-stream",
        });
        const fileURL = URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.href = fileURL;
        tempLink.setAttribute("download", "filename.mp3"); // Set desired filename and extension
        tempLink.click();
        URL.revokeObjectURL(fileURL); 

        const writer = stream.pipe(fileStream);
        writer.on("finish", () => {
          console.log("Finished writing song!");
          process.exit(1);
        });
      })
      .catch(console.error); */
