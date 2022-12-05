import React, {useEffect} from "react";
import {gql, useQuery} from '@apollo/client';
import {} from '../../Components/Home/home.css';
import Hero from '../../Components/Home/Hero';
import SecondSection from '../../Components/Home/SecondSection';
import ThirdSection from "../../Components/Home/ThirdSection";
import FourthSection from "../../Components/Home/FourthSection";
import FifthSection from "../../Components/Home/FifthSection";
import SixthSection from "../../Components/Home/SixthSection";
import SevenSection from "../../Components/Home/SevenSection";
import EightSection from "../../Components/Home/EightSection";

const GET_HOME_QUERY = gql `
    query HomePage {
        homeSettings {
            homeSettings {
                hpsFrtGrp {
                    hpsTitle
                    hpsContent
                    hpsId
                    hpsShowHideBtnSect
                    hpsShowHideButtons
                    hpsShowHideCurve
                    hpsShowHideFeaturePost
                    hpsBgImg {
                      sourceUrl
                    }
                }
            }
        }
    }
`;

const HomePage = () => {

    useEffect(() => {
        document.body.classList.add('home-template', 'home-page', 'page')
        return () => {
            document.body.classList.remove('home-template', 'home-page', 'page')
        }
    }, []);

    const {loading, error, data} = useQuery(GET_HOME_QUERY);

    if (loading) return <p>Loading Posts...</p>;
    if (error) return <p>Error :(</p>;
    
    return (
        <>
            <Hero hero={data.homeSettings.homeSettings.hpsFrtGrp}/>
            <SecondSection />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
            <SixthSection />
            <SevenSection />
            <EightSection />
        </>
    )
}

export default HomePage;