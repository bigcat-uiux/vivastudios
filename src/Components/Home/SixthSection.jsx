import { gql, useQuery } from "@apollo/client";
import HomeLatestPost from "../../Components/PostPage/HomeLatestPost";

const GET_SIXTH_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsSthGrp {
                    fieldGroupName
                    hpsSthContent
                    hpsSthId
                    hpsSthShowHideBtnSect
                    hpsSthShowHideButtons
                    hpsSthTitle
                }
            }
        }
    }
`;

const SixthSection = () => {
    const {loading, error, data} = useQuery(GET_SIXTH_QUERY);
    const HomeSixthFound = Boolean(data?.homeSettings.homeSettings.hpsSthGrp);

    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeSixthFound ? (
                <p>Section not be found.</p>
            ) : (
                <SixthSecLayout section={data.homeSettings.homeSettings.hpsSthGrp}/>
            )}
        </>
    )
}

const SixthSecLayout = (props) => {
    if(props.section.hpsSthShowHideBtnSect !== 'yes'){
        return (
            <section className="sixth-section vs-home-sec" id={props.section.hpsFrthId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsSthTitle} desc={props.section.hpsSthContent} />
                    <SectionContent button={props.section.hpsSthShowHideButtons}/>
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

const SectionContent = (props) => {
    return (
        <>
            <HomeLatestPost />
            { props.button === 'yes' ? (
                <div className="btnWrap flex flex-center">
                    <SectionBTN />
                </div>
            ) : ''}
        </>
    )
}

const SectionBTN = () => {
    return (
        <>
            <button className="btn">View All</button>
        </>
    )
}

export default SixthSection;