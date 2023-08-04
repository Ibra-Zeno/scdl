import "@/styles/globals.css";
import Header from "./components/header";
import SearchBar from "./components/Search";
import ErrorMsg from "./components/ErrorMsg";
import Downloader from "./components/Downloader";
import Audio from "./components/Audio";
import React, { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [searchUrl, setSearchUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songInfo, setSongInfo] = useState({
    songName: null,
    artistName: null,
    songLength: null,
    songSize: "",
    thumbnail: "",
    songLink: "",
  });
  const [allSongs, setAllSongs] = useState({});
  const [soundlink, setSoundlink] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  // const trackUrl = "https://soundcloud.com/itvlia-two/underneath";
  const inputUrl = `https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata?track=${encodeURIComponent(
    searchUrl
  )}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3858b9ff85mshdcb435cc6005116p10aa2ajsn2c44674e6602",
      "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(false);
    setIsLoading(true);
    if (searchUrl === "" || !searchUrl.includes("soundcloud")) {
      setIsLoading(false);
      setErrorMsg(true);
      return;
    }
    /*     try {
      const response = await fetch(inputUrl, options);
      if (response.status === 404) {
        setIsLoading(false);
        setErrorMsg(true);
        return;
      }
      const data = await response.json();

      const imgData = await fetch(data["artworkUrl"]);
      const urlData = await fetch(data["audio"][0]["url"]);

      setSongName(data["title"]);
      setArtistName(data["user"]["name"]);

      // console.log(songName, artistName);

      const blob = await urlData.blob();
      const imgBlob = await imgData.blob();

      const fetchedAudio = URL.createObjectURL(blob);
      const fetchedThumbnail = URL.createObjectURL(imgBlob);

      setSoundlink(fetchedAudio);
      setThumbnail(fetchedThumbnail);
      const newSongSize = (blob["size"] / 1000000).toFixed(2);

      const newSongInfo = {
        songName: data["title"],
        artistName: data["user"]["name"],
        songLength: data["durationText"],
        songSize: newSongSize,
        thumbnail: fetchedThumbnail,
        songLink: fetchedAudio,
      };

      setSongInfo(newSongInfo);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
    } */
    setIsLoading(false);
  };

  /*   useEffect(() => {
    console.log(songInfo);
  }, [songInfo]); */
  return (
    <div>
      <Header />
      <SearchBar
        searchUrl={searchUrl}
        setSearchUrl={setSearchUrl}
        onClick={handleSubmit}
      />
      <Downloader searchUrl={searchUrl} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        soundlink && (
          <Audio
          /*             soundlink={soundlink}
            thumbnail={thumbnail}
            songName={songName}
            artistName={artistName} */
          />
        )
      )}
      {errorMsg && <ErrorMsg />}
      <Component {...pageProps} />
    </div>
  );
}
