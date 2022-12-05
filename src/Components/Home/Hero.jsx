import React from "react";
import { useNavigate } from "react-router-dom";
import GameFeaturedPost from "./GameFeaturedPost";
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
                    <div className="vs--inner-content w50">
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
                    <div className="vs--inner-img w50">
                        img here
                        <GameFeaturedPost />
                    </div>
                </div>
                <div className="bg bg-curve"/>
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

// const letStartBtnWrp = () => {
    
//     return (
//         <>

//         </>
//     )
// }

export default Hero;