import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const GameScreenShot = (props) => {

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={12}
                slidesPerView={'auto'}
                className="vs-icon-grp vs-tile-swiper"
            >
                {
                    props.gameScreen.map((img, index) => {
                        if(index !== undefined){
                            return(
                                <SwiperSlide key={index}>
                                    <div key={index} className="vs--icons-item tile">
                                        <img
                                            src={img.sourceUrl}
                                            alt={img.altText} 
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        }else{
                            return null;
                        }
                    })
                }
            </Swiper>
        </>
    )

}

export default GameScreenShot;