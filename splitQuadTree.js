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
            x: boundary.width/2,
            y: boundary.y,
            width: boundary.width,
            height: boundary.height/2
        }, 
        sw:{
            x: boundary.x,
            y: boundary.height/2,
            width: boundary.width/2,
            height: boundary.height
        },
        se:{
            x: boundary.width/2,
            y: boundary.height/2,
            width: boundary.width,
            height: boundary.height
        } 
    }
    return quadborderbox;
}

export{borderQuadsplit};