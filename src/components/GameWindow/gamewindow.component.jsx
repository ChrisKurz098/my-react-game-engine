import { useEffect, useRef, useState } from "react";
import { checkScreenScale } from "../../utils/gameWindowUtils/checkScreenScale";
import setKeyListeners from "../../utils/gameWindowUtils/setKeyListeners";
import eightWayMovement from "../../utils/playerUtils/eightWayMovement";
import mouseAim from "../../utils/playerUtils/mouseAim";
import tankControls from "../../utils/playerUtils/tankControls";
import './gameWindowStyle.css'
import Wall from "../Wall/wall.component";
import Player from "../Player/player.component"
const GameWindow = ({ gameDim }) => {
    const [gameTicker, setGameTicker] = useState(0);
    const [screenScale, setScreenScale] = useState(window.innerWidth / gameDim.w);
    const [player, setPlayer] = useState({ w: 50, h: 50, x: 0, y: 0, dir: 0, jump: 0, momentum: .5, cSpd: 0, spdA: 5, spdB: 10, scale: 1 })
    const [kbCheck, setKbCheck] = useState([]);
    const [msCheck, setMsCheck] = useState({});
    let borderWidth = (window.innerWidth - (screenScale * gameDim.w)) / 2; //calcualtes the width of the left and right black bars
    const allWalls = [
        {w:100, h:100, x: 500, y: 233, sprite: 'wall.png', tile: false},
        {w:100, h:250, x: 210, y: 533, sprite: 'wall.png', tile: true, tileSize: [100,100]},
        {w:80, h:400, x: 800, y: 30, jumpOver: true},
        {w:100, h:100, x: 100, y: 233, color: 'blue', styling: {boxShadow: '10px 5px 5px 5px yellow'}}
    ]

    useEffect(() => {
        //--Initiates game loop by triggering useEffect with setInterval
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
        tankControls(gameDim,setPlayer, kbCheck, ['z',.04, 2]);
    }, [gameTicker])

    return (
        <div className="game-container">
            <div className="game-window" style={{ transform: `scale(${screenScale})`, left: `${borderWidth}px`, width: `${gameDim.w}px`, height: `${gameDim.h}px` }}>
                <Player player={player} setPlayer={setPlayer} />
               {allWalls.map((wallParams, i) => (
                 <Wall key={`wall${i}`} params = {wallParams}/>
               ))}
           
            </div>
        </div>
    )
};

export default GameWindow;