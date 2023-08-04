export default async function handler(req, res) {
  try {
    redirect("/");
    const songURL = req.query.url;
    const song = await client.getSongInfo(songURL);
    const stream = await song.downloadProgressive();
    const filePath = `./${song.title}.mp3`;

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    const writer = stream.pipe(fs.createWriteStream(filePath));
    writer.on("finish", () => {
      console.log("Finished writing song!");
      res.download(filePath, () => {
        fs.unlink(filePath, (err) => {
          if (err) console.error(err);
          console.log("Temp file deleted.");
          redirect("/");
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while downloading the song.");
  }

  return (
    <div>
      <h1>Download</h1>
    </div>
  );
}
