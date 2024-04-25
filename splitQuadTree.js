"use strict"
function borderQuadsplit(boundary){
    // console.log("splitting boreders");
    const quadborderbox= {
        NW:{
            x: boundary.x,
            y: boundary.y,
            width: boundary.width/2,
            height: boundary.height/2
        }, 
        NE:{
            x: boundary.x + boundary.width/2,
            y: boundary.y,
            width: boundary.width/2,
            height: boundary.height/2
        }, 
        SW:{
            x: boundary.x,
            y: boundary.y + boundary.height/2,
            width: boundary.width/2,
            height: boundary.height/2
        },
        SE:{
            x: boundary.x + boundary.width/2,
            y: boundary.y + boundary.height/2,
            width: boundary.width/2,
            height: boundary.height/2
        } 
    }
    return quadborderbox;
}

export{borderQuadsplit};