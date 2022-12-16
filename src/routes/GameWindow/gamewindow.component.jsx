import { useEffect, useState } from "react";
import { checkScreenScale } from "../../utils/gameWindowUtils/checkScreenScale";
import setKeyListeners from "../../utils/gameWindowUtils/setKeyListeners";
import eightWayMovement from "../../utils/playerUtils/eightWayMovement";
import mouseAim from "../../utils/playerUtils/mouseAim";
import tankControls from "../../utils/playerUtils/tankControls";
import './gameWindowStyle.css'
import Wall from "../../components/Wall/wall.component";
import Player from "../../components/Player/player.component"
import levelArray from "./level";
const GameWindow = ({ gameDim, params }) => {
    const { styling } = (params) ? params : {};
    const [gameTicker, setGameTicker] = useState(0);
    const [screenScale, setScreenScale] = useState(window.innerWidth / gameDim.w);
    const [player, setPlayer] = useState({ w: 50, h: 50, x: 80, y: 80, dir: 0, jump: 0, momentum: .5, cSpd: 0, spdA: 5, spdB: 10, scale: 1 })
    const [kbCheck, setKbCheck] = useState([]);
    const [msCheck, setMsCheck] = useState({});
    let borderWidth = (window.innerWidth - (screenScale * gameDim.w)) / 2; //calcualtes the width of the left and right black bars
    const allWalls = [
        { w: 32, h: 32, x: 320, y: 233, sprite: '/wall.png', tile: true, tileSize: [64, 64] },
        { w: 32, h: 32, x: 800, y: 30, jumpOver: true },
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
        tankControls(gameDim, setPlayer, kbCheck, {
            jumpKey: 'z',
            jumpSpeed: .04,
            maxJump: 2,
            turnSpeed: 5
        });
    }, [gameTicker])

  
    return (
        <div className="game-container">
            <div className="game-window" style={{ transform: `scale(${screenScale})`, left: `${borderWidth}px`, width: `${gameDim.w}px`, height: `${gameDim.h}px`, ...styling }}>
                <Player player={player} setPlayer={setPlayer} />
                {levelArray.map((row, i) => {
                    return row.map((wall, j) => {
                        return (!wall) ? (false) : (<Wall key={`wall${j}`} params={{
                            ...allWalls[wall - 1],
                            x: 32 * j,
                            y: 32 * i

                        }} />)
                    }
                    )
                })
                };

            </div>
        </div>
    )
};

export default GameWindow;