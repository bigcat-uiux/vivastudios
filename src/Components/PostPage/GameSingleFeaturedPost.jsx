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

const GameSingleFeaturedPost = () => {
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
                <SingleFeaturedPostCPT page={data.games.nodes} title={data.games.title}/>
            )}
        </>
    )
}

const SingleFeaturedPostCPT = (props) =>{
    const CPTNodes = props.page;
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={12}
                slidesPerView={'auto'}
                className="vs-icon-grp vs-tile-swiper"
            >
            {
                CPTNodes.map((feat, key) => {
                    if(feat.featuredPost.setFeaturedPost === true){
                        return(
                            <SwiperSlide key={key}>
                                <div className="vs--icons-item tile">
                                    <img
                                        src={feat.featuredImage.node.sourceUrl}
                                        alt={feat.featuredImage.node.altText} 
                                    />
                                    <span className="bold txt-small txt-capitalize font-poppins">{feat.title}</span>
                                </div>
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

export default GameSingleFeaturedPost;