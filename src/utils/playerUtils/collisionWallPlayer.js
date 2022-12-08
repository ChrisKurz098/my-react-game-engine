export default function collisionWallPlayer(old, change, x, y, h, w) {
    const walls = document.querySelectorAll('.wall');
    walls.forEach((wall) => {
        if (wall.className.includes('jump-over') && old.jump>0) {

        } else {
           
            //deconstruct style data (strings) from wall element...
            let { height, width, left, top } = wall.style;
            //...and parseInt from the strings
            width = parseInt(width);
            height = parseInt(height);
            let wx = parseInt(left);
            let wy = parseInt(top);
            //find the center of the wall
            const cwx = wx + width / 2;
            const cwy = wy + height / 2
            //find the center point of where the player is going to move
            let cx = (change.x + w / 2);
            let cy = (change.y + h / 2);
            //find the sides of the player that are facing the wall
            const hh = (cwx - cx >= 0) ? (1) : (-1);
            const vv = (cwy - cy >= 0) ? (1) : (-1);
            //find the x and y position of the players sides for where the player will go...
            cx = cx + (w / 2 * hh);
            cy = cy + (h / 2 * vv);
            //...and where the player currently is
            x = (old.x + w / 2) + (w / 2 * hh);
            y = (old.y + h / 2) + (h / 2 * vv);
            if (Math.abs(cwx - x) <= (width / 2) &&  Math.abs(cwy - y) <= (height / 2)) {
                //if player is inside a wall push them out
                change.x -=  (old.spdB+2) * Math.cos((old.dir) * Math.PI / 180);;
                change.y += (old.spdB+2) * Math.sin((old.dir) * Math.PI / 180);
                change.dir = old.dir;
               
            } else {
            //if where the player is going to be is a collision...
            //...and if the the CURRENT position of the opposite axis is a collision...
            //...do not update that position
            if (Math.abs(cwx - cx) <= (width / 2) && Math.abs(cwy - y) <= (height / 2)) change.x = old.x;
            if (Math.abs(cwy - cy) <= (height / 2) && Math.abs(cwx - x) <= (width / 2)) change.y = old.y;
            }

        }
    });
}
