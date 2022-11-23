import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_ALL_GAMES = gql `
    query AllGames {
        games(where: {orderby: {field: TITLE, order: ASC}}) {
            nodes {
                databaseId
                title
                slug
                    featuredImage {
                    node {
                        altText
                        slug
                        title
                        sourceUrl
                    }
                }
            }
        }
    }
`;

const AllGamesList = () => {
    const {loading, error, data} = useQuery(GET_ALL_GAMES);

    if (loading) return <p>Loading Posts...</p>;
    if (error) return <p>Error :(</p>;

    const AllgamesFound = Boolean(data?.games.nodes.length);

    if( !AllgamesFound ){
        return <p>No Matching All Games found.</p>
    }

    return (
        <div className="games-list">
            {
                data.games.nodes.map((allgames) => (
                    <AllGamesCard key={allgames.databaseId} gameList={allgames} />
                ))
            }
        </div>
    )
}

const AllGamesCard = ({ gameList }) => {
    const {
        slug,
        featuredImage
    } = gameList;
    return (
        <div className="all-games-card">
            
            <Link to={`/games/${slug}`}>
                {featuredImage ? (
                    <img
                        src={featuredImage.node.sourceUrl}
                        alt={featuredImage.node.altText} 
                    />
                ) : null}
            </Link>
        </div>
    )
}

export default AllGamesList;