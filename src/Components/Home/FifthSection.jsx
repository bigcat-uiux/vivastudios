import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_FIFTH_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsFthGrp {
                    hpsFthContent
                    hpsFthId
                    hpsFthShowHideBtnSect
                    fieldGroupName
                    hpsFthShowHideButtons
                    hpsFthTitle
                    hpsFthProducts {
                        ... on Game {
                            id
                            featuredImage {
                                node {
                                    altText
                                    sourceUrl
                                }
                            }
                          slug
                          title
                        }
                    }
                }
            }
        }
    }
`;

const FifthSection = () => {
    const {loading, error, data} = useQuery(GET_FIFTH_QUERY);
    const HomeFifthFound = Boolean(data?.homeSettings.homeSettings.hpsFthGrp);

    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !HomeFifthFound ? (
                <p>Section not be found.</p>
            ) : (
                <FifthSecLayout section={data.homeSettings.homeSettings.hpsFthGrp}/>
            )}
        </>
    )
}


const FifthSecLayout = (props) => {
    if(props.section.hpsFthShowHideBtnSect !== 'yes'){
        return (
            <section className="fifth-section vs-home-sec" id={props.section.hpsFrthId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsFthTitle} desc={props.section.hpsFthContent} />
                    <SectionContent group={props.section.hpsFthProducts} button={props.section.hpsFthShowHideButtons}/>
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
    if(group.length > 0){
        return(
            <div className="vs-sec-content flex flex-center flex-column">
                <div className="vs-prod-grp flex">
                    {
                        group.map((prod, key) => {
                            console.log(prod)
                            return (
                                <div className="vs--prod-item" key={key}>
                                    { prod.featuredImage ? (
                                            <img
                                                src={prod.featuredImage.node.sourceUrl}
                                                alt={prod.featuredImage.node.altText} 
                                            />
                                        ) : null}
                                        <div className="vs--hidden-prod">
                                            <div className="vs--hidden-btn flex flex-column justify-center">
                                                <button className="btn">Play Demo</button>
                                                <Link className="btn btn-transparent" to={`/games/${prod.slug}`}>view Details</Link>
                                            </div>
                                        </div>
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
    }else{
        return null;
    }
}

const SectionBTN = () => {
    return (
        <>
            <Link className="btn" to={`/games`}>Explore our games!</Link>
        </>
    )
}

export default FifthSection;