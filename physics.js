"use strict";

let physicsIntervalSwarm;
let physicsIntervalCursor;
let physicsIntervalSwarmCollision;
let looping = false;

function startPhysicsloop(mousePosition, QuadTree, svgQuadTree){
    //
    svgQuadTree = window.svgQuadTree;

    //console.log("startphysics");
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    if(!looping){
        looping = true;
        physicsMouseloopQuad(mousePosition, circleElements, QuadTree, svgQuadTree);
        physicsIntervalCursor = setInterval(() => {
            physicsMouseloopQuad(mousePosition, circleElements, QuadTree, svgQuadTree)
        }, 100);
        physicsIntervalSwarm = setInterval(() => {
            physicsSwarmMove(circleElements)
        }, 100); 
        physicsIntervalSwarmCollision = setInterval(() => {
            physicsCircleCollisionQuad(circleElements, QuadTree, svgQuadTree)
        }, 100);
    }
}
function stopPhysicsloop(){
    if(looping){
        clearInterval(physicsIntervalSwarm);
        clearInterval(physicsIntervalCursor);
        clearInterval(physicsIntervalSwarmCollision);
        
        looping = false;
    }
}

function physicsMouseloop(mousePosition,circleElements, QuadTree, svgQuadTree){
    
    //console.log("looping");
    if (looping && circleElements ){
         //console.log("looping");
        if (looping && circleElements ){
            console.log(circleElements.length)
            circleElements.forEach(circle => {
                let cx = parseFloat(circle.getAttribute('cx'));
                let cy = parseFloat(circle.getAttribute('cy'));
                let r = parseFloat(circle.getAttribute('r'));

                if((mousePosition.x > (cx-r) && mousePosition.x < (cx+r))&&
                (mousePosition.y > (cy-r) && mousePosition.y < (cy+r))){
                        //console.log(`mp:${mousePosition.x} ${mousePosition.y}, circle: ${cx} ${cy} ${r}`);
                        circle.setAttribute('fill', '#ff0000');
                        
                        let dx = mousePosition.x - cx;
                        let dy = mousePosition.y - cy;
                        let distanceScalar = Math.sqrt(dx * dx + dy * dy);
                        let step1 = (Math.exp(-distanceScalar));
                        let step2 = 1/(step1-1);
                        //let nx = dx / distance;
                        //let ny = dy / distance;
                        let nx = (dx / step2)+ cx ;
                        let ny = (dy / step2)+ cy ;
                        console.log(nx)
                        
                        circle.setAttribute('cx', nx );
                        circle.setAttribute('cy', ny );

                }
                else{
                    //console.log(circle);
                    circle.setAttribute('fill', '#000000');
                }  
            })
        }
    }
}



function physicsMouseloopQuad(mousePosition,circleElements, QuadTree, svgQuadTree){
    console.log(svgQuadTree)
    if (looping && svgQuadTree ){
        if(svgQuadTree.points.length >0){
            for(let i=0; i<svgQuadTree.points.length; i++){
                let circle = svgQuadTree.points[i];
                

                let cx = circle.data.getAttribute('cx')
                let cy = circle.data.getAttribute('cy')
                let r = circle.data.getAttribute('r')
                if((mousePosition.x > (cx-r) && mousePosition.x < (cx+r))&&
                (mousePosition.y > (cy-r) && mousePosition.y < (cy+r))){
                    circle.data.setAttribute('fill', '#ff0000');
                       
                    let dx = mousePosition.x - cx;
                    let dy = mousePosition.y - cy;
                    let distanceScalar = Math.sqrt(dx * dx + dy * dy);
                    let step1 = (Math.exp(-distanceScalar));
                    let step2 = 1/(step1-1);
                    let nx = (dx / step2)+ cx ;
                    let ny = (dy / step2)+ cy ;
                    console.log(nx)
                    
                    circle.setAttribute('cx', nx );
                    circle.setAttribute('cy', ny );
                }                
                    
            }
        }
        
        else if(svgQuadTree.points.length === 0){
            const quadProperties = Object.keys(svgQuadTree);
            for(let i=0;i<quadProperties.length; i++){
                if(svgQuadTree[quadProperties[i]] instanceof QuadTree){
                    let quad = svgQuadTree[quadProperties[i]]
                    let boundary = quad.boundary;
                    console.log(quad.points.length)
                    if( mousePosition.x>boundary.x &&
                        mousePosition.x<(boundary.x+boundary.width)&&
                        mousePosition.y>boundary.y &&
                        mousePosition.y<(boundary.y+boundary.height)
                        ){
                            physicsMouseloopQuad(mousePosition,circleElements, QuadTree, quad)
                    }
                }
            }
        }

    

            /*const property=quadProperties[i]
            console.log("svgQuad;")
            console.log(svgQuadTree)
            console.log("property;")
            console.log(property)
            console.log("boundary")
            console.log(property.boundary)
            const propertyValue= svgQuadTree[property];
            
            let x = propertyValue.boundary.x;
            let y = propertyValue.boundary.y;
            let h = propertyValue.boundary.width;;
            let w = propertyValue.boundary.height;;

            */

            // if(propertyValue instanceof QuadTree &&
            //     mousePosition.x>x &&
            //     mousePosition.x<x+w&&
            //     mousePosition.y>y &&
            //     mousePosition.y<y+h
            //     ){
            //         console.log("it's a match!")
            //         //physicsMouseloopQuad(mousePosition,circleElements, QuadTree, svgQuadTree)
            // }
        //}
    }
}


function moveCircle(circleI, circleJ){

    let icr = parseFloat(circleI.getAttribute('r'));
    let r = parseFloat(circleI.getAttribute('r'));
    let icx = parseFloat(circleI.getAttribute('cx'));
    let icy = parseFloat(circleI.getAttribute('cy'));
    let jcx = parseFloat(circleJ.getAttribute('cx'));
    let jcy = parseFloat(circleJ.getAttribute('cy'));

    let dx = icx - jcx;
    let dy = icy - jcy;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 2*r) {
        let dx = icx - jcx;
        let dy = icy - jcy;

        let distanceScalar = Math.sqrt(dx * dx + dy * dy);
        if (distanceScalar === 0) distanceScalar = 0.01;
        let moveDistance = r - (distanceScalar / 2);


        let nix = icx + (dx / distanceScalar) * moveDistance;
        let niy = icy + (dy / distanceScalar) * moveDistance;
        let njx = jcx - (dx / distanceScalar) * moveDistance;
        let njy = jcy - (dy / distanceScalar) * moveDistance;

        circleI.setAttribute('cx', nix );
        circleI.setAttribute('cy', niy );
        circleJ.setAttribute('cx', njx );
        circleJ.setAttribute('cy', njy );
    }
}

function physicsCircleCollisionQuad(circleElements, QuadTree, svgQuadTree){

    
    //check point overlap top hierarchy
    if(svgQuadTree.points.length >0){
        for(let i=0; i<svgQuadTree.points.length; i++){
            for(let j=1; j<svgQuadTree.points.length; j++){

                let circleI = svgQuadTree.points[i].data;
                let circleJ = svgQuadTree.points[j].data;
                moveCircle(circleI, circleJ);
            }
        }
    }
    //if no points check for deeper nesting
    else{
        const quadProperties = Object.keys(svgQuadTree);
        for(let i=0;i<quadProperties.length; i++){
            const property=quadProperties[i]
            const propertyValue= svgQuadTree[property];
            if(propertyValue instanceof QuadTree){
                physicsCircleCollisionQuad(circleElements, QuadTree, propertyValue)
            }
        }
    }
}

function physicsCircleCollision(circleElements){
    if (looping && circleElements ){
        for(let i = 0; i<circleElements.length; i++){
            for (let j = i+1; j<circleElements.length; j++ ){

                let circleI = circleElements[i];
                let circleJ = circleElements[j];
                let r = parseFloat(circleI.getAttribute('r'));
                let icx = parseFloat(circleI.getAttribute('cx'));
                let icy = parseFloat(circleI.getAttribute('cy'));
                let jcx = parseFloat(circleJ.getAttribute('cx'));
                let jcy = parseFloat(circleJ.getAttribute('cy'));

                let dx = icx - jcx;
                let dy = icy - jcy;
                let distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < 2*r) {

                /*if((icx-r > jcx-r) && (icx+r < jcx+r) &&
                   (icy-r > jcy-r) && (icy+r < jcy+r)){*/
                    
                    //console.log("circle collision");
                    let dx = icx - jcx;
                    let dy = icy - jcy;

                    //
                    let distanceScalar = Math.sqrt(dx * dx + dy * dy);
                    //let step1 = (Math.exp(-distanceScalar));
                    if (distanceScalar === 0) distanceScalar = 0.01;
                    let moveDistance = r - (distanceScalar / 2);


                    let nix = icx + (dx / distanceScalar) * moveDistance;
                    let niy = icy + (dy / distanceScalar) * moveDistance;
                    let njx = jcx - (dx / distanceScalar) * moveDistance;
                    let njy = jcy - (dy / distanceScalar) * moveDistance;
                    /*let step2 = 1/(step1-1);
                    let nix = (dx / step2)+ icx ;
                    let niy = (dy / step2)+ icy ;
                    let njx = (dx / step2)- jcx ;
                    let njy = (dy / step2)- icy ;*/
                    circleI.setAttribute('cx', nix );
                    circleI.setAttribute('cy', niy );
                    circleJ.setAttribute('cx', njx );
                    circleJ.setAttribute('cy', njy );

                }
            }
        }
    } 
}


function physicsSwarmMove(circleElements){
    if (looping && circleElements ){
        circleElements.forEach(circle => {
            let weight = 10; //value is split over 0 so half the value
            let balance = weight/2;
            let movex = (Math.random()* weight - balance)
            let movey = (Math.random()* weight - balance)
            //console.log(movex, movey);
            let cx = parseFloat(circle.getAttribute('cx'));
            let cy = parseFloat(circle.getAttribute('cy'));
            
            circle.setAttribute('cx', cx + movex);
            circle.setAttribute('cy', cy + movey);

        });
    }
}

export{startPhysicsloop, stopPhysicsloop};



