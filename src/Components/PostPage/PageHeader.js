import React from "react";

const PageHeader = ({title, content}) => {
    return (
        <div className="page-header">
        {
            <h1 className="page-title">{title}</h1>
        }
        {
            <span className="page-desc" 
                dangerouslySetInnerHTML={{__html:content}}
            />
        }
        </div>
    )
}

export default PageHeader;