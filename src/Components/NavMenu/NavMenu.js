import React from 'react'
import { Query } from '@apollo/client/react/components'
import gql from 'graphql-tag'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import NavBrand from './NavBrand'
import LangSwitcher from './LangSwitcher'

const NavMenuQuery = () => (
    <Query query={gql`{
        menuItems {
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
                            <NavMenuQuery />
                        </ul>
                    </div>

                </div>
                <div className='navbar-other'>
                    <div className='navbar-client'>
                        <a href='#@' type='button' className='btn btn-signin'>Client's area</a>
                    </div>
                    <LangSwitcher />
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;