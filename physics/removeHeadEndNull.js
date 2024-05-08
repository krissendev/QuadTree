"use strict";
function removeHeadEndNull(headBorderTarget){
    try{
    //tempHeadClone     ["NW","SE"...]
    //tempTree          root:{NW:{SE:....}}
    //head is used in every iteration of crossingBorders
    //headBorderTarget is crossingBorders target destination

    let tempTree = window.svgQuadTree;;
    for(let h = 0; h<headBorderTarget.length; h++){
        // console.log(tempTree);
        if(tempTree[headBorderTarget[h]]!=null){
            tempTree = tempTree[headBorderTarget[h]]
            
            //in the case of containing no null entries
            if(h==(headBorderTarget.length-1)){
                return headBorderTarget;
            }
        }
        //else if(tempTree[headBorderTarget[h]]==null){
        else {
            //when a null entry is reached all remaining array entries are dropped
            //let indexesDeleted = headBorderTarget.length - headBorderTarget[h];
            let indexesDeleted = headBorderTarget.length - h;
            headBorderTarget = headBorderTarget.slice(0,-indexesDeleted)
            // console.log("inside null drop:", headBorderTarget, "is null?:", tempTree[headBorderTarget[h]], headBorderTarget.length, h, tempTree)
            return headBorderTarget;
        }
        
    }
    }
    catch(error){
        console.log(error)
    }
    
}