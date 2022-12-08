const Wall = ({ params }) => {
    const { x = 200, y = 200, h = 100, w = 100, color = 'red', sprite = false, opacity = 1, tile = true, tileSize = [100,100], jumpOver = false, styling } = params;
    return (sprite) ? (
        (tile) ? (
            <div className={(jumpOver) ? "wall jump-over" : "wall"} style={{
                position: 'absolute', top: `${y}px`, left: `${x}px`, width: `${w}px`, height: `${h}px`, backgroundColor: `${color}px`, opacity: `${opacity}`,
                backgroundImage: `url("${require(`../../resources/img/${sprite}`)}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: `${tileSize[0]}px ${tileSize[1]}px`,
                ...styling
            }} />
        ) : (
            <div className={(jumpOver) ? "wall jump-over" : "wall"} style={{
                position: 'absolute', top: `${y}px`, left: `${x}px`, width: `${w}px`, height: `${h}px`, backgroundColor: `${color}px`, opacity: `${opacity}`,
                backgroundImage: `url("${require(`../../resources/img${sprite}`)}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${w}px ${h}px`, ...styling
            }} />
        )

    ) : (
        <div className={(jumpOver) ? "wall jump-over" : "wall"} style={{ position: 'absolute', top: `${y}px`, left: `${x}px`, width: `${w}px`, height: `${h}px`, backgroundColor: `${color} `, opacity: `${opacity} `, ...styling }} />
    )
}

export default Wall;