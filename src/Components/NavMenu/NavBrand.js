import {useState, useEffect} from "react";
import { Query } from '@apollo/client/react/components'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import LightLogo from './logo/viva-light.png';

const NavBrand = () => (

    <Query query={gql`{
        siteLogo {
            altText
            slug
            title
            sourceUrl
        }
    }`}>
        {
            ({loading, error, data}) => {

                if(data){
                    return(
                        <Link to={'/'} className='navbar-brand'>
                            <ImgWrap src={data.siteLogo.sourceUrl} alt={data.siteLogo.altText} />
                        </Link>
                    )
                }

                if(error) console.log(error);
            }
        }
    </Query>
);

const ImgWrap = ({src, alt}) =>{

    const bodyClass = document.body.classList.contains('home-page');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const imgSrc = (src !== null) ? src : '';
    const checkIMG = (bodyClass) ? LightLogo : imgSrc;

    useEffect(() => {
        window.addEventListener('resize', () => {
            const ismobile = window.innerWidth < 768;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false)
    }, [isMobile]);

    const newImgSrc = (isMobile) ? imgSrc : checkIMG;

    return (
        <>
            <img 
                src={newImgSrc} 
                alt={alt}
            />
        </>
    )
}

export default NavBrand;