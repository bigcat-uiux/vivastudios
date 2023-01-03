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
                gamePlayDemo
                gameType
                gamesVid
                gameDlInfo {
                    altText
                    databaseId
                    guid
                    mimeType
                }
                gamesScreenshot {
                    altText
                    slug
                    sourceUrl
                    databaseId
                }
                gamesStatsSetting {
                    gamesStatsPayoutPercent
                    gamesStatsReelType
                    gamesStatsRtp
                    gamesStatsThf
                    gamesStatsVolatility
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
        <section className="game-wrap flex w12">
            <div className="inner">
                <header className="page-header">
                    <h1 className="page-title">Viva product suite</h1>
                    <span className="desc">Mobile friendly, Most innovative & Strong themes</span>
                </header>
                {loading ? (
                <p>Loading…</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : !gamePostFound ? (
                    <p>Post could not be found.</p>
                ) : (
                    <GameContent key={data.game.databaseId} post={data.game}  />
                )}
            </div>
        </section>
    )
}

const GameContent = (props) => {
    const FeatImg = props.post.featuredImage;

    const [openModal, setOpenModal] = useState(false);
    console.log(props.post.games.gameDevices)

    return (
        <article className="post-article inner">
            {
                <div className="page-header align-start">
                    <h2 className="page-title font-Poppins txt-meduim bold">
                        <Link to={`/games`} className="txt-057">{props.post.title}</Link>
                    </h2>
                </div>
            }
            <div className="page-content flex flex-column">
                <div className="flex-row">
                    <div className="flex align-start flex-column w12 w-md-6 gap-24">
                        <div className="page-image">
                            <img
                                src={FeatImg.node.sourceUrl}
                                alt={FeatImg.node.altText} 
                            />
                        </div>
                        <div className="btn-group flex gap-16">
                            <button 
                                className="btn"
                                onClick={() => setOpenModal(true)}
                            >Play demo</button>
                            <Link to={props.post.games.gameDlInfo.guid} className="btn btn-transparent" target="_blank" download>Download Info</Link>
                        </div>
                    </div>
                    <div className="w12 w-md-6 flex flex-column gap-24">
                        {
                            <div className="font-merriweather normal txt-small txt-57D" 
                                dangerouslySetInnerHTML={{__html: props.post.content}}
                            />
                        }
                        <div className="game-type flex flex-column games-grp">
                            <span className="bold txt">Game Type</span>
                            <span className="font-merriweather txt-small txt-capitalize">{props.post.games.gameType}</span>
                        </div>
                        <div className="game-device flex flex-column games-grp">
                            <span className="bold txt">Game Device</span>
                            <span className="font-merriweather txt-small txt-capitalize">
                            {
                                props.post.games.gameDevices.map((device, index) => (
                                    <span key={index}> { (index ? ', ' : '') + device } </span>
                                ))
                            }
                            </span>
                        </div>
                        <GameSettings key={props.post.games.fieldGroupName} gameSet={props.post.games.gamesStatsSetting} />
                    </div>
                </div>
                <div className="game-screenShot">
                    <span className="bold txt-meduim txt-capitalize font-poppins">Game Screenshot</span>
                    <div className="game-img-ss flex align-start gap-8">
                        <GameScreenShotItem gameScreen={props.post.games.gamesScreenshot}/>
                    </div>
                </div>
                <div className="game-about">
                    <div className="bg bg-853"></div>
                    <span className="bold txt">About the Game</span>
                    {/* <AboutGame gameVideo={props.post.games.gamesVid}/> */}
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
    return (
        <div className="game-stats games-grp">
            <span className="bold txt txt">Statistical Information</span>
            <div className="stats-wrap">
                <p className="flex flex-column no-margin">
                    <span className="txt-xsm font-merriweather txt-57D">Return to Player (RTP)</span>
                    <span className="font-merriweather txt-057 txt-meduim">{props.gameSet.gamesStatsRtp}%</span>
                </p>
                <p className="flex flex-column no-margin">
                    <span className="txt-xsm font-merriweather txt-57D">Hit Rate</span>
                    <span className="font-merriweather txt-057 txt-meduim">{props.gameSet.gamesStatsThf}</span>
                </p>
                <p className="flex flex-column no-margin">
                    <span className="txt-xsm font-merriweather txt-57D">Volatility</span>
                    <span className="font-merriweather txt-057 txt-meduim txt-capitalize">{props.gameSet.gamesStatsVolatility}</span>
                </p>
                <p className="flex flex-column no-margin">
                    <span className="txt-xsm font-merriweather txt-57D">Paylines</span>
                    <span className="font-merriweather txt-057 txt-meduim">{props.gameSet.gamesStatsPayoutPercent}</span>
                </p>
                <p className="flex flex-column no-margin">
                    <span className="txt-xsm font-merriweather txt-57D">Reel Type</span>
                    <span className="font-merriweather txt-057 txt-meduim">{props.gameSet.gamesStatsReelType}</span>
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

// const AboutGame = (props) => {
//     return (
//         <div className="game-player-wrap">
//             <ReactPlayer 
//                 className="game-player"
//                 controls url={props.gameVideo}
//             />
//         </div>
//     )
// }

export default GameSlugContent;