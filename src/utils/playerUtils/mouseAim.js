export default function mouseAim(gameDim, setPlayer, kbCheck, msCheck, params) {
    setPlayer(old => {
        const [jumpSpeed, maxJump] = params;
        let { spdA: spd, w, h, x, y, scale, jump } = old;

        x = x + w / 2;
        y = y + h / 2

        const change = { x: old.x, y: old.y };
        const walls = document.querySelectorAll('.wall');

        var rect = document.getElementsByClassName('game-window')[0].getBoundingClientRect();
        const scaleSize = rect.width / gameDim.w;
        var xm = (msCheck.clientX - rect.x) / scaleSize; //x position within the element.
        var ym = (msCheck.clientY - rect.y) / scaleSize;  //y position within the element.
        let hDir = 0;
        let vDir = 0;
        //--jumping--//
        if (kbCheck.includes(' ') && !jump) (change.jump = 1);
        if (jump === 1 && !kbCheck.includes(' ')) change.jump = 2;
        if (jump === 1 && scale < maxJump) change.scale = scale + jumpSpeed;
        if (jump === 1 && scale >= maxJump) change.jump = 2;
        if (jump === 2 && scale > 1) { change.scale = scale - jumpSpeed; };
        if (jump === 2 && scale <= 1 && !kbCheck.includes(' ')) { change.jump = 0; change.scale = 1 };

        if (kbCheck.includes('shift')) { spd = old.spdB }
        if (kbCheck.includes('d')) { hDir = 1; (x > gameDim.w) ? change.x = -w : change.x += spd; }
        if (kbCheck.includes('a')) { hDir = -1; (x < -(w)) ? change.x = gameDim.w - 1 : change.x -= spd; }
        if (kbCheck.includes('w')) { vDir = -1; (y < -(h)) ? change.y = gameDim.h - 1 : change.y -= spd; }
        if (kbCheck.includes('s')) { vDir = 1; (y > gameDim.h) ? change.y = -h : change.y += spd; }

        walls.forEach((wall) => {
            let { height, width, left, top } = wall.style;
            width = parseInt(width);
            height = parseInt(height);
            let xx = parseInt(left); xx = xx + (width / 2);
            let yy = parseInt(top); yy = yy + (height / 2);
            const cx = (change.x + w / 2) + (w / 2 * hDir);
            const cy = (change.y + h / 2) + (h / 2 * vDir);
            if (Math.abs(xx - cx) <= (width / 2) && cy - (h / 2 * vDir) >= yy - height / 2 && cy - (h / 2 * vDir) <= yy + height / 2) {
                change.x = old.x;
            };
            if (Math.abs(yy - cy) <= (height / 2) && cx - (w / 2 * hDir) >= xx - width / 2 && cx - (w / 2 * hDir) <= xx + width / 2) {
                change.y = old.y;
            };
        });
        const rad = Math.atan2((ym - y), (xm - x));
        change.dir = rad * -180 / Math.PI;

        return { ...old, ...change };
    });
}