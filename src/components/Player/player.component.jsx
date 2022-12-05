
import testSprite from '../../resources/img/test.gif'

const Player = ({player}) => {

    return (
        <img src={testSprite} alt="pic" style={{ transform: `rotate(${-player.dir}deg)`, animationPlayState: `${player.animate}`, width: `${player.w}px`, height: `${player.h}px`, position: "absolute", left: `${player.x}px`, top: `${player.y}px` }} />
    )
}

export default Player;