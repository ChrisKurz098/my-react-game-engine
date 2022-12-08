export default function jumpPlayer(key,jump,scale,kbCheck,jumpSpeed, maxJump, change){

            //--jumping (0 = not jumping, 1 = jumping, 2 = falling)--//
            if (kbCheck.includes(key) && !jump) (change.jump = 1);
            if (jump === 1 && !kbCheck.includes(key)) change.jump = 2;
            if (jump === 1 && scale < maxJump) change.scale = scale + jumpSpeed;
            if (jump === 1 && scale >= maxJump) change.jump = 2;
            if (jump === 2 && scale > 1) { change.scale = scale - jumpSpeed; };
            if (jump === 2 && scale <= 1 && !kbCheck.includes(key)) { change.jump = 0; change.scale = 1 };
            
}