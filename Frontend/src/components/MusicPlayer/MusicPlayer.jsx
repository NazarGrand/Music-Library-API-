import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.scss";

import imgDrag from "../../assets/images/ImagineDragons.png";
import imgPrevSong from "../../assets/images/PreviousSong.svg";
import imgPlay from "../../assets/images/PlayMusic.svg";
import imgPause from "../../assets/images/Pause.svg";
import imgNextSong from "../../assets/images/NextSong.svg";
import imgRepeat from "../../assets/images/Repeat.svg";
import imgVolumeOn from "../../assets/images/Volume.svg";
import imgVolumeOff from "../../assets/images/VolumeOff.svg";
import imgRepeatOnce from "../../assets/images/Repeat-once.svg";

const MusicPlayer = () => {
  const song = {
    url: "https://trustpilot.digitalshopuy.com/spotify-data/downloads/aeoM8-ljVfQ.m4a",
    title: "10 poverhiv",
  };
  const [currentSong, setCurrentSong] = useState(song);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  const [isEndingSong, setIsEndingSong] = useState(false);

  const [isInfinite, setIsInfinite] = useState(false);

  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);
  const [isVolume, setIsVolume] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const audioElem = useRef();
  const clickMusicTrack = useRef();
  const clickVolume = useRef();

  const [currentTime, setCurrentTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isVolume) {
      audioElem.current.volume = volume / 100;
    } else {
      audioElem.current.volume = 0;
    }
  }, [volume, isVolume]);

  const PlayPause = () => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = !prevIsPlaying;
      if (!newIsPlaying && isEndingSong) {
        setIsEndingSong(false);
        setCurrentSong({
          ...currentSong,
          progress: 0,
        });
        audioElem.current.currentTime = 0;
      }
      return newIsPlaying;
    });
  };

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;

    const minutes = Math.floor(currentTime / 60);
    const remainingSeconds = Math.floor(currentTime % 60);
    setCurrentTime({ minutes, seconds: remainingSeconds });
    if (!isMoving) {
      setCurrentSong({
        ...currentSong,
        progress: (currentTime / duration) * 100,
        length: duration,
      });
    }

    if (currentTime === duration) {
      setIsPlaying(false);
      setIsEndingSong(true);
    }
  };

  const DisableUserSelect = () => {
    document.body.style.userSelect = "none";
  };

  const EnableUserSelect = () => {
    document.body.style.userSelect = "initial";
  };

  const mouseDownTrack = (e) => {
    document.addEventListener("mousemove", mouseMoveTrack);
    document.addEventListener("mouseup", mouseUpTrack);
    DisableUserSelect();
  };

  const mouseUpTrack = (e) => {
    document.removeEventListener("mousemove", mouseMoveTrack);
    document.removeEventListener("mouseup", mouseUpTrack);

    clickAudio(e);

    EnableUserSelect();
  };

  const clickAudio = (e) => {
    setIsMoving(false);
    const rect = clickMusicTrack.current.getBoundingClientRect();
    const offsetX = e.pageX - rect.left;
    const width = rect.width;

    const divprogress = (offsetX / width) * 100;
    const prog = divprogress > 100 ? 100 : divprogress < 0 ? 0 : divprogress;
    setCurrentSong({
      ...currentSong,
      progress: prog,
    });
    audioElem.current.currentTime = (prog / 100) * currentSong.length;
  };

  const mouseMoveTrack = (e) => {
    if (e.buttons === 1) {
      setIsMoving(true);
      const rect = clickMusicTrack.current.getBoundingClientRect();
      const offsetX = e.pageX - rect.left;
      const width = rect.width;

      const divprogress = (offsetX / width) * 100;
      const prog = divprogress > 100 ? 100 : divprogress < 0 ? 0 : divprogress;
      setCurrentSong({
        ...currentSong,
        progress: prog,
      });
    }
  };

  const iconRepeat = !isInfinite ? imgRepeat : imgRepeatOnce;

  const imgVolume = isVolume ? imgVolumeOn : imgVolumeOff;

  const handleClickVolume = () => {
    setIsVolume((prevIsVolume) => {
      const newIsVolume = !prevIsVolume;
      if (!newIsVolume && volume !== 0) {
        setPrevVolume(volume);
        setVolume(0);
      } else {
        setVolume(prevVolume);
      }
      return newIsVolume;
    });
  };

  const clickVolumeTrack = (e) => {
    const rect = clickVolume.current.getBoundingClientRect();
    const offsetX = e.pageX - rect.left;
    const width = rect.width;
    let progress = (offsetX / width) * 100;

    if (progress < 0) {
      progress = 0;
    } else if (progress > 100) {
      progress = 100;
    }
    const newVolume = progress > 100 ? 100 : progress < 0 ? 0 : progress;

    if (newVolume === 0) {
      setIsVolume(false);
    } else {
      setIsVolume(true);
    }

    setVolume(newVolume);
  };

  const mouseDownVolume = (e) => {
    document.addEventListener("mousemove", mouseMoveVolume);
    document.addEventListener("mouseup", mouseUpVolume);
    clickVolumeTrack(e);
    DisableUserSelect();
  };

  const mouseUpVolume = () => {
    document.removeEventListener("mousemove", mouseMoveVolume);
    document.removeEventListener("mouseup", mouseUpVolume);
    EnableUserSelect();
  };

  const mouseMoveVolume = (e) => {
    setIsHovered(true);
    if (e.buttons === 1) {
      clickVolumeTrack(e);
    }
  };

  return (
    <div className="player">
      <img className="player__image-song" src={imgDrag} alt="imgTrack" />

      <div className="player__title">
        <p className="player__title-song">Whatever It Takes</p>

        <p className="player__title-author">Imagine Dragons</p>
      </div>

      <button className="player__button-prev">
        <img
          className="player__img-prev-next"
          src={imgPrevSong}
          alt="previous"
        />
      </button>

      {isPlaying ? (
        <button className="player__button-pause-play" onClick={PlayPause}>
          <img className="player__img-icon" src={imgPause} alt="pause" />
        </button>
      ) : (
        <button className="player__button-pause-play" onClick={PlayPause}>
          <img className="player__img-icon" src={imgPlay} alt="pause" />
        </button>
      )}

      <button className="player__button-next">
        <img className="player__img-prev-next" src={imgNextSong} alt="next" />
      </button>

      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />

      <div className="player__track-song">
        <div className="player__current-time">
          <p className="player__current-time-title">
            {currentTime.minutes}:
            {currentTime.seconds < 10
              ? `0${currentTime.seconds}`
              : currentTime.seconds}
          </p>
        </div>

        <div
          className="player__block-track"
          ref={clickMusicTrack}
          onMouseDown={mouseDownTrack}
          onMouseMove={mouseMoveTrack}
          onMouseUp={mouseUpTrack}
        >
          <div className="player__track">
            <div
              className="player__seek-bar"
              style={{ width: `${currentSong.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="player__current-time">
          <p className="player__current-time-title">
            {Math.floor(currentSong.length / 60)}:
            {Math.floor(currentSong.length % 60)}
          </p>
        </div>
      </div>

      <div className="player__block-track-volume">
        {isHovered && (
          <div
            className="player__track-volume"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="player__clickarea-volume"
              ref={clickVolume}
              onClick={clickVolumeTrack}
              onMouseDown={mouseDownVolume}
              onMouseMove={mouseMoveVolume}
              onMouseUp={mouseUpVolume}
            >
              <div className="player__track-volume--area">
                <div
                  className="player__change-volume"
                  style={{ width: `${volume}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <button
          className="player__button-volume"
          onClick={handleClickVolume}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img className="player__img-volume" src={imgVolume} alt="volume" />
        </button>
      </div>

      <button
        className="player__button-repeat"
        onClick={() => setIsInfinite(!isInfinite)}
      >
        <img className="player__img-icon" src={iconRepeat} alt="repeat" />
      </button>
    </div>
  );
};

export default MusicPlayer;
