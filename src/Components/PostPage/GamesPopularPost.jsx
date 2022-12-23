import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_GAMES_POPULAR_POST = gql`
    query GamesPopularPost {
        games(where: {orderby: {field: SLUG, order: ASC}}) {
            nodes {
            slug
            title
            gamesPopularPost {
                setPopularPost
            }
            featuredImage {
                node {
                altText
                sourceUrl
                }
            }
            }
        }
    }
`;

const GamesPopularPost = () => {
    const {loading, error, data} = useQuery(GET_GAMES_POPULAR_POST);

    const FeaturedCPTFound = Boolean(data?.games);
    return (
        <>
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !FeaturedCPTFound ? (
                <p>Post could not be found.</p>
            ) : (
                <CPTPPost page={data.games.nodes}/>
            )}
        </>
    )
}

const CPTPPost = (props) => {
    const CPTNodes = props.page;
    return (
        <div className="popularpost games-list">
            {
                CPTNodes.map((feat, key) => {
                    if(feat.gamesPopularPost.setPopularPost === true){
                        return(
                        
                            <img
                                src={feat.featuredImage.node.sourceUrl}
                                alt={feat.featuredImage.node.altText} 
                                key={key}
                            />
                        )
                    }else{
                        return null;
                    }
                })
            }
        </div>
    )
}

export default GamesPopularPost;