import { useEffect, useRef, useState } from "react";
import { checkScreenScale } from "../../utils/gameWindowUtils/checkScreenScale";
import setKeyListeners from "../../utils/gameWindowUtils/setKeyListeners";
import './gameWindowStyle.css'

import Player from "../Player/player.component"
const GameWindow = ({gameDim}) => {
    const [gameTicker, setGameTicker] = useState(0);
    const [screenScale, setScreenScale] = useState(window.innerWidth / gameDim.w);
    const [player, setPlayer] = useState({x: 0, y: 0})
    const [kbCheck, setKbCheck] = useState([]);
    let borderWidth = (window.innerWidth - (screenScale * gameDim.w)) / 2; //calcualtes the width of the left and right black bars
   

    useEffect(() => {
        setKeyListeners(setKbCheck);
        setInterval(() => {
            requestAnimationFrame(() => {
                setGameTicker(old => ((old < 720) ? old + 1 : 0));
                checkScreenScale(gameDim, setScreenScale);
            })
        }, 16.67)
    }, [])

    useEffect(() => {
       //Game logic goes here
       console.log(kbCheck)
       if (kbCheck.includes('arrowright'||'arrowleft'))
       {
       setPlayer(old => {
         if (kbCheck.includes('arrowright')) {
            return (player.x>gameDim.w) ? {x:-250} : {x: old.x+5}
         } 
        else {
            
        return (player.x<gameDim.w-250) ? {x:gameDim.w-1} : {x: old.x-5}
        }
       }) }
    }, [gameTicker])

    return (
        <div className="game-container">
            <div className="game-window" style={{transform: `scale(${screenScale})`, left: `${borderWidth}px`, width: `${gameDim.w}px`, height: `${gameDim.h}px` }}>
              <Player player = {player} setPlayer = {setPlayer}/>
            </div>
        </div>
    )
};

export default GameWindow;