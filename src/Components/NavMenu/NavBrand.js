import React from "react";
import { Query } from '@apollo/client/react/components'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

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
                    const imgSrc = (data.siteLogo.sourceUrl !== null) ? data.siteLogo.sourceUrl : '';
                    return(
                        <Link to={'/'} className='navbar-brand'>
                            <img 
                                src={imgSrc} 
                                alt={data.siteLogo.altText}
                            />
                        </Link>
                    )
                }
                

                if(error) console.log(error);
            }
        }
    </Query>
)

export default NavBrand;