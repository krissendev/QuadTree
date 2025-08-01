"use strict"
function borderQuadsplit(boundary){
    //Imprecise decimal fixing
    // let boundX = Number(parseFloat(boundary.x).toFixed(2));
    // let boundY =Number(parseFloat(boundary.y).toFixed(2));
    // let halfHeight = Number(parseFloat(boundary.height/2).toFixed(2));
    // let halfWidth = Number(parseFloat(boundary.width/2).toFixed(2));
    // let boundXhalfWidth = Number(parseFloat(boundX + halfWidth).toFixed(2));
    // let boundYhalfHeight = Number(parseFloat(boundY + halfHeight).toFixed(2));

    let boundX           = decimalFixing(boundary.x)
    let boundY           = decimalFixing(boundary.y)
    let halfHeight       = decimalFixing(boundary.height/2)
    let halfWidth        = decimalFixing(boundary.width/2)
    let boundXhalfWidth  = decimalFixing(boundX+halfWidth)
    let boundYhalfHeight = decimalFixing(boundY+halfHeight)

    //console.log("boundX:",boundX, " boundY:",boundY, " halfHeight:",halfHeight, " halfWidth:", halfWidth)
    const quadborderbox= {
        NW:{
            x: boundX,
            y: boundY,
            width: halfWidth,
            height: halfHeight
        }, 
        NE:{
            x: boundXhalfWidth,
            y: boundY,
            width: halfWidth,
            height: halfHeight
        }, 
        SW:{
            x: boundX,
            y: boundYhalfHeight,
            width: halfWidth,
            height: halfHeight
        },
        SE:{
            x: boundXhalfWidth,
            y: boundYhalfHeight,
            width: halfWidth,
            height: halfHeight
        } 
    }
    return quadborderbox;
}
function decimalFixing(num){
    return +(Math.round(num + "e+2") + "e-2");
}

export{borderQuadsplit};