"use strict";
import{moveCircle} from './pointRelocate.js'

function checkBorders(tempTree, QuadTree, boundary, direction,  point, cx, cy, r, headBorderTarget){
    console.log("checkBorders",headBorderTarget);
    //this tempTree is the end point to check for
    if(tempTree.points.length>0){
        //check points against point
        for(let j=0; j<tempTree.points.length; j++){
            let point2 = tempTree.points[j].data;
            if(point!==point2){
                moveCircle(point, point2);
            }
        }

    }
    else{
        
        const quadProperties = Object.keys(tempTree);
        for(let i=0; i< quadProperties.length; i++){
            if(tempTree[quadProperties[i]]!=null){

                if(tempTree[quadProperties[i]] instanceof QuadTree){
                    let quadBoundary = tempTree[quadProperties[i]].boundary;
                    //continue deeper if point is within bounds
                    if(quadBoundary.x < cx-r &&
                       quadBoundary.y < cy-r &&
                       (quadBoundary.x + quadBoundary.width)  > cx+r &&
                       (quadBoundary.y + quadBoundary.height) > cy+r){
                         //en akse er presis, type : x'{x, x+width}
                         //en annen akse er retningsmessig prioritert, type y'>{y} men av alle y'':{y1',y2',y3'} den minste
                         //matches the boundary!
     
                         //Because multiple nested quads can in theory be in bounds of the point diameter, tempTree should not be changed
                         //so that it can be reused in the loop for multicases, therefore using "recursiveInstancedTempTree" instead in the recursion "checkBorders"
                         let recursiveInstancedTempTree = tempTree[quadProperties[i]];
                         
                         checkBorders(recursiveInstancedTempTree, QuadTree, boundary, direction,  point, cx, cy, r);
                    }
                }
            }
            
        }

        //else no point found
    }
}
export{checkBorders}