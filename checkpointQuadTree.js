"use strict"
function checkBoundary(point, boundary){
    const width = boundary.x + boundary.width;
    const height = boundary.y + boundary.height;
    //Nw
    if      (point.x < (width)&& 
              point.y < (height)){return boundary;}
    //Ne
    else if (point.x > (width) && 
             point.y < (height)){return boundary;}
    //Sw
    else if (point.x < (width) && 
             point.y > (height)){return boundary;}             
    //Se           
    else if (point.x > (width) && 
             point.y > (height)){return boundary;}
    else{
        console.debug(`something unexpected happened`);
        return null;
    }
}

export{checkBoundary};