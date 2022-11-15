import React, {useState} from 'react'
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
    const [isActive, setActive] = useState(null);

    const handleClick = (flag) => {
        const dropdownSpan = document.querySelector('.dropdown-selected > span');
        const item = `<span class="flag flag-${flag}"></span><span class="flag-txt">${flag}</span>`;
        const removeClass = document.querySelector('.navbar-multilang > .dropdown-list.active > .dropdown-item.active');
        const htmlTag = document.querySelector('html');
        var newFlag = '';

        switch (flag) {
            case 'id':
                newFlag = 'id-ID'
                break;
            case 'vi':
                newFlag = 'vi-VN'
                break;
            case 'th':
                newFlag = 'th-TH'
                break;
            case 'ja':
                newFlag = 'ja-JP'
                break;
            case 'zh':
                newFlag = 'zh-CN'
                break;
            case 'ko':
                newFlag = 'ko-KR'
                break;
            default:
                newFlag = 'en-US'
                break;
        }

        htmlTag.setAttribute('lang', newFlag);
        window.sessionStorage.setItem('lang', flag);

        if(removeClass !== null){
            removeClass.classList.remove('active');
        }

        setActive(!isActive);
        dropdownSpan.innerHTML= item;

    }

    return (
        <span id={slug} className={`dropdown-item ${isActive ? 'active': null}`} onClick={() => handleClick(slug)}>
            <span className={`flag flag-${slug}`}></span>
            <span className="flag-txt">{slug}</span>
        </span>
    )
}


export default LangSwitcher;