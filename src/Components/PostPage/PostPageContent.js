import React from "react";

const PostPageContent = (props) => {
    return (
        <article className="post-article inner">
            {
                <header className="page-title">
                    <h2>{props.post.title}</h2>
                </header>
            }
            {
                <div className="page-content" 
                    dangerouslySetInnerHTML={{__html: props.post.content}}
                />
            }
        </article>
    )
}

export default PostPageContent;