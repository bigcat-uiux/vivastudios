import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_SECOND_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsSecGrp {
                    fieldGroupName
                    hpsSecContent
                    hpsSecId
                    hpsSecShowHideBtnSect
                    hpsSecShowHideButtons
                    hpsSecTitle
                    hpsSecImg {
                        altText
                        sourceUrl
                    }
                }
            }
        }
    }
`;

const SecondSection = () => {
    const {loading, error, data} = useQuery(GET_SECOND_QUERY);
    const HomeSecondFound = Boolean(data?.homeSettings.homeSettings.hpsSecGrp);
    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeSecondFound ? (
                <p>Section not be found.</p>
            ) : (
                <SecondSecLayout section={data.homeSettings.homeSettings.hpsSecGrp}/>
            )}
        </>
    )
}

const SecondSecLayout = (props) => {
    if(props.section.hpsSecShowHideBtnSect !== 'yes'){
        return (
            <section className="second-section vs-home-sec" id={props.section.hpsSecId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsSecTitle} />
                    <SectionContent image={props.section.hpsSecImg} content={props.section.hpsSecContent} button={props.section.hpsSecShowHideButtons}/>
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

const SectionContent = ({ image, content, button }) => {
    let btnWrp = ( button === 'yes') ? <SectionBTN /> : '';
    return(
        <>
            <div className="vs-sec-content flex">
                <div className="w50">
                { image ? (
                    <img
                        src={image.sourceUrl}
                        alt={image.altText} 
                    />
                ) : null}
                </div>
                <div className="w50">
                    {
                        <div className="page-content" 
                            dangerouslySetInnerHTML={{__html: content}}
                        />
                    }
                    <div className="btnWrap">
                        {btnWrp}
                    </div>
                </div>
            </div>
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

export default SecondSection;