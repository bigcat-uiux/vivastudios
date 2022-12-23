import { gql, useQuery } from "@apollo/client";

const GET_EIGHT_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsEightGrp {
                    fieldGroupName
                    hpsEghtId
                    hpsEghtTitle
                    hpsEghtContent
                    hpsEghtIconsGrp {
                        fieldGroupName
                        hpsEghtIconsImg {
                            altText
                            sourceUrl
                        }
                        hpsEghtIconsLabel
                    }
                    hpsEghtShowHideBtnSect
                }
            }
        }
    }
`;

const EightSection = () => {
    const {loading, error, data} = useQuery(GET_EIGHT_QUERY);
    const HomeEightFound = Boolean(data?.homeSettings.homeSettings.hpsEightGrp);

    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeEightFound ? (
                <p>Section not be found.</p>
            ) : (
                <EightSecLayout section={data.homeSettings.homeSettings.hpsEightGrp}/>
            )}
        </>
    )
}

const EightSecLayout = (props) => {
    if(props.section.hpsEghtShowHideBtnSect !== 'yes'){
        return (
            <section className="eight-section vs-home-sec" id={props.section.hpsEghtId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsEghtTitle} desc={props.section.hpsEghtContent}/>
                    <SectionContent group={props.section.hpsEghtIconsGrp}/>
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
                        <span className="vs-sec-desc flex flex-center" dangerouslySetInnerHTML={{__html:props.desc}} />
                    ) : null
                }
            </div>
        )
    }
}

const SectionContent = (props) => {
    return (
        <div className="vs-icon-grp flex align-center justify-between">
        {
            props.group.map((icons, key) => {
                return (
                    <div className="vs--icons-item" key={key}>
                        { icons.hpsEghtIconsImg ? (
                                <img
                                    src={icons.hpsEghtIconsImg.sourceUrl}
                                    alt={icons.hpsEghtIconsImg.altText} 
                                />
                            ) : null}
                    </div>
                )
            })
        }
        </div>
    )
}

export default EightSection;
