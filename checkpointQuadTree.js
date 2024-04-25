"use strict"
//function checkBoundary(point, boundary, currentQuad){
function checkBoundary(point, parentQuad){
    // const Nw = parentQuad.Nw;
    // const Ne = parentQuad.Ne;
    // const Sw = parentQuad.Sw;
    // const Se = parentQuad.Se;
    let quadrants = [parentQuad.NW, parentQuad.NE, parentQuad.SW, parentQuad.SE]

    // const width = boundary.x + boundary.width;
    // const height = boundary.y + boundary.height;

    for(let i=0; i< quadrants.length; i++){
        if( point.x > quadrants[i].boundary.x &&
            point.x < (quadrants[i].boundary.x + quadrants[i].boundary.width)&& 
            point.y > quadrants[i].boundary.y &&
            point.y < (quadrants[i].boundary.y + quadrants[i].boundary.height)){return quadrants[i];}
    }
    //Nw
    // if( point.x > Nw.boundary.x &&
    //     point.x < (Nw.boundary.x + Nw.boundary.width)&& 
    //     point.y > Nw.boundary.y &&
    //     point.y < (Nw.boundary.y + Nw.boundary.height)){return Nw;}


    //Nw
    // if      (point.x > boundary.x &&
    //          point.x < (width)&& 
    //          point.y > boundary.y &&
    //          point.y < (height)){return currentQuad;}
    // //Ne
    // else if (point.x > (width) && 
    //          point.
    //          point.y < (height)){return currentQuad.Ne;}
    // //Sw
    // else if (point.x < (width) && 
    //          point.y > (height)){return currentQuad.Sw;}             
    // //Se           
    // else if (point.x > (width) && 
    //          point.y > (height)){return currentQuad.Se;}
    // else{
    //     console.debug(`something unexpected happened`);
    //     return null;
    // }
    console.debug(`something unexpected happened`);
    return null;
}

export{checkBoundary};