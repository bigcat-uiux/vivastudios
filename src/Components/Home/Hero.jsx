import React from "react";
import { useNavigate } from "react-router-dom";
import GameFeaturedPost from "./GameFeaturedPost";
// import BGWomen from './images/women-vr.png';
// import styled from 'styled-components';

// const BGImg = styled.div`
//     background-image: url(${props => props});
// `;

const Hero = (props) => {
    const navigate = useNavigate();

    const bgImg = (props.hero.hpsBgImg.sourceUrl) ? props.hero.hpsBgImg.sourceUrl : '';
    const btnShowHide = props.hero.hpsShowHideButtons;
    let letStartBtn;
    let ourGamesBtn;

    if(btnShowHide === 'yes'){
        letStartBtn = <button onClick={() => navigate("/contact") } className="btn" >Lets Start</button>;
        ourGamesBtn = <button onClick={() => navigate("/games") } className="btn btn-transparent" >Discover our games!</button>;
    }

    if(props.hero.hpsShowHideBtnSect !== 'yes'){
        return (
            <section id={props.hero.hpsId} className="banner">
                <BGSt img={bgImg}/>
                <div className="inner flex">
                    <div className="test"></div>
                    <div className="vs--inner-content w12 w-md-6">
                        <h3 className="vs--hero-title">{props.hero.hpsTitle}</h3>
                        <div
                            className="vs--hero-desc"
                            dangerouslySetInnerHTML={{__html: props.hero.hpsContent}}
                        />
                        <div className="vs--inner-btn-wrp flex">
                            {letStartBtn}
                            {ourGamesBtn}
                        </div>
                    </div>
                    <div className="vs--inner-img w12 w-md-6 relative">
                        <div className="featured-post-wrap w12 absolute">
                            <span className="txt bold txt-upper txt-white">Feautured Image</span>
                            <GameFeaturedPost />
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#161853" fillOpacity="1" d="M0,288L80,293.3C160,299,320,309,480,272C640,235,800,149,960,138.7C1120,128,1280,192,1360,224L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </section>
        )
    }else{
        return null;
    }
}

const BGSt = (props) =>{
    const bgImgStyle = {
        backgroundImage: `url(${props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1,
    }
    return(
        <div className="bg" style={bgImgStyle}></div>
    )
}

export default Hero;