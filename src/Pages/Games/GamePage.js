import React from "react";
import { gql, useQuery } from "@apollo/client";
import PageHeader from "../../Components/PostPage/PageHeader";
import AllGamesList from "../../Components/PostPage/AllGamesList";
import GamesPopularPost from "../../Components/PostPage/GamesPopularPost";

const GET_NEWSPAGE_BY_ID = gql`
    query MyPage{
        page(id: "cG9zdDoyMQ==") {
            title
            content
            subTitle {
                title1
                title2
            }
        }
    }
`;

const GamePage = () => {
    const {loading, error, data} = useQuery(GET_NEWSPAGE_BY_ID);
    
    const gamesPageFound = Boolean(data?.page);

    return (
        <section className="Game">
            <div className="inner">
                {loading ? (
                <p>Loading…</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : !gamesPageFound ? (
                    <p>Post could not be found.</p>
                ) : (
                    <ContentGamesPage page={data.page}/>
                )}
            </div>
        </section>
    )
}

const ContentGamesPage = ({ page }) => {
    const {
      title,
      content,
      subTitle
    } = page;

    return (
        <>
            <PageHeader title={title} content={content}/>
            <GamesPopular title={subTitle.title1}/>
            <AllGames title={subTitle.title2}/>
        </>
    )
}

const GamesPopular = (props) => {
    const {
        title
    } = props;
    return(
        <div className="games-popular">
            <div className="sub-page-header">
                <h1 className="sub-page-title">{title}</h1>
            </div>
            <GamesPopularPost />
        </div>
    )
}

const AllGames = (props) => {
    const {
        title
    } = props;
    return(
        <div className="all-games">
            <div className="sub-page-header">
                <h1 className="sub-page-title">{title}</h1>
            </div>
            <AllGamesList />
        </div>
    )

}

export default GamePage;