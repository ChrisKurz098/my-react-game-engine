export function checkScreenScale(gameDim,setScreenScale) {
    const h = window.innerHeight;
    const w = window.innerWidth;
    const ratio = gameDim.w/gameDim.h;
    (w/h) > ratio ? setScreenScale((h) / (gameDim.h)) : setScreenScale((w) / (gameDim.w));
    
  }