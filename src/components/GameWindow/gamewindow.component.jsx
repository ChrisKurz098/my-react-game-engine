import { useEffect, useRef, useState } from "react";
import { checkScreenScale } from "../../utils/gameWindowUtils/checkScreenScale";
import setKeyListeners from "../../utils/gameWindowUtils/setKeyListeners";
import eightWayMovement from "../../utils/playerUtils/eightWayMovement";
import mouseAim from "../../utils/playerUtils/mouseAim";
import tankControls from "../../utils/playerUtils/tankControls";
import './gameWindowStyle.css'

import Player from "../Player/player.component"
const GameWindow = ({ gameDim }) => {
    const [gameTicker, setGameTicker] = useState(0);
    const [screenScale, setScreenScale] = useState(window.innerWidth / gameDim.w);
    const [player, setPlayer] = useState({ w: 50, h: 50, x: 0, y: 0, dir: 0, jump: 0, spdA: 5, spdB: 10, scale: 1 })
    const [kbCheck, setKbCheck] = useState([]);
    const [msCheck, setMsCheck] = useState({});
    let borderWidth = (window.innerWidth - (screenScale * gameDim.w)) / 2; //calcualtes the width of the left and right black bars


    useEffect(() => {
        setKeyListeners(setKbCheck, setMsCheck);
        setInterval(() => {
            requestAnimationFrame(() => {
                setGameTicker(old => ((old < 720) ? old + 1 : 0));
            })
        }, 16.67)
    }, [])

    useEffect(() => {
        checkScreenScale(gameDim, setScreenScale);
        //---------Game logic goes here---------//
        //--Player Movement--//
        eightWayMovement(gameDim,setPlayer, kbCheck, [.04, 2]);

    }, [gameTicker])

    return (
        <div className="game-container">
            <div className="game-window" style={{ transform: `scale(${screenScale})`, left: `${borderWidth}px`, width: `${gameDim.w}px`, height: `${gameDim.h}px` }}>
                <Player player={player} setPlayer={setPlayer} />
                <div className="wall" style={{position: 'absolute', top: '200px', left: '200px', width: '150px', height: '150px', backgroundColor: 'red'}}/>
                <div className="wall" style={{position: 'absolute', top: '300px', left: '1000px', width: '150px', height: '350px', backgroundColor: 'red'}}/>
           
            </div>
        </div>
    )
};

export default GameWindow;