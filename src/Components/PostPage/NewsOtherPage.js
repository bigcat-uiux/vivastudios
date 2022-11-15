import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_OTHER_PAGE = gql`
    query NewsOtherPage {
        posts(where: {orderby: {field: DATE, order: DESC}}) {
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

const NewsOtherPage = () => {
    const {loading, error, data} = useQuery(GET_OTHER_PAGE);

    console.log(data)

    if (loading) return <p>Loading Posts...</p>;
    if (error) return <p>Error :(</p>;

    const postsFound = Boolean(data?.posts.nodes.length);

    if(!postsFound){
        return <p>No Matching Posts found.</p>
    }

    return (
        <div className="posts-list">
        {
            data.posts.nodes.map((post, index) => (
                <NewsOtherList key={post.databaseId} post={post} count={index} />
            ))
        }
        </div>
    )

}

const NewsOtherList = ({ post, count }) => {
    const {
        title,
        slug,
        featuredImage
      } = post;

      if(count > 5){
          return (
            <div className="post-card">
                {featuredImage ? (
                    <img
                        src={featuredImage.node.sourceUrl}
                        alt={featuredImage.node.altText} 
                    />
                ) : null}
                <Link to={`/news/${slug}`}>
                    <h3>{title}</h3>
                </Link>
            </div>
          )
      }
}

export default NewsOtherPage;