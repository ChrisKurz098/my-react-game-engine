export default function tankControls(gameDim, setPlayer, kbCheck, params) {
    setPlayer(old => {
        let [jumpSpeed, maxJump, turnSpeed] = params;
        let { spdA: spd, w, h, x, y, dir, scale, jump } = old;
        const change = {};
        if (!turnSpeed) turnSpeed = 4;
        //--jumping--//
        if (kbCheck.includes('z') && !jump) (change.jump = 1);
        if (jump === 1 && !kbCheck.includes('z')) change.jump = 2;
        if (jump === 1 && scale < maxJump) change.scale = scale + jumpSpeed;
        if (jump === 1 && scale >= maxJump) change.jump = 2;
        if (jump === 2 && scale > 1) { change.scale = scale - jumpSpeed; };
        if (jump === 2 && scale <= 1 && !kbCheck.includes('z')) { change.jump = 0; change.scale = 1 };

  
        if (kbCheck.includes('shift')) { spd = old.spdB }

          //Rotate
          if (kbCheck.includes('arrowleft')) {
            (dir < 360) ? change.dir = dir+turnSpeed : change.dir = 0;
            console.log(dir)
           }
           if (kbCheck.includes('arrowright')) {
               (dir <= 0) ? change.dir = 360 : change.dir = dir - turnSpeed;
               console.log(dir)
           }

        if (kbCheck.includes('arrowup')) {
            x += spd * Math.cos((change.dir || dir) * Math.PI / 180);
            y -= spd * Math.sin((change.dir || dir) * Math.PI / 180);
        }
        if (kbCheck.includes('arrowdown')) {
          x -= spd * Math.cos((change.dir || dir) * Math.PI / 180);
          y += spd * Math.sin((change.dir || dir) * Math.PI / 180);

      }

      change.x = x;
      change.y = y;


      const walls = document.querySelectorAll('.wall');
      walls.forEach((wall) => {
        let { height, width, left, top } = wall.style;
        width = parseInt(width);
        height = parseInt(height);
        let xx = parseInt(left); const xxx = xx + (width / 2);
        let yy = parseInt(top); const yyy = yy + (height / 2);
        const cx = (change.x + w / 2) ;
        const cy = (change.y + h / 2) ;
        const hh = (xx - cx >= 0) ? (1) : (-1);
        const vv = (yy - cy >= 0) ? (1) : (-1);
        if (cx >= xx && cx <= xx+width && y + (h / 2 * vv) >= yyy - height / 2 && y + (h / 2 * vv)<= yy + height / 2) change.x = old.x;
        if (cy >= yy && cy <= yy+height && x + (w / 2 * hh) >= xxx - width / 2 && x + (w / 2 * hh)<= xx + width / 2) change.y = old.y;

      });


        return { ...old, ...change };
    });
}