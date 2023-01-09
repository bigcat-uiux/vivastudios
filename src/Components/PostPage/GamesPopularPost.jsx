import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const GET_GAMES_POPULAR_POST = gql`
    query GamesPopularPost {
        games(where: {orderby: {field: SLUG, order: ASC}}) {
            nodes {
                slug
                title
                gamesPopularPost {
                    setPopularPost
                }
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

const GamesPopularPost = () => {
    const {loading, error, data} = useQuery(GET_GAMES_POPULAR_POST);

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
                <CPTPPost page={data.games.nodes}/>
            )}
        </>
    )
}

const CPTPPost = (props) => {
    const CPTNodes = props.page;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        window.addEventListener('resize', () => {
            const ismobile = window.innerWidth < 768;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false)
    }, [isMobile]);
    return (
        <div className="popularpost games-list">
            {isMobile ? <GamesMobileSlider postGames={CPTNodes}/> : <GamesTabletToDesktopSlider postGames={CPTNodes}/>}
        </div>
    )
}

const GamesTabletToDesktopSlider = (postGames) => {
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination,  A11y]}
                spaceBetween={24}
                slidesPerView={"auto"}
                className="vs-icon-grp vs-tile-swiper"
            >
            {
                postGames.postGames.map((feat, key) => {
                    if(feat.gamesPopularPost.setPopularPost === true){
                        if(key > 0 && key < 9) {
                            return (
                                <SwiperSlide key={key}>
                                    { (key % 2) ? 
                                        <Link to={`/games/${feat.slug}`}>
                                            <div className="tiles small-tiles">
                                                <img
                                                    src={feat.featuredImage.node.sourceUrl}
                                                    alt={feat.featuredImage.node.altText} 
                                                    key={key}
                                                />
                                            </div>
                                        </Link>
                                        : '' }
                                </SwiperSlide>
                            )
                        }else{
                            return (
                                <SwiperSlide key={key}>
                                    <Link to={`/games/${feat.slug}`}>
                                        <div className="tiles big-tiles">
                                            <img
                                                src={feat.featuredImage.node.sourceUrl}
                                                alt={feat.featuredImage.node.altText} 
                                                key={key}
                                            />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        }
                    }else{
                        return null;
                    }
                })
                // if(key > 0 && key < 7) {
                //     return(
                    
                //         <img
                //             src={feat.featuredImage.node.sourceUrl}
                //             alt={feat.featuredImage.node.altText} 
                //             key={key}
                //         />
                //     )
                // }else{
                //     return (
                //         <>
                //             <img
                //                 src={feat.featuredImage.node.sourceUrl}
                //                 alt={feat.featuredImage.node.altText} 
                //                 key={key}
                //             />
                //         </>
                //     )
                // }
            }
            </Swiper>
        </>
    )
}

const GamesMobileSlider = (postGames) => {
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination,  A11y]}
                spaceBetween={24}
                slidesPerView={"auto"}
                className="vs-icon-grp vs-tile-swiper"
            >
                {
                    postGames.postGames.map((feat, key) => {
                        if(feat.gamesPopularPost.setPopularPost === true){
                            return (
                                <SwiperSlide key={key}>
                                    <Link to={`/games/${feat.slug}`}>
                                        <div className="tiles big-tiles">
                                            <img
                                                src={feat.featuredImage.node.sourceUrl}
                                                alt={feat.featuredImage.node.altText} 
                                                key={key}
                                            />
                                        </div>
                                    </Link>
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

export default GamesPopularPost;