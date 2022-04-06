import React, { useEffect, useState } from 'react';
import { SliderData } from './SliderData';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { FaBasketballBall } from 'react-icons/fa';

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const delay = 2500;

    useEffect(() => {
        setTimeout (() => setCurrent((current) => current === length - 1 ? 0 : current + 1),
        delay);
        return () => {};
    }, [current]);

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className="slider">
            <GoArrowLeft className="left-arrow" onClick={prevSlide} />
            <GoArrowRight className="right-arrow" onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide.active' : 'slide'} key={index}>
                        {index === current && (<img src={slide.image} alt="travel image" className="image"/>)}
                        <div className="text-on-image">
            <FaBasketballBall/> 
            <FaBasketballBall/>
            </div>
                    </div>
                )
            })}
        </section>
    );
};

export default ImageSlider;
