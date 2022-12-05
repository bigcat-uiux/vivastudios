import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const GET_FEATURED_POST = gql`
    query FeaturedPost {
        games(where: {orderby: {field: TITLE, order: ASC}}) {
            nodes {
                featuredPost {
                    setFeaturedPost
                }
                slug
                title
                featuredImage {
                    node {
                    altText
                    sourceUrl
                    }
                }
            }
        }
    }
`;

const GameFeaturedPost = () => {
    const {loading, error, data} = useQuery(GET_FEATURED_POST);

    const FeaturedCPTFound = Boolean(data?.games);
    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !FeaturedCPTFound ? (
                <p>Post could not be found.</p>
            ) : (
                <FeaturedPostCPT page={data.games.nodes}/>
            )}
        </>
    )
}

const FeaturedPostCPT = (props) =>{
    const CPTNodes = props.page;
    return (
        <div className="featuredSwiper">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
            {
                CPTNodes.map((feat, key) => {
                    if(feat.featuredPost.setFeaturedPost === true){
                        return(
                            <SwiperSlide key={key}>
                                <img
                                    src={feat.featuredImage.node.sourceUrl}
                                    alt={feat.featuredImage.node.altText} 
                                />
                            </SwiperSlide>
                        )
                    }else{
                        return null;
                    }
                })
            }
            </Swiper>
        </div>
    )
}

export default GameFeaturedPost;