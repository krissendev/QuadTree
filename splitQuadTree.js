"use strict"
function borderQuadsplit(boundary, tag){
    console.log("splitting boreders");
    const quadborderbox= {
        nw:{
            x: boundary.x,
            y: boundary.y,
            width: boundary.width/2,
            height: boundary.height/2
        }, 
        ne:{
            x: boundary.x + boundary.width/2,
            y: boundary.y,
            width: boundary.width/2,
            height: boundary.height/2
        }, 
        sw:{
            x: boundary.x,
            y: boundary.y + boundary.height/2,
            width: boundary.width/2,
            height: boundary.height/2
        },
        se:{
            x: boundary.x + boundary.width/2,
            y: boundary.y + boundary.height/2,
            width: boundary.width/2,
            height: boundary.height/2
        } 
    }
    return quadborderbox;
}

export{borderQuadsplit};