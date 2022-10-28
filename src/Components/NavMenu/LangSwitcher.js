import React from "react";
import { Query } from '@apollo/client/react/components'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

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
                        <div className='navbar-multilang'>
                        {
                            data.languages.map((lang, key) => {
                                return (
                                    <ListLang  key={key} lang={lang.locale} slug={lang.slug}>{lang}</ListLang>
                                )
                            })
                        }
                         </div>
                    )
                }
                

                if(error) console.log(error);
            }
        }
    </Query>
)

function ListLang ({lang,slug, ...props}) {
    let langChange = 'en';
    return (
        <span id={slug} className='flag flag-'>{slug}</span>
    )
}

export default LangSwitcher;