import React from "react";
import { Query } from '@apollo/client/react/components'
import gql from 'graphql-tag'
// import { Link } from 'react-router-dom'

const LangSwitcher = () => (
    <Query query={gql`{
        languages {
            slug
            name
            locale
            code
        }
    }`}>
        {
            ({loading, error, data}) => {
                
                if(data){
                    return(
                        <>
                            {
                                data.languages.map((lang, key) => {
                                    return (
                                        <ListLang  key={key} lang={lang.locale} slug={lang.slug}>{lang}</ListLang>
                                    )
                                })
                            }
                        </>
                    )
                }
                

                if(error) console.log(error);
            }
        }
    </Query>
)

function ListLang ({lang,slug, ...props}) {
    // let langChange = 'en';
    

    const handleClick = (slug) => {
        // e.preventDefault();
        console.log(slug)
    }
    return (
        <span id={slug} className='dropdown-item' onClick={() => handleClick({slug})}>
            <span className={`flag flag-${slug}`}></span>
            <span className="flag-txt">{slug}</span>
        </span>
    )
}

export default LangSwitcher;