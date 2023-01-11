import React from "react";
import { gql, useQuery } from "@apollo/client";
import LatestPostList from "../../Components/PostPage/LatestPostList";
import PageHeader from "../../Components/PostPage/PageHeader";
import NewsOtherPage from "../../Components/PostPage/NewsOtherPage";

/**
 * Local: cG9zdDozNA==
 * Live: cG9zdDoxODQy
 */


const GET_NEWSPAGE_BY_ID = gql`
    query MyPage{
        page(id: "cG9zdDozNA==") {
            title
            content
            subTitle {
                title1
                title2
            }
        }
    }
`;

const NewsPage = () => {

    const {loading, error, data} = useQuery(GET_NEWSPAGE_BY_ID);

    const NewsPageFound = Boolean(data?.page);

    return (
        <section className="News">
            <div className="inner">
                {loading ? (
                <p>Loading…</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : !NewsPageFound ? (
                    <p>Post could not be found.</p>
                ) : (
                    <ContentNewsPage page={data.page}/>
                )}
            </div>
        </section>
    )
}

const ContentNewsPage = ({ page }) => {
    const {
      title,
      content,
      subTitle
    } = page;

    return (
        <>
            <PageHeader title={title} content={content}/>
            <NewsLatest title={subTitle.title1}/>
            <NewsOther title={subTitle.title2}/>
        </>
    )

}


const NewsLatest = (props) => {
    const {
        title
    } = props;
    return(
        <div className="latest-post">
            <div className="sub-page-header">
                <h1 className="sub-page-title">{title}</h1>
            </div>
            <LatestPostList/>
        </div>
    )
}

const NewsOther = (props) => {
    const {
        title
    } = props;
    return(
        <div className="other-post">
            <div className="sub-page-header">
                <h1 className="sub-page-title">{title}</h1>
            </div>
            <NewsOtherPage />
        </div>
    )

}

export default NewsPage;