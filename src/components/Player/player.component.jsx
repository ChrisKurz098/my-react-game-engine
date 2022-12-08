
import testSprite from '../../resources/img/test.gif'

const Player = ({player, params}) => {
const {styling} = (params) ? params : {};
    return (
        <img src={testSprite} alt="pic" style={{ 
            zIndex: '999',
            transform: `rotate(${-player.dir}deg) scale(${player.scale})`,  
            width: `${player.w}px`, height: `${player.h}px`, 
            position: "absolute", 
            left: `${player.x}px`, 
            top: `${player.y}px`,
        ...styling }} />
    )
}

export default Player;