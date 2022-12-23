import React, {useState} from "react";
// import { gql, useQuery } from "@apollo/client";
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import NavBrand from './NavBrand';
import {} from './navStyle.css';
// import LangSwitcher from './LangSwitcher';

// const GET_MENUS_BY_ITEM = gql`
//     query getMenu($menuLang: MenuLocationEnum = MAIN_MENU) {
//         menuItems(where: {location: $menuLang}, first: 5) {
//             nodes {
//                 label
//                 id
//                 locations
//                 path
//                 title
//                 uri
//                 url
//                 order
//                 parentDatabaseId
//                 parentId
//                 target
//                 menuItemId
//                 linkRelationship
//                 isRestricted
//                 cssClasses
//                 connectedNode {
//                     node {
//                         ... on Page {
//                             id
//                             title
//                             slug
//                             isFrontPage
//                             guid
//                             pageId
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;


const NavMenuQuery = (props) => {
    return (
        <>
        <CustomLink to="/vivatest">Home</CustomLink>
        <CustomLink to="/vivatest/about-viva">About Viva</CustomLink>
        <CustomLink to="/vivatest/games">Games</CustomLink>
        <CustomLink to="/vivatest/news">Newx</CustomLink>
        {/* {
            props.menuData.nodes.map((menuItem, key) => {
                const label = menuItem.label;
                const path = menuItem.path;
                return (
                    <CustomLink key={key} to={path} id={menuItem.connectedNode.node.id}>{label}</CustomLink>
                )
            })
        } */}
        </>
    )
}

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


const NavMenu = () =>{
    // const {  loading, error, data} = useQuery(GET_MENUS_BY_ITEM);

    // const menuFound = Boolean(data?.menuItems);

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='inner'>
                <NavBrand />
                <button 
                    className='navbar-toggler'
                    data-target='navbarDropdown' 
                    type='button'
                    onClick={() => {
                        setIsNavExpanded(!isNavExpanded)
                    }}
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={isNavExpanded ? "collapse navbar-collapse active" : "collapse navbar-collapse"} id='navbarDropdown'>
                    <ul className='navbar-nav'>
                    <li className="nav-item close">
                        <span 
                            className="close-icon" 
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded)
                            }}
                            type='button'
                        ></span>
                    </li>
                    <NavMenuQuery />
                    {/* {loading ? (
                    <p>Loading…</p>
                    ) : error ? (
                        <p>Error: {error.message}</p>
                    ) : !menuFound ? (
                        <p>Post could not be found.</p>
                    ) : (
                        <NavMenuQuery menuData={data.menuItems} />
                    )} */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;