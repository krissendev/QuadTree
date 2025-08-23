"use strict";
import {decimalFixing} from '../util/decimalFixing.js'

//only for debugging
//let head=[];


function physicsMouseloopQuad(mousePosition,circleElements, QuadTree, svgQuadTree){    
    if (svgQuadTree ){
        //console.log(head)
        if(svgQuadTree.points.length >0){
            for(let i=0; i<svgQuadTree.points.length; i++){
                let circle = svgQuadTree.points[i].data;
                
                let cx = decimalFixing(circle.getAttribute('cx'));
                let cy = decimalFixing(circle.getAttribute('cy'));
                let r = decimalFixing(circle.getAttribute('r'));
                let mouseRad = 10;
                let combinedRadius = decimalFixing(r + mouseRad);
                

                if((mousePosition.x > (cx-r) && mousePosition.x < (cx+r))&&
                (mousePosition.y > (cy-r) && mousePosition.y < (cy+r))){
                    //circle.setAttribute('fill', '#ff0000');
                    //console.log(circle)
                    let dx = mousePosition.x - cx;
                    let dy = mousePosition.y - cy;
                    let distanceScalar = decimalFixing(Math.sqrt(dx * dx + dy * dy));
                    if (distanceScalar < combinedRadius) {

                        if (distanceScalar === 0) distanceScalar = 0.01;
                        /*let step1 = (Math.exp(-distanceScalar));
                        let step2 = 1/(step1-1);*/
                        let scale = 10;
                        let nx = decimalFixing(cx - (dx + scale / distanceScalar))
                        let ny = decimalFixing(cy - (dy + scale / distanceScalar))
                        //let nx = (dx / step2)+ cx ;
                        //let ny = (dy / step2)+ cy ;
                        
                        //console.log("mouseposition:", mousePosition)
                        // console.log(cx, cy)
                        // console.log(nx, ny)

                        circle.setAttribute('fill', '#ff0000');
                        circle.setAttribute('fill', '#ff0000');
                        circle.setAttribute('cx', ""+nx );
                        circle.setAttribute('cy', ""+ny );
                    }
                }                
                    
            }
        }
        
        else if(svgQuadTree.points.length === 0){
            const quadProperties = Object.keys(svgQuadTree);
            for(let i=0;i<quadProperties.length; i++){
                if(svgQuadTree[quadProperties[i]] instanceof QuadTree){
                    let quad = svgQuadTree[quadProperties[i]]

                    let boundary = quad.boundary;
                    //console.log(quad.points.length)
                    if( mousePosition.x>boundary.x &&
                        mousePosition.x<(boundary.x+boundary.width)&&
                        mousePosition.y>boundary.y &&
                        mousePosition.y<(boundary.y+boundary.height)
                        ){
                            //head.push(quadProperties[i])
                            physicsMouseloopQuad(mousePosition,circleElements, QuadTree, quad)
                            
  
                    }
                }
            }
            //head.pop();
        }
    }
}
export{physicsMouseloopQuad}