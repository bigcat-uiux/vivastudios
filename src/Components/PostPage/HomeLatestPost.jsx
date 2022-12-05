import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GET_HOME_LATEST_POST = gql `
    query MYLatestPost {
        posts(first: 2, where: {languages: EN, orderby: {field: DATE, order: DESC}}) {
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

const HomeLatestPostList = () => {
    const { loading, error, data } = useQuery(GET_HOME_LATEST_POST);

    if (loading) return <p>Loading Posts...</p>;
    if (error) return <p>Error :(</p>;

    const postsFound = Boolean(data?.posts.nodes.length);

    if(!postsFound){
        return <p>No Matching Posts found.</p>
    }

    return (
        <div className="vs-posts-list flex flex-row">
        {
            data.posts.nodes.map((post) => (
                <PostCard key={post.databaseId} post={post} />
            ))
        }
        </div>
    )
}

const PostCard = ({ post }) => {
    const {
        title,
        slug,
        featuredImage
      } = post;

      return (
        <div className="vs--cards vs--latest-post w50">
            {featuredImage ? (
                <img
                    src={featuredImage.node.sourceUrl}
                    alt={featuredImage.node.altText}
                    className="w50"
                />
            ) : null}
            <div className="w50">
                <Link to={`/news/${slug}`}>
                    <h3>{title}</h3>
                </Link>
                <Link to={`/news/${slug}`} className='btn'>Learn more</Link>
            </div>
        </div>
      )
}

export default HomeLatestPostList;