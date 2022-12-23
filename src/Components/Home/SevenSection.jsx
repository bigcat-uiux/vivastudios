import { gql, useQuery } from "@apollo/client";
import AboutContact from "../PostPage/AboutContact";
import { SocialMediaItem } from "../SocialMedia/SocialMediaItem";


const GET_SEVEN_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsSvnGrp {
                  fieldGroupName
                  hpsSvnId
                  hpsSvnShowHideBtnSect
                  hpsSvnTitle
                  hpsSvnContent
                  hpsSvnEmail
                  hpsSvnPhone
                  hpsSvnAddress
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
            <section className="seven-section vs-home-sec" id={props.section.hpsSvnId}>
                <div className="inner">
                    <SectionHeader title={props.section.hpsSvnTitle} desc={props.section.hpsSvnContent} />
                    <SectionContent phone={props.section.hpsSvnPhone} address={props.section.hpsSvnAddress} email={props.section.hpsSvnEmail}/>
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
const SectionContent = ({ phone, address, email }) => {
    return(
        <div className="flex flex-center align-start">
            <div className="contact-group w12 w-md-6">
                <div className="contact-item flex flex-column">
                    <span className="txt-lbl">Phone</span>
                    <span className="txt">{phone}</span>
                </div>
                <div className="contact-item flex flex-column">
                    <span className="txt-lbl">E-mail</span>
                    <span className="txt">{email}</span>
                </div>
                <div className="contact-item flex flex-column">
                    <span className="txt-lbl">Our Office </span>
                    <span className="txt">{address}</span>
                </div>
                <div className="contact-item flex flex-column">
                    <span className="txt-lbl">Find us here: </span>
                    <SocialMediaItem />
                </div>
            </div>
            <div className="bg-contact">
                <AboutContact />
            </div>
        </div>
    )
}

export default SevenSection;