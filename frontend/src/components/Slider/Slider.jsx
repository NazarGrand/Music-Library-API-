import React, { useEffect, useState } from "react";
import "./Slider.scss";

import imgNotSelectedSlide from "../../assets/images/NotSelectedSlide.svg";
import imgSelectedSlide from "../../assets/images/SelectedSlide.svg";

import { SlideItems, slideLength } from "../../data/InformationSlider";

const Slider = () => {
  const [activeId, setActiveId] = useState(3);

  useEffect(() => {
    const slider = setInterval(
      () =>
        setActiveId((prevState) => {
          const newState = prevState + 1;
          if (newState === slideLength) return 0;
          return newState;
        }),
      5000
    );
    return () => {
      clearInterval(slider);
    };
  }, [activeId]);

  const handleClickBack = () => {
    if (activeId !== 0) {
      setActiveId(activeId - 1);
    } else {
      setActiveId(slideLength - 1);
    }
  };

  const handleClickNext = () => {
    if (activeId !== slideLength - 1) {
      setActiveId(activeId + 1);
    } else {
      setActiveId(0);
    }
  };

  return (
    <div className="slider">
      <button className="slider__switch-button-prev" onClick={handleClickBack}>
        <svg
          className="slider__prev-icon"
          width="30"
          height="38"
          viewBox="0 0 30 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_25_101)">
            <path
              d="M22.9322 36L25.727 33L10.9548 18L25.727 3L22.9322 0L4.96612 18L22.9322 36Z"
              fill="#EE10B0"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_25_101"
              x="0.966125"
              y="0"
              width="28.7608"
              height="44"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_25_101"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_25_101"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </button>

      <div className="slider__content">
        {SlideItems.map((item, index) => {
          let position = "nextSlide";
          if (index === activeId) {
            position = "activeSlide";
          }

          if (index < activeId) {
            position = "lastSlide";
          }

          if (activeId === slideLength - 1 && index === 0) {
            position = "nextSlide";
          }

          if (activeId === 0 && index === slideLength - 1) {
            position = "lastSlide";
          }

          return (
            <div key={index} className={`slider__block-img-${position}`}>
              <div className="slider__image-area">
                <img
                  key={index}
                  className={`slider__image`}
                  src={item.image}
                  alt="artists"
                />
              </div>
            </div>
          );
        })}

        <div className="slider__about">
          <p className="slider__title">{SlideItems[activeId].artistName}</p>

          <p className="slider__description">
            You can have easy access to every song of{" "}
            {SlideItems[activeId].artistName} by just clicking on the{" "}
            <span className="slider__description--pink">Listen now</span>{" "}
            button.
          </p>

          <button className="slider__button-listen-now">
            <span className="slider__text-listen-now">Listen Now</span>
          </button>

          <div className="slider__area-selected">
            {SlideItems.map((item, index) => (
              <button
                className="slider__button-item"
                key={index}
                onClick={() => setActiveId(index)}
              >
                <img
                  src={
                    index === activeId ? imgSelectedSlide : imgNotSelectedSlide
                  }
                  alt="selected"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="slider__switch-button-next" onClick={handleClickNext}>
        <svg
          className="slider__next-icon"
          width="21"
          height="36"
          viewBox="0 0 21 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.95482 0L0.160095 3L14.9322 18L0.160095 33L2.95482 36L20.9209 18L2.95482 0Z"
            fill="#EE10B0"
          />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
