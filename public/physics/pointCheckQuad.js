"use strict";
import{checkBorders} from './pointCheckBorder.js'
import{removeHeadEndNull} from './removeHeadEndNull.js'
import{moveCircle} from './pointRelocate.js'



function physicsCircleCollisionQuad(QuadTree, head){
    //console.log("physicsCircleCollisionQuad", head)
    //currentQuad refresh of window.svgQuadTree for consistent read/lookup
    let currentQuad = window.svgQuadTree;
    if(head.length>0){
        for(let i = 0; i<head.length;i++){
            if(currentQuad[head[i]]!=null && currentQuad!=null){
                currentQuad = currentQuad[head[i]];
            }
            else{break;}
        }
    }

    //Check point collision
    if(currentQuad.points.length >0){   
        //there is no point of checking with 1 or less points against each other
        for(let i=0; i<currentQuad.points.length; i++){
            
            //check point against overlap in current quad
            if(currentQuad.points.length >1){
                for(let j=i+1; j<currentQuad.points.length; j++){
    
                    let circleI = currentQuad.points[i].data;
                    let circleJ = currentQuad.points[j].data;
                    moveCircle(circleI, circleJ);
                }
            }

            //check if point against boundary and eventual points at intersection
            let circle = currentQuad.points[i].data;
            let cx = parseFloat(circle.getAttribute('cx'));
            let cy = parseFloat(circle.getAttribute('cy'));
            let r = parseFloat(circle.getAttribute('r'));
            let boundary = currentQuad.boundary;

            //SeNwNeNw + N = NeSwSeSw(Sw=null) -> NeSwSe
            //SeNwNeSe + S = SeNwSe
            //SeNw + W = SwNe (Ne=null) -> Sw


            let crossingBorders = [];
            if(cy-r < boundary.y){crossingBorders.push("N")}
            if(cx+r > (boundary.x + boundary.width)){crossingBorders.push("E")}
            if(cx-r < boundary.x){crossingBorders.push("W")}
            if(cy+r > (boundary.y + boundary.height)){crossingBorders.push("S")}
            //console.log(`cy: ${cy}, r: ${r}, cy + r: ${cy + r}, boundary.y: ${boundary.y}, boundary.height: ${boundary.height}, total boundary height: ${boundary.y + boundary.height}`, crossingBorders);
            

            //Every crossingBorder is checked for point overlap by using "headBorderTarget" as a shorthand starting lookup point             
            if(crossingBorders.length >0){
                let headBorderTarget;
                for(let j =0; j< crossingBorders.length; j++){

                    headBorderTarget = head.slice();
                    let switchPairObj =  {"N":"S", "S":"N", "E":"W", "W":"E"};
                    
                    //swap based on parameter
                    for(let k = headBorderTarget.length; k>0; k--){
						
						//crossingBorders ammount of borders to check and loop  through
						//headBorderTarget = ["NW", "NE","SW"....]
						//crossingBorders[i].tag = "W" ..etc


                        //if it contains the opposite axis, it's a match. Switch and exit
                        if(headBorderTarget[k-1].includes(switchPairObj[crossingBorders[j]])){
                            //console.log("SWAPLOG;BREAK ", "axis:",crossingBorders[j], " value/pre:",headBorderTarget[k-1])
                            headBorderTarget[k-1] = headBorderTarget[k-1].replace(switchPairObj[crossingBorders[j]], crossingBorders[j]);
                            //console.log("SWAPLOG;BREAK ", "axis:",crossingBorders[j], " value/post:",headBorderTarget[k-1])
                            break;
                        }
                        //else if it contains the same axis, switch and continue until root
                        else if(headBorderTarget[k-1].includes(crossingBorders[j])){
                            //console.log("SWAPLOG;CONTINUE ", "axis:",crossingBorders[j], " value/pre:",headBorderTarget[k-1])
                            headBorderTarget[k-1] = headBorderTarget[k-1].replace(crossingBorders[j], switchPairObj[crossingBorders[j]])
                            //console.log("SWAPLOG;CONTINUE ", "axis:",crossingBorders[j], " value/post:",headBorderTarget[k-1])
                                                        
                        }
                    }
					
					//check for null entries
                    headBorderTarget = removeHeadEndNull(headBorderTarget);
                    //console.log("headBorderTarget",headBorderTarget)
                    
                    if(headBorderTarget!=null){
                        let tempTree = window.svgQuadTree;;
                        for(let j=0; j<headBorderTarget.length; j++){
                            let copy1 = JSON.parse(JSON.stringify(headBorderTarget[j]));
                            let copy2 = JSON.parse(JSON.stringify(tempTree[headBorderTarget[j]]));
    
                            if(tempTree[headBorderTarget[j]]==null){
                                //console.log("? undefined",copy1, typeof(copy1), copy2 )
                            }
                            else{
                                // console.log("DB accessor on tempTree:",copy1, "\n Headbordertarget:", headBorderTarget, headBorderTarget.length-1, j)
                                tempTree = tempTree[headBorderTarget[j]];
                            }
                            //let copy2 = JSON.parse(JSON.stringify(tempTree));
                            // console.log("DB final tempTree:",copy2)
                        }
                        let point = currentQuad.points[i].data;
                        //opposite direction to find the closest boundary in the boundary checkup of headBorderTarget-tempTree
                        let direction = switchPairObj[crossingBorders[i]];
                        checkBorders(tempTree, QuadTree, boundary, direction, point, cx, cy, r, headBorderTarget);
    
                        //if tempTree does not have instances of QuadTree check the matching quad to boundary
                        //else if tempTree has QuadTree run a recursive function until the matchin boundary has
                        //no further QuadTree instances
                    }


                }
            }

        }
    }
    //Recurse deper
    else{
        const quadProperties = Object.keys(currentQuad);
        for(let i=0;i<quadProperties.length; i++){
            const property=quadProperties[i]
            const propertyValue= currentQuad[property];
            if(propertyValue instanceof QuadTree){
                //console.log("in", head);
                head.push(property)
                physicsCircleCollisionQuad(QuadTree, head)
            }
        }
    }
    head.pop();
    //console.log("out", head);
} 

export{physicsCircleCollisionQuad}