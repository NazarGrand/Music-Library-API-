import React, { useContext, useEffect, useRef, useState } from "react";
import "./MusicPlayer.scss";

import * as trackService from "../../services/TrackService";
import { musicContextActions } from "../../constants/MusicContextActions";

import imgLoading from "../../assets/images/LoadingTrack.svg";
import imgPrevSong from "../../assets/images/PreviousSong.svg";
import imgPlay from "../../assets/images/PlayMusic.svg";
import imgPause from "../../assets/images/Pause.svg";
import imgNextSong from "../../assets/images/NextSong.svg";
import imgRepeat from "../../assets/images/Repeat.svg";
import imgVolumeOn from "../../assets/images/Volume.svg";
import imgVolumeOff from "../../assets/images/VolumeOff.svg";
import imgRepeatOnce from "../../assets/images/Repeat-once.svg";

import {
  DispatchTrackContext,
  StateTrackContext,
} from "../../context/MusicContext";

const MusicPlayer = () => {
  const {
    trackName,
    trackAuthor,
    trackUrl,
    trackImage,
    trackVolume,
    trackPrevVolume,
    isPlaying,
  } = useContext(StateTrackContext);
  const dispatch = useContext(DispatchTrackContext);

  const [progressSong, setProgressSong] = useState({ progress: 0 });

  const [isMoving, setIsMoving] = useState(false);

  const [isEndingSong, setIsEndingSong] = useState(false);

  const [isInfinite, setIsInfinite] = useState(false);

  const [isVolume, setIsVolume] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const audioElem = useRef(null);
  const clickMusicTrack = useRef();
  const clickVolume = useRef();

  const [currentTime, setCurrentTime] = useState(null);

  const [durationSong, setDurationSong] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: true },
    });
    try {
      const track = await trackService.getTrackUrl(trackName, trackAuthor);

      const trackUrl = track !== null ? track.url : null;

      const action = {
        type: musicContextActions.setTrackUrl,
        payload: {
          trackUrl: trackUrl,
        },
      };
      dispatch(action);

      setCurrentTime(null);
      setDurationSong(null);
    } catch (error) {
      console.error("Error getting data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackName !== null) fetchData();
  }, [trackName]);

  useEffect(() => {
    if (!loading) {
      if (isPlaying) {
        if (isEndingSong && isInfinite) {
          setProgressSong({ ...progressSong, progress: 0 });
          audioElem.current.currentTime = 0;
        }
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }
  }, [isPlaying, loading, isEndingSong, isInfinite, trackUrl]);

  useEffect(() => {
    if (!loading) {
      if (isVolume) {
        audioElem.current.volume = trackVolume / 100;
      } else {
        audioElem.current.volume = 0;
      }
    }
  }, [trackVolume, isVolume, loading]);

  const PlayPause = () => {
    dispatch({
      type: musicContextActions.setIsPlaying,
      payload: { isPlaying: !isPlaying },
    });
    if (isEndingSong) {
      setIsEndingSong(false);
      setProgressSong({ ...progressSong, progress: 0 });
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
      setProgressSong({
        progress: (currentTime / duration) * 100,
        length: duration,
      });
    }

    if (currentTime === duration) {
      const newIsEndingSong = !isEndingSong;

      setIsEndingSong(newIsEndingSong);

      if (newIsEndingSong && !isInfinite) {
        dispatch({
          type: musicContextActions.setIsPlaying,
          payload: { isPlaying: false },
        });
      }
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
    setProgressSong({ ...progressSong, progress: prog });
    audioElem.current.currentTime = (prog / 100) * progressSong.length;

    if (prog === 100) setIsEndingSong(true);
    else setIsEndingSong(false);
  };

  const mouseMoveTrack = (e) => {
    if (e.buttons === 1) {
      setIsMoving(true);
      const rect = clickMusicTrack.current.getBoundingClientRect();
      const offsetX = e.pageX - rect.left;
      const width = rect.width;

      const divprogress = (offsetX / width) * 100;
      const prog = divprogress > 100 ? 100 : divprogress < 0 ? 0 : divprogress;
      setProgressSong({ ...progressSong, progress: prog });
    }
  };

  const iconRepeat = !isInfinite ? imgRepeat : imgRepeatOnce;

  const imgVolume = isVolume ? imgVolumeOn : imgVolumeOff;

  const handleClickVolume = () => {
    const newIsVolume = !isVolume;
    if (!newIsVolume && trackVolume !== 0) {
      dispatch({
        type: musicContextActions.setVolume,
        payload: { trackPrevVolume: trackVolume, trackVolume: 0 },
      });
    } else {
      dispatch({
        type: musicContextActions.setNewVolume,
        payload: { trackVolume: trackPrevVolume },
      });
    }
    setIsVolume(newIsVolume);
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

    dispatch({
      type: musicContextActions.setNewVolume,
      payload: {
        trackVolume: newVolume,
      },
    });
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
      <img className="player__image-song" src={trackImage} alt="imgTrack" />

      <div className="player__title">
        <p className="player__title-song">{trackName}</p>

        <p className="player__title-author">{trackAuthor}</p>
      </div>

      <div className="player__buttons-play">
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
      </div>

      {loading ? (
        <img
          className="player__loading-img"
          src={imgLoading}
          alt="loading"
        ></img>
      ) : (
        <>
          <audio src={trackUrl} ref={audioElem} onTimeUpdate={onPlaying} />
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
                    style={{ width: `${progressSong.progress}%` }}
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
                      style={{ width: `${trackVolume}%` }}
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
