import React from "react";

const Modal = ({open, onClose}) => {
    if (!open) return null;
    if (open) document.body.classList.add('vs-modal-active');
    return (
        <div onClick={onClose} className="vs-modal">
            <div onClick={(e) => {
                e.stopPropagation();
            }} 
            className="vs-modal--inner">
                <div className="vs--inner">
                    <div className="vs-modal---header">
                        <p className='closeBtn' onClick={onClose}>
                            X
                        </p>
                    </div>
                    <div className="vs-modal---body">
                        <div dangerouslySetInnerHTML={{__html:"<iframe src='https://game-service.viva-game.com/game-sessions/demo?gameDeploymentID=m88s-ArcticSky-9600' />"}}/>
                        {/* <iframe  src="https://game-service.viva-game.com/game-sessions/demo?gameDeploymentID=m88s-ArcticSky-9600" ></iframe> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;