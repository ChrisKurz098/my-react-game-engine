export default function mouseAim(gameDim, setPlayer, kbCheck, msCheck, params) {
    setPlayer(old => {
        const [jumpSpeed, maxJump] = params;
        let { spdA: spd, w, h, x, y, scale, jump } = old;
       
        x = x+w/2;
        y= y+h/2
     
        const change = {x: old.x, y: old.y};
        const walls = document.querySelectorAll('.wall');

        var rect = document.getElementsByClassName('game-window')[0].getBoundingClientRect();
        const scaleSize = rect.width / gameDim.w;
        var xm = (msCheck.clientX - rect.x) / scaleSize; //x position within the element.
        var ym = (msCheck.clientY - rect.y) / scaleSize;  //y position within the element.
        //--jumping--//
        if (kbCheck.includes(' ') && !jump) (change.jump = 1);
        if (jump === 1 && !kbCheck.includes(' ')) change.jump = 2;
        if (jump === 1 && scale < maxJump) change.scale = scale + jumpSpeed;
        if (jump === 1 && scale >= maxJump) change.jump = 2;
        if (jump === 2 && scale > 1) { change.scale = scale - jumpSpeed; };
        if (jump === 2 && scale <= 1 && !kbCheck.includes(' ')) { change.jump = 0; change.scale = 1 };

        if (kbCheck.includes('shift')) { spd = old.spdB }
        if (kbCheck.includes('d')) { (x > gameDim.w) ? change.x = -w : change.x = old.x + spd; }
        if (kbCheck.includes('a')) { (x < -(w)) ? change.x = gameDim.w - 1 : change.x = old.x - spd; }
        if (kbCheck.includes('w')) { (y < -(h)) ? change.y = gameDim.h - 1 : change.y = old.y - spd; }
        if (kbCheck.includes('s')) { (y > gameDim.h) ? change.y = -h : change.y = old.y + spd; }

        walls.forEach((wall) => {
            let {height, width, left, top} = wall.style;
            width = parseInt(width);
            height = parseInt(height);
            let xx= parseInt(left); xx = xx+(width/2);
            let yy= parseInt(top); yy = yy+(height/2);
            
            if (Math.abs(xx-(change.x+w/2)) <= (width/2) && y >= yy-height/2  && y<= yy+height/2) {
                console.log('xcollision'); 
                change.x = old.x;
            };
            if (Math.abs(yy-(change.y+h/2)) <= (height/2) && x >= xx-width/2 && x<= xx+width/2) {
                console.log('ycollision'); 
                change.y = old.y;
            };
            
        });
        const rad = Math.atan2((ym - y), (xm - x));
        change.dir = rad * -180 / Math.PI;

        return { ...old, ...change };
    });
}