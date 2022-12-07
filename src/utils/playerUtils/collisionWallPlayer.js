export default function collisionWallPlayer(old, change, x,y,h,w) {
    const walls = document.querySelectorAll('.wall');
    walls.forEach((wall) => {
        let { height, width, left, top } = wall.style;
        width = parseInt(width);
        height = parseInt(height);
        let xx = parseInt(left);
        let yy = parseInt(top);
        const cxx = xx+width/2;
        const cyy = yy+height/2
        let cx = (change.x + w / 2);
        let cy = (change.y + h / 2);
        const hh = (cxx - cx >= 0) ? (1) : (-1);
        const vv = (cyy - cy >= 0) ? (1) : (-1);
        cx = cx + (w / 2 * hh);
        cy = cy + (h / 2 * vv);
         x = (old.x + w / 2)+ (w / 2 * hh);
         y = (old.y + h / 2)+ (h / 2 * vv);
        if (Math.abs(cxx - cx) <= (width/2) && y  >= yy && y  <= yy + height) change.x = old.x;

        if (Math.abs(cyy - cy) <= (height/2) && x >= xx && x <= xx + width) change.y = old.y;
    });
}
