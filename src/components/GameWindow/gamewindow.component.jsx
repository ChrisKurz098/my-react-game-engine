import { useEffect, useRef, useState } from "react";
import { checkScreenScale } from "../../utils/gameWindowUtils/checkScreenScale";
import setKeyListeners from "../../utils/gameWindowUtils/setKeyListeners";
import './gameWindowStyle.css'

import Player from "../Player/player.component"
const GameWindow = ({ gameDim }) => {
    const [gameTicker, setGameTicker] = useState(0);
    const [screenScale, setScreenScale] = useState(window.innerWidth / gameDim.w);
    const [player, setPlayer] = useState({ w: 50 ,h: 50,x: 0, y: 0, dir: 0, spdA: 5, spdB: 10,  animate: 'paused' })
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
        //console.log(kbCheck)

        //--Player Movement--//
        setPlayer(old => {
            let {spdA: spd,w,h,x,y} = old;
            const change = {animate: 'paused'};
            let hDir = 0;
            let vDir = 0;
            if (kbCheck.includes('shift')) { spd = old.spdB }
            if (kbCheck.includes('arrowright')) { hDir = 1; (x > gameDim.w) ? change.x = -w : change.x = old.x + spd; }
            if (kbCheck.includes('arrowleft')) { hDir = -1; (x < -(w)) ? change.x = gameDim.w - 1 : change.x = old.x - spd; }
            if (kbCheck.includes('arrowup')) { vDir = -1; (y < -(h)) ? change.y = gameDim.h - 1 : change.y = old.y - spd; }
            if (kbCheck.includes('arrowdown')) { vDir = 1; (y > gameDim.h) ? change.y = -h : change.y = old.y + spd; }

            if (hDir || vDir) {change.animate = 'running'}

            switch (true) {
                case (hDir === 1 && !vDir): change.dir = 0; break;
                case (hDir === -1 && !vDir): change.dir = 180; break;
                case (!hDir && vDir === 1): change.dir = 270; break;
                case (!hDir && vDir === -1): change.dir = 90; break;
                case (hDir === 1 && vDir === 1): change.dir = 315; break;
                case (hDir === 1 && vDir === -1): change.dir = 45; break;
                case (hDir === -1 && vDir === -1): change.dir = 135; break;
                case (hDir === -1 && vDir === 1): change.dir = 225; break;
                default:
            }
            return { ...old, ...change };
        });

    }, [gameTicker])

    return (
        <div className="game-container">
            <div className="game-window" style={{ transform: `scale(${screenScale})`, left: `${borderWidth}px`, width: `${gameDim.w}px`, height: `${gameDim.h}px` }}>
                <Player player={player} setPlayer={setPlayer}/>

            </div>
        </div>
    )
};

export default GameWindow;