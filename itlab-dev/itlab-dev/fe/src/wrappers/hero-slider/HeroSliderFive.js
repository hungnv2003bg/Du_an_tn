import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
// import sliderData from "../../data/hero-sliders/hero-slider-five.json";
import HeroSliderFiveSingle from "../../components/hero-slider/HeroSliderFiveSingle.js";
import SlideApi from "../../api/slide/SlideApi.js";

const HeroSliderFive = ({ spaceLeftClass, spaceRightClass }) => {
    const [slides, setSlides] = useState([]);
    const params = {
        effect: "fade",
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        renderPrevButton: () => (
            <button className="swiper-button-prev ht-swiper-button-nav">
                <i className="pe-7s-angle-left" />
            </button>
        ),
        renderNextButton: () => (
            <button className="swiper-button-next ht-swiper-button-nav">
                <i className="pe-7s-angle-right" />
            </button>
        ),
    };
    useEffect(() => {
        const getSlideFrontEnd = async () => {
            try {
                const { slides } = await SlideApi.getSlideFrontEnd();
                setSlides(
                    slides.map((slide) => {
                        return {
                            id: slide.slideId,
                            title: slide.title,
                            subtitle: slide.subTitle,
                            url: slide.url,
                            image: slide.slideImage,
                        };
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };
        getSlideFrontEnd();
    }, []);
    return (
        <div
            className={`slider-area ${spaceLeftClass ? spaceLeftClass : ""} ${
                spaceRightClass ? spaceRightClass : ""
            }`}
        >
            <div className="slider-active nav-style-1">
                <Swiper {...params}>
                    {slides &&
                        slides.map((single, key) => {
                            return (
                                <HeroSliderFiveSingle
                                    data={single}
                                    key={key}
                                    sliderClass="swiper-slide"
                                />
                            );
                        })}
                </Swiper>
            </div>
        </div>
    );
};

HeroSliderFive.propTypes = {
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string,
};

export default HeroSliderFive;
