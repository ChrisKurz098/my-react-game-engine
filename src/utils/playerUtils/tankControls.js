export default function tankControls(gameDim, setPlayer, kbCheck, params) {
    setPlayer(old => {
        const [jumpSpeed, maxJump, turnSpeed] = params;
        let { spdA: spd, x, y, scale, jump, dir } = old;
        const change = {};

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
           }
           if (kbCheck.includes('arrowright')) {
               (dir <= 0) ? change.dir = 360 : change.dir = dir - turnSpeed;
           }

        if (kbCheck.includes('arrowup')) {
            x += spd * Math.cos((change.dir || dir) * Math.PI / 180);
            y -= spd * Math.sin((change.dir || dir) * Math.PI / 180);
            change.x = x;
            change.y = y;
        }
        //if (kbCheck.includes('arrowdown')) { vDir = 1; (y > gameDim.h) ? change.y = -h : change.y = old.y + spd; }

      
      console.log(change.dir, dir, turnSpeed)
        return { ...old, ...change };
    });
}