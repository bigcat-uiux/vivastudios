import React from "react";
import { gql, useQuery } from "@apollo/client";
import LatestPostCard from "./LatestPostCard";


const GET_LATEST_POST = gql `
    query MYLatestPost {
        posts(first: 5, where: {languages: EN, orderby: {field: DATE, order: DESC}}) {
            nodes {
                databaseId
                title
                slug
                language {
                    locale
                }
                author {
                    node {
                        name
                    }
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

const LatestPostList = () => {
    const { loading, error, data } = useQuery(GET_LATEST_POST);

    if (loading) return <p>Loading Posts...</p>;
    if (error) return <p>Error :(</p>;

    const postsFound = Boolean(data?.posts.nodes.length);

    if(!postsFound){
        return <p>No Matching Posts found.</p>
    }

    return (
        <div className="posts-list">
        {
            data.posts.nodes.map((post) => (
                <LatestPostCard key={post.databaseId} post={post}></LatestPostCard>
            ))
        }
        </div>
    )
}

export default LatestPostList;