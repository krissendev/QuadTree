"use strict"

function checkBoundary(point, parentQuad){
    //check if point position is within boundary of any of the children quad in the parentQuad
    let quad = [parentQuad.NW, parentQuad.NE, parentQuad.SW, parentQuad.SE]

    for(let i=0; i< quad.length; i++){
        let boundary = quad[i].boundary; 
        if( point.x > boundary.x &&
            point.x < (boundary.x + boundary.width)&& 
            point.y > boundary.y &&
            point.y < (boundary.y + boundary.height)){return quad[i];}
    }

    console.debug(`something unexpected happened`, point.x, point.y, typeof(point.x), parentQuad);
    return null;
}

export{checkBoundary};