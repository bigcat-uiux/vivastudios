import React from "react";
import { useParams } from "react-router-dom";
import PostPageContent from "../Components/PostPage/PostPageContent";
import { gql, useQuery } from "@apollo/client";

const GET_POST_BY_SLUG = gql`
    query MyPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            title
            content
            date
            language {
                locale
            }
                categories {
                nodes {
                    slug
                    name
                }
            }
            author {
                node {
                    name
                }
            }
        }
    }
`;

export default function PostPage(props) {
    
    let { slug } = useParams();

    const { loading, error, data } = useQuery(GET_POST_BY_SLUG, {
        variables: {
            slug: slug
        }
    });

    const postFound = Boolean(data?.post);

    return (
        <section className="post-wrap">
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !postFound ? (
                <p>Post could not be found.</p>
            ) : (
                <PostPageContent post={data.post} />
            )}
        </section>
    )
}