import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_THIRD_QUERY = gql`
    query HomePage {
        homeSettings {
            homeSettings {
                hpsThrdGrp {
                    fieldGroupName
                    hpsThrdContent
                    hpsThrdId
                    hpsThrdShowHideBtnSect
                    hpsThrdShowHideButtons
                    hpsThrdTitle
                    hpsThrdImg {
                        altText
                        sourceUrl
                    }
                    hpsThrdIconsGrp {
                        fieldGroupName
                        hpsIconsLabel
                        hpsIconsImg {
                            altText
                            sourceUrl
                        }
                    }
                }
            }
        }
    }
`;

const ThirdSection = () => {
    const {loading, error, data} = useQuery(GET_THIRD_QUERY);
    const HomeThirdFound = Boolean(data?.homeSettings.homeSettings.hpsThrdGrp);
    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeThirdFound ? (
                <p>Section not be found.</p>
            ) : (
                <ThirdSecLayout section={data.homeSettings.homeSettings.hpsThrdGrp}/>
            )}
        </>
    )
}

const ThirdSecLayout = (props) =>{
    if(props.section.hpsThrdShowHideBtnSect !== 'yes'){
        return (
            <section className="third-section vs-home-sec" id={props.section.hpsSecId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsThrdTitle} desc={props.section.hpsThrdContent}/>
                    <SectionContent image={props.section.hpsThrdImg} icon={props.section.hpsThrdIconsGrp} button={props.section.hpsThrdShowHideButtons}/>
                </div>
            </section>
        )
    }else{
        return null;
    }
}

const SectionHeader = (props) => {
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

const SectionContent = ({image, icon, button}) => {
    let btnWrp = ( button === 'yes') ? <SectionBTN /> : '';
    return(
        <div className="vs-sec-content flex flex-center">
            <div className="vs--content-one vs--content flex-center">
                <div className="vs-icon-grp">
                    {
                        icon.map((icon, key) => {
                            if(key <= 3)
                                return(
                                    <div className="vs--icons-item" key={key}>
                                        <Icons icon={icon}/>
                                    </div>
                                )
                            
                        })
                    }
                </div>
            </div>
            <div className="vs--content-two vs--content flex-center flex-column">
                { image ? (
                    <img
                        src={image.sourceUrl}
                        alt={image.altText} 
                    />
                ) : null}
                <div className="btnWrap">
                    {btnWrp}
                </div>
            </div>
            <div className="vs--content-three vs--content flex-center">
                <div className="vs-icon-grp">
                        {
                            icon.map((icon, key) => {
                                if(key >= 4)
                                    return(
                                        <div className="vs--icons-item" key={key}>
                                            <Icons icon={icon}/>
                                        </div>
                                    )
                                
                            })
                        }
                </div>
            </div>
        </div>
    )
}

const Icons = (icon) => {
    return(
        <>
            <div className="vs--icons-img circle">
                { icon.icon.hpsIconsImg ? (
                    <img
                        src={icon.icon.hpsIconsImg.sourceUrl}
                        alt={icon.icon.hpsIconsImg.altText} 
                    />
                ) : null}
            </div>
            <span className="vs--icons-lbl lbl">{icon.icon.hpsIconsLabel}</span>
        </>
    )
}

const SectionBTN = () => {
    return (
        <>
            <button className="btn">Email Us</button>
        </>
    )
}

export default ThirdSection;
