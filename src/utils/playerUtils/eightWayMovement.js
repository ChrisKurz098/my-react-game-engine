export default function eightWayMovement(gameDim,setPlayer, kbCheck, params) {
    setPlayer(old => {
        const [jumpSpeed, maxJump] = params;
        let { spdA: spd, w, h, x, y, scale, jump } = old;
        const change = {};
        let hDir = 0;
        let vDir = 0;
        //--jumping--//
        if (kbCheck.includes('z') && !jump) (change.jump = 1);
        if (jump === 1 && !kbCheck.includes('z')) change.jump = 2;
        if (jump === 1 && scale < maxJump) change.scale = scale + jumpSpeed;
        if (jump === 1 && scale >= maxJump) change.jump = 2;
        if (jump === 2 && scale > 1) { change.scale = scale - jumpSpeed; };
        if (jump === 2 && scale <= 1 && !kbCheck.includes('z')) { change.jump = 0; change.scale = 1 };

        if (kbCheck.includes('shift')) { spd = old.spdB }
        if (kbCheck.includes('arrowright')) { hDir = 1; (x > gameDim.w) ? change.x = -w : change.x = old.x + spd; }
        if (kbCheck.includes('arrowleft')) { hDir = -1; (x < -(w)) ? change.x = gameDim.w - 1 : change.x = old.x - spd; }
        if (kbCheck.includes('arrowup')) { vDir = -1; (y < -(h)) ? change.y = gameDim.h - 1 : change.y = old.y - spd; }
        if (kbCheck.includes('arrowdown')) { vDir = 1; (y > gameDim.h) ? change.y = -h : change.y = old.y + spd; }

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
        return {...old, ...change};
    });
}