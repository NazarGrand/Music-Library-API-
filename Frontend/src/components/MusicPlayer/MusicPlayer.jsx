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

  const [isInfinite, setIsInfinite] = useState(false);

  const [volume, setVolume] = useState(10);
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
    setIsPlaying(!isPlaying);
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
  };

  const clickAudio = (e) => {
    const width = clickMusicTrack.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    setCurrentSong({
      ...currentSong,
      progress: divprogress,
    });
    audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
    setIsMoving(false);
  };

  const mouseMoveAudio = (e) => {
    if (e.buttons === 1) {
      setIsMoving(true);
      const width = clickMusicTrack.current.clientWidth;
      const offset = e.nativeEvent.offsetX;

      const divprogress = (offset / width) * 100;
      setCurrentSong({
        ...currentSong,
        progress: divprogress,
      });
    }
  };

  const iconRepeat = !isInfinite ? imgRepeat : imgRepeatOnce;

  const imgVolume = isVolume ? imgVolumeOn : imgVolumeOff;

  const clickVolumeTrack = (e) => {
    const width = clickVolume.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const progress = (offset / width) * 100;
    setVolume(progress > 100 ? 100 : progress < 0 ? 0 : progress);
  };

  const mouseMoveVolume = (e) => {
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
          className="player__track"
          ref={clickMusicTrack}
          onClick={clickAudio}
          onMouseDown={clickAudio}
          onMouseMove={mouseMoveAudio}
        >
          <div
            className="player__seek-bar"
            style={{ width: `${currentSong.progress}%` }}
          ></div>
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
              isVolume ? setIsHovered(true) : setIsHovered(false);
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="player__track-volume--area"
              ref={clickVolume}
              onClick={clickVolumeTrack}
              onMouseDown={clickVolumeTrack}
              onMouseMove={mouseMoveVolume}
            >
              <div
                className="player__change-volume"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        )}
        <button
          className="player__button-volume"
          onClick={() => {
            setIsVolume(!isVolume);
            setIsHovered(!isHovered);
          }}
          onMouseEnter={() => {
            isVolume ? setIsHovered(true) : setIsHovered(false);
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
