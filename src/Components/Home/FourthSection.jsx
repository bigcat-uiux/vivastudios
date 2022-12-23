import React, {useState, useEffect} from "react";
import { gql, useQuery } from "@apollo/client";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const GET_FOURTH_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsFrthGrp {
                    hpsFrthContent
                    hpsFrthIconsGrp {
                      fieldGroupName
                      hpsIconsDesc
                      hpsIconsImg {
                        altText
                        sourceUrl
                      }
                      hpsIconsLabel
                    }
                    fieldGroupName
                    hpsFrthId
                    hpsFrthShowHideBtnSect
                    hpsFrthShowHideButtons
                    hpsFrthTitle
                }
            }
        }
    }
`;

const FourthSection = () => {
    const {loading, error, data} = useQuery(GET_FOURTH_QUERY);
    const HomeFourthFound = Boolean(data?.homeSettings.homeSettings.hpsFrthGrp);

    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeFourthFound ? (
                <p>Section not be found.</p>
            ) : (
                <FourthSecLayout section={data.homeSettings.homeSettings.hpsFrthGrp}/>
            )}
        </>
    )
}

const FourthSecLayout = (props) => {
    if(props.section.hpsFrthShowHideBtnSect !== 'yes'){
        return (
            <section className="fourth-section vs-home-sec bg-gray" id={props.section.hpsFrthId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsFrthTitle} desc={props.section.hpsFrthContent} />
                    <SectionContent group={props.section.hpsFrthIconsGrp} button={props.section.hpsFrthShowHideButtons}/>
                </div>
            </section>
        )
    }else{
        return null;
    }
}

const SectionHeader = (props) => {
    if(props.title !== null && props.desc.length > 0){
        return (
            <div className="vs-sec-header">
            {
                props.title ? (
                    <h1 className="flex flex-center sec-title txt-upper">{props.title}</h1>
                ) : null
            }
            {
                props.desc ? (
                    <span className="vs-sec-desc flex flex-center" 
                    dangerouslySetInnerHTML={{__html:props.desc}} />
                ) : null
            }
            </div>
        )
    }
}

const SectionContent = ({ group, button }) => {
    let btnWrp = ( button === 'yes') ? <SectionBTN /> : '';
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        window.addEventListener('resize', () => {
            const ismobile = window.innerWidth < 768;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false)
    }, [isMobile]);
    return (
        <div className={`vs-sec-content flex flex-column ${isMobile ? "align-start" : " flex-center"}`}>
            <span className="txt">Benefits of the Remote game server (rgs)</span>
            { isMobile ? <SliderMode group={group} /> :  <Desktop group={group}/> }
            <div className="btnWrap">
                {btnWrp}
            </div>
        </div>
    )
}

const SliderMode = (props) => {
    return(
        <>
            <Swiper
                modules={[Navigation, Pagination,  A11y]}
                spaceBetween={24}
                slidesPerView={"auto"}
                className="vs-icon-grp vs-tile-swiper"
            >
            {
                props.group.map((icons, key) => {
                    return(
                        <SwiperSlide key={key}>
                            <FourthIcons icons={icons} key={key}/>
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
        </>
    )
}

const Desktop = (props) => {
    return(
        <div className="vs-icon-grp flex-row flex-center">
            {
                props.group.map((icons, key) => {
                    return (
                        <FourthIcons icons={icons} key={key}/>
                    )
                })
            }
        </div>
    )
}

const FourthIcons = (props) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        window.addEventListener('resize', () => {
            const ismobile = window.innerWidth < 768;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false)
    }, [isMobile]);
    return (
        <div className={`vs--icons-item ${isMobile ? "tile vs--tech-slide" : "vs--cards"}`}>
            { props.icons.hpsIconsImg ? (
                <img
                    src={props.icons.hpsIconsImg.sourceUrl}
                    alt={props.icons.hpsIconsImg.altText} 
                />
            ) : null}
            <div className="vs--lbl-details">
                <span className="vs--icons-lbl lbl">{props.icons.hpsIconsLabel}</span>
                <span className="vs-sec-desc">{props.icons.hpsIconsLabel}</span>
            </div>
        </div>
    )
}

const SectionBTN = () => {
    return (
        <>
            <button className="btn">Get started</button>
        </>
    )
}

export default FourthSection;