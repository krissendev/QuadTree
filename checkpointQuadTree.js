"use strict"
function checkBoundary(point, boundary, currentQuad){
    const width = boundary.x + boundary.width;
    const height = boundary.y + boundary.height;
    //Nw
    if      (point.x < (width)&& 
              point.y < (height)){return currentQuad.Nw;}
    //Ne
    else if (point.x > (width) && 
             point.y < (height)){return currentQuad.Ne;}
    //Sw
    else if (point.x < (width) && 
             point.y > (height)){return currentQuad.Sw;}             
    //Se           
    else if (point.x > (width) && 
             point.y > (height)){return currentQuad.Se;}
    else{
        console.debug(`something unexpected happened`);
        return null;
    }
}

export{checkBoundary};