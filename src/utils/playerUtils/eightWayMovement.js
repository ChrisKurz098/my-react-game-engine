import collisionWallPlayer from "./collisionWallPlayer";
import jumpPlayer from "./jumpPlayer";
export default function eightWayMovement(gameDim, setPlayer, kbCheck, params) {
    setPlayer(old => {
        const [jumpSpeed, maxJump] = params;
        let { spdA: spd, w, h, x, y, scale, jump } = old;
      
        x = x + w / 2;
        y = y + h / 2;
        const change = { x: old.x, y: old.y };;
        let hDir = 0;
        let vDir = 0;

   //--Jump--//
   jumpPlayer(jump,scale,kbCheck,jumpSpeed, maxJump, change)

        if (kbCheck.includes('shift')) { spd = old.spdB }
        if (kbCheck.includes('arrowright')) { hDir = 1; (x > gameDim.w) ? change.x = -w : change.x += spd; }
        if (kbCheck.includes('arrowleft')) { hDir = -1; (x < -(w)) ? change.x = gameDim.w - 1 : change.x -= spd; }
        if (kbCheck.includes('arrowup')) { vDir = -1; (y < -(h)) ? change.y = gameDim.h - 1 : change.y -= spd; }
        if (kbCheck.includes('arrowdown')) { vDir = 1; (y > gameDim.h) ? change.y = -h : change.y += spd; }
        
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
//---Collision Detection WALLS ---//
collisionWallPlayer(old, change, x,y,h,w)
       
        return { ...old, ...change };
    });
}