"use strict"
function checkBoundary(point, boundary, currentQuad){
    const width = boundary.x + boundary.width;
    const height = boundary.y + boundary.height;
    //Nw
    if      (point.x < (width/2)&& 
              point.y < (height/2)){return currentQuad.Nw;}
    //Ne
    else if (point.x > (width/2) && 
             point.y < (height/2)){return currentQuad.Ne;}
    //Sw
    else if (point.x < (width/2) && 
             point.y > (height/2)){return currentQuad.Sw;}             
    //Se           
    else if (point.x > (width/2) && 
             point.y > (height/2)){return currentQuad.Se;}
    else{
        console.debug(`something unexpected happened`);
        return null;
    }
}

export{checkBoundary};