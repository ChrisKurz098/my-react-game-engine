import { useEffect, useState } from "react";
import { checkScreenScale } from "../../utils/gameWindowUtils/checkScreenScale";
import './gameWindowStyle.css'
import testSprite from '../../resources/img/test.gif'
const GameWindow = ({gameDim}) => {
    const [gameTicker, setGameTicker] = useState(0);
    const [screenScale, setScreenScale] = useState(window.innerWidth / gameDim.w);
    const [player, setPlayer] = useState({x: 0, y: 0})
    let borderWidth = (window.innerWidth - (screenScale * gameDim.w)) / 2; //calcualtes the width of the left and right black bars
   

    useEffect(() => {
        setInterval(() => {
            requestAnimationFrame(() => {
                setGameTicker(old => ((old < 720) ? old + 1 : 0));
                checkScreenScale(gameDim, setScreenScale);
            })
        }, 16.67)
    }, [])

    useEffect(() => {
       //Game logic goes here
       setPlayer(old => {
        return (player.x>gameDim.w) ? {x:-250} : {x: old.x+5}
       })
    }, [gameTicker])

    return (
        <div className="game-container">
            <div className="game-window" style={{transform: `scale(${screenScale})`, left: `${borderWidth}px`, width: `${gameDim.w}px`, height: `${gameDim.h}px` }}>
                <img src={testSprite} alt="pic" style={{ 'position': "absolute", 'left': `${player.x}px`, 'top': `${player.y}px` }} />
            </div>
        </div>
    )
};

export default GameWindow;