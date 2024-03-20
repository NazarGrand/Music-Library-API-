import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.scss";

import * as trackService from "../../services/TrackService";

import imgLoading from "../../assets/images/LoadingTrack.svg";
import imgPrevSong from "../../assets/images/PreviousSong.svg";
import imgPlay from "../../assets/images/PlayMusic.svg";
import imgPause from "../../assets/images/Pause.svg";
import imgNextSong from "../../assets/images/NextSong.svg";
import imgRepeat from "../../assets/images/Repeat.svg";
import imgVolumeOn from "../../assets/images/Volume.svg";
import imgVolumeOff from "../../assets/images/VolumeOff.svg";
import imgRepeatOnce from "../../assets/images/Repeat-once.svg";
import { useMusicContext } from "../../context/MusicProvider";

const MusicPlayer = () => {
  const { currentSong, setCurrentSong } = useMusicContext();
  const { volume, setVolume } = useMusicContext();

  console.log(currentSong);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  const [isEndingSong, setIsEndingSong] = useState(false);

  const [isInfinite, setIsInfinite] = useState(false);

  const [isVolume, setIsVolume] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const audioElem = useRef();
  const clickMusicTrack = useRef();
  const clickVolume = useRef();

  const [currentTime, setCurrentTime] = useState(null);

  const [durationSong, setDurationSong] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const track = await trackService.getTrackUrl(
        currentSong.titleSong,
        currentSong.titleAuthor
      );

      const trackUrl = track !== null ? track.url : null;

      console.log(trackUrl);
      setCurrentSong({ ...currentSong, url: trackUrl });

      setCurrentTime(null);
      setDurationSong(null);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("suka");
    if (currentSong !== null) fetchData();
  }, [currentSong?.titleSong, currentSong?.titleAuthor]);

  useEffect(() => {
    if (!loading) {
      if (isPlaying) {
        if (isEndingSong && isInfinite) {
          setCurrentSong({
            ...currentSong,
            progress: 0,
          });
          audioElem.current.currentTime = 0;
        }
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }
  }, [isPlaying, loading, isEndingSong, isInfinite]);

  useEffect(() => {
    if (!loading) {
      if (isVolume) {
        audioElem.current.volume = volume.currentVolume / 100;
      } else {
        audioElem.current.volume = 0;
      }
    }
  }, [volume, isVolume, loading]);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isEndingSong) {
      setIsEndingSong(false);
      setCurrentSong({
        ...currentSong,
        progress: 0,
      });
      audioElem.current.currentTime = 0;
    }
  };

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;

    const minutes = Math.floor(currentTime / 60);
    const remainingSeconds = Math.floor(currentTime % 60);
    setCurrentTime({ minutes, seconds: remainingSeconds });

    const minutesSong = Math.floor(duration / 60);
    const remainingSecondsSong = Math.floor(duration % 60);
    setDurationSong({ minutes: minutesSong, seconds: remainingSecondsSong });
    if (!isMoving) {
      setCurrentSong({
        ...currentSong,
        progress: (currentTime / duration) * 100,
        length: duration,
      });
    }

    if (currentTime === duration) {
      setIsEndingSong((prevIsEndingSong) => {
        const newIsEndingSong = !prevIsEndingSong;

        if (newIsEndingSong && !isInfinite) setIsPlaying(false);

        return newIsEndingSong;
      });
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
        setVolume({ prevVolume: volume.currentVolume, currentVolume: 0 });
      } else {
        // setVolume(prevVolume);
        setVolume({ ...volume, currentVolume: volume.prevVolume });
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

    //setVolume(newVolume);
    setVolume({ ...setVolume, currentVolume: newVolume });
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
      <img
        className="player__image-song"
        src={currentSong.imgSong}
        alt="imgTrack"
      />

      <div className="player__title">
        <p className="player__title-song">{currentSong.titleSong}</p>

        <p className="player__title-author">{currentSong.titleAuthor}</p>
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

      {loading ? (
        <img
          className="player__loading-img"
          src={imgLoading}
          alt="loading"
        ></img>
      ) : (
        <>
          <audio
            src={currentSong.url}
            ref={audioElem}
            onTimeUpdate={onPlaying}
          />
          <div className="player__track-song">
            {currentTime && (
              <div className="player__current-time">
                <p className="player__current-time-title">
                  {currentTime.minutes}:
                  {currentTime.seconds < 10
                    ? `0${currentTime.seconds}`
                    : currentTime.seconds}
                </p>
              </div>
            )}

            {currentTime && (
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
            )}

            {durationSong && (
              <div className="player__current-time">
                <p className="player__current-time-title">
                  {durationSong.minutes}:
                  {durationSong.seconds < 10
                    ? `0${durationSong.seconds}`
                    : durationSong.seconds}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {!loading && currentTime && (
        <>
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
                      style={{ width: `${volume.currentVolume}%` }}
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
              <img
                className="player__img-volume"
                src={imgVolume}
                alt="volume"
              />
            </button>
          </div>
        </>
      )}

      {!loading && currentTime && (
        <button
          className="player__button-repeat"
          onClick={() => setIsInfinite(!isInfinite)}
        >
          <img className="player__img-icon" src={iconRepeat} alt="repeat" />
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
