import collisionWallPlayer from "./collisionWallPlayer";
import jumpPlayer from "./jumpPlayer";
export default function mouseAim(gameDim, setPlayer, kbCheck, msCheck, params) {
    setPlayer(old => {
        const [jumpKey,jumpSpeed, maxJump] = params;
        let { spdA: spd, w, h, x, y, scale, jump } = old;

        x = x + w / 2;
        y = y + h / 2

        const change = { x: old.x, y: old.y };

        var rect = document.getElementsByClassName('game-window')[0].getBoundingClientRect();
        const scaleSize = rect.width / gameDim.w;
        var xm = (msCheck.clientX - rect.x) / scaleSize; //x position within the element.
        var ym = (msCheck.clientY - rect.y) / scaleSize;  //y position within the element.
        let hDir = 0;
        let vDir = 0;

   //--Jump--//
   jumpPlayer(jumpKey,jump,scale,kbCheck,jumpSpeed, maxJump, change)

        if (kbCheck.includes('shift')) { spd = old.spdB }
        if (kbCheck.includes('d')) { hDir = 1; (x > gameDim.w) ? change.x = -w : change.x += spd; }
        if (kbCheck.includes('a')) { hDir = -1; (x < -(w)) ? change.x = gameDim.w - 1 : change.x -= spd; }
        if (kbCheck.includes('w')) { vDir = -1; (y < -(h)) ? change.y = gameDim.h - 1 : change.y -= spd; }
        if (kbCheck.includes('s')) { vDir = 1; (y > gameDim.h) ? change.y = -h : change.y += spd; }

        const rad = Math.atan2((ym - y), (xm - x));
        change.dir = rad * -180 / Math.PI;

        //---Collision Detection WALLS ---//
        collisionWallPlayer(old, change, x,y,h,w)


        return { ...old, ...change };
    });
}