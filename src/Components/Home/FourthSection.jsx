import { gql, useQuery } from "@apollo/client";

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

const SectionContent = ({ group, button }) => {
    let btnWrp = ( button === 'yes') ? <SectionBTN /> : '';
    return (
        <div className="vs-sec-content flex flex-center flex-column">
            <span>Benefits of the Remote game server (rgs)</span>
            <div className="vs-icon-grp flex-row flex-center">
                {
                    group.map((icons, key) => {
                        return(
                            <div className="vs--icons-item vs--cards" key={key}>
                                <FourthIcons icons={icons} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="btnWrap">
                {btnWrp}
            </div>
        </div>
    )
}

const FourthIcons = (props) => {
    return ( 
        <>
            { props.icons.hpsIconsImg ? (
                <img
                    src={props.icons.hpsIconsImg.sourceUrl}
                    alt={props.icons.hpsIconsImg.altText} 
                />
            ) : null}
            <span className="vs--icons-lbl lbl">{props.icons.hpsIconsLabel}</span>
            <span className="vs-sec-desc">{props.icons.hpsIconsLabel}</span>
        </>
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