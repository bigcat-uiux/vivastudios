import React from "react";
import { Link } from "react-router-dom";

// const formatDate = (date) => new Date(date).toLocaleDateString();

const LatestPostCard = ({ post }) => {
    const {
        title,
        slug,
        featuredImage
      } = post;

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

export default LatestPostCard;