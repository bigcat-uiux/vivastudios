import React, {useState} from 'react'
import { Query } from '@apollo/client/react/components'
import gql from 'graphql-tag'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import NavBrand from './NavBrand'
import LangSwitcher from './LangSwitcher'

// MAIN_MENU
// MAIN_MENU___ID

const NavMenuQuery = (test) => (
    <Query query={gql`{
        menuItems(where: {location: MAIN_MENU___ID}, first: 5) {
          nodes {
            label
            id
            locations
            path
            title
            uri
            url
            order
            parentDatabaseId
            parentId
            target
            menuItemId
            linkRelationship
            isRestricted
            cssClasses
            connectedNode {
              node {
                ... on Post {
                  id
                  title
                  slug
                }
                ... on Page {
                  id
                  title
                  slug
                  isFrontPage
                }
              }
            }
          }
        }
      }`}>
        {
            ({loading, error, data}) => {
                console.log(test)
                if(data){
                    return(
                        <>
                        {
                            data.menuItems.nodes.map((menuItems, key) => {
                                const label = menuItems.label;
                                const path = menuItems.path;
                                return (
                                    <CustomLink key={key} to={path}>{label}</CustomLink>
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

function CustomLink ({to, children, ...props }){
    const resolvePath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvePath.pathname })
    return(
        <li className={isActive ? 'nav-item active': 'nav-item'}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

const NavMenu = () => {
    const [isActive, setActive] = useState(null);

    const dropDownActivate = () => {
        setActive(!isActive);
    }
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='inner'>
                <div className='flex justify-between align-center'>
                    <NavBrand />
                    <button className='navbar-toggler' data-target='navbarDropdown' type='button'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarDropdown'>
                        <ul className='navbar-nav'>
                            <NavMenuQuery component={'en'}/>
                        </ul>
                    </div>

                </div>
                <div className='navbar-other'>
                    <div className='navbar-client'>
                        <a href='#@' type='button' className='btn btn-signin'>Client's area</a>
                    </div>
                    <div className='navbar-multilang dropdown'>
                        <div className='dropdown-selected' onClick={dropDownActivate}>
                            <span>Please Select</span>
                        </div>
                        <div className={`dropdown-list ${isActive ? 'active': null}`}>
                            <LangSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;