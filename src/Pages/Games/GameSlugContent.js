import React, {useState} from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal/modal";
import {} from "../../Components/Modal/modal.css";


const GET_GAMES_BY_URI = gql`
    query GamesContent($slug: ID!) {
        game(id: $slug, idType: URI) {
            databaseId
            title
            slug
            content
            featuredImage {
                node {
                    sourceUrl
                }
            }
            games {
                fieldGroupName
                gameDevices
                gameType
                gamesVid
                gamesStatsSetting {
                    gamesStatsRtp
                    gamesStatsThf {
                        gamesStatsThfOne
                        gamesStatsThfThree
                        gamesStatsThfTwo
                    }
                    gamesStatsPayoutPercent {
                        gamesStatsPpOne
                        gamesStatsPpThree
                        gamesStatsPpTwo
                    }
                    gamesStatsVolatility {
                        gamesStatsVolatilityOne
                        gamesStatsVolatilityThree
                        gamesStatsVolatilityTwo
                    }
                }
                gameDlInfo{
                    databaseId
                    altText
                    guid
                    mimeType
                }
                gamesScreenshot{
                    altText
                    slug
                    sourceUrl
                    databaseId
                }
            }
        }
    }
`;

const GameSlugContent = (props) => {
    
    let { slug } = useParams();

    const { loading, error, data } = useQuery(GET_GAMES_BY_URI, {
        variables: {
            slug: slug
        }
    });

    const gamePostFound = Boolean(data?.game);

    return (
        <section className="game-wrap">
            {loading ? (
            <p>Loading…</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : !gamePostFound ? (
                <p>Post could not be found.</p>
            ) : (
                <GameContent key={data.game.databaseId} post={data.game}  />
            )}
        </section>
    )
}

const GameContent = (props) => {
    const FeatImg = props.post.featuredImage;

    const [openModal, setOpenModal] = useState(false);

    return (
        <article className="post-article inner">
            {
                <header className="page-title">
                    <h2>
                        <Link to={`/games`}>{props.post.title}</Link>
                    </h2>
                </header>
            }
            <div className="page-content">
                <div className="flex">
                    <div className="flex-center w50">
                        <img
                            src={FeatImg.node.sourceUrl}
                            alt={FeatImg.node.altText} 
                        />
                        <div className="btn-group">
                            <button 
                                className="btn"
                                onClick={() => setOpenModal(true)}
                            >Play demo</button>
                            <Link to={props.post.games.gameDlInfo.guid} target="_blank" download>Download Info</Link>
                        </div>
                    </div>
                    <div className="w50">
                        {
                            <div className="" 
                                dangerouslySetInnerHTML={{__html: props.post.content}}
                            />
                        }
                        <GameSettings key={props.post.games.fieldGroupName} gameSet={props.post.games} />
                    </div>
                </div>
                <div className="game-screenShot">
                    <span className="bold txt">Game Screenshot</span>
                    <div className="game-img-ss">
                        <GameScreenShotItem gameScreen={props.post.games.gamesScreenshot}/>
                    </div>
                </div>
                <div className="game-about">
                    <span className="bold txt">About the Game</span>
                    <AboutGame gameVideo={props.post.games.gamesVid}/>
                </div>
            </div>
            <Modal 
                open={openModal}
                onClose={() => {setOpenModal(false); document.body.classList.remove('vs-modal-active');}}
            />
        </article>
    )
}

const GameSettings = (props) => {
    const thf = props.gameSet.gamesStatsSetting.gamesStatsThf;
    const volatility = props.gameSet.gamesStatsSetting.gamesStatsVolatility;
    const percent = props.gameSet.gamesStatsSetting.gamesStatsPayoutPercent;
    return (
        <div className="game-wrap">
            <div className="game-type">
                <span className="bold txt">Game Type</span>
                <p>{ props.gameSet.gameType }</p>
            </div>
            <div className="game-device">
                <span className="bold txt">Game Device</span>
                {
                    props.gameSet.gameDevices.map((device, index) => (
                        <span key={index}>{ device }</span>
                    ))
                }
            </div>
            <div className="game-stats">
                <span className="bold txt">Statistical Information</span>
                <p className="flex">
                    <span>Return to Player (RTP)</span><span>{props.gameSet.gamesStatsSetting.gamesStatsRtp}%</span>
                </p>
                <p className="flex">
                    <span>Total Hit  Frequency</span>
                    <span className="tbl">
                        <span>{thf.gamesStatsThfOne}</span>
                        <span>{thf.gamesStatsThfTwo}</span>
                        <span>{thf.gamesStatsThfThree}</span>
                    </span>
                </p>
                <p className="flex">
                    <span>Payout Percentage</span>
                    <span className="tbl">
                        <span>{percent.gamesStatsPpOne}</span>
                        <span>{percent.gamesStatsPpTwo}</span>
                        <span>{percent.gamesStatsPpThree}</span>
                    </span>
                </p>
                <p className="flex">
                    <span>Volatility</span>
                    <span className="tbl">
                        <span>{volatility.gamesStatsVolatilityOne}</span>
                        <span>{volatility.gamesStatsVolatilityTwo}</span>
                        <span>{volatility.gamesStatsVolatilityThree}</span>
                    </span>
                </p>
            </div>
        </div>
    )
}

const GameScreenShotItem = (props) => {
    return (
        <>
            {
                props.gameScreen.map((img, index) => (
                    <span key={index}>
                        <img
                            src={img.sourceUrl}
                            alt={img.altText} 
                        />
                    </span>
                ))
            }
        </>
    )
}

const AboutGame = (props) => {
    return (
        <div className="game-player-wrap">
            <ReactPlayer 
                className="game-player"
                controls url={props.gameVideo}
            />
        </div>
    )
}

export default GameSlugContent;