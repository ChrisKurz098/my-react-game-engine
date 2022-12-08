import collisionWallPlayer from "./collisionWallPlayer";
import jumpPlayer from "./jumpPlayer";
export default function tankControls(gameDim, setPlayer, kbCheck, params) {
    setPlayer(old => {
        let {jumpKey,jumpSpeed, maxJump, turnSpeed} = params;
        let { spdA: spd, w, h, x, y, dir, scale, jump } = old;
        const change = {};
        if (!turnSpeed) turnSpeed = 4;

        //--Jump--//
        jumpPlayer(jumpKey,jump,scale,kbCheck,jumpSpeed, maxJump, change)

        //--run--//
        if (kbCheck.includes('shift')) { spd = old.spdB }

        //Rotate
        if (kbCheck.includes('arrowleft')) {
            (dir < 360) ? change.dir = dir + turnSpeed : change.dir = 0;
               }
        if (kbCheck.includes('arrowright')) {
            (dir <= 0) ? change.dir = 360 : change.dir = dir - turnSpeed;
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

//---Collision Detection WALLS ---//
collisionWallPlayer(old, change, x,y,h,w)


        return { ...old, ...change };
    });
}