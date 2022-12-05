import { gql, useQuery } from "@apollo/client";

const GET_SEVEN_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsSvnGrp {
                  fieldGroupName
                  hpsSvnContent
                  hpsSvnId
                  hpsSvnShowHideBtnSect
                  hpsSvnTitle
                }
            }
        }
    }
`;

const SevenSection = () => {
    const {loading, error, data} = useQuery(GET_SEVEN_QUERY);
    const HomeSevenFound = Boolean(data?.homeSettings.homeSettings.hpsSvnGrp);

    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeSevenFound ? (
                <p>Section not be found.</p>
            ) : (
                <SevenSecLayout section={data.homeSettings.homeSettings.hpsSvnGrp}/>
            )}
        </>
    )
}

const SevenSecLayout = (props) => {
    if(props.section.hpsSvnShowHideBtnSect !== 'yes'){
        return (
            <section className="sixth-section vs-home-sec" id={props.section.hpsSvnId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsSvnTitle} desc={props.section.hpsSvnContent} />
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

export default SevenSection;