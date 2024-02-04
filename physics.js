"use strict";

let physicsIntervalSwarm;
let physicsIntervalCursor;
let physicsIntervalSwarnCollision;
let looping = false;
function startPhysicsloop(mousePosition){
    console.log("startphysics");
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    if(!looping){
        looping = true;
        physicsMouseloop(mousePosition, circleElements);
        physicsIntervalCursor = setInterval(() => {
            physicsMouseloop(mousePosition, circleElements)
        }, 100);
        physicsIntervalSwarm = setInterval(() => {
            physicsSwarmMove(circleElements)
        }, 100); 
        physicsIntervalSwarnCollision = setInterval(() => {
            physicsCircleCollision(circleElements)
        }, 10);
    }
}
function stopPhysicsloop(){
    if(looping){
        clearInterval(physicsIntervalSwarm);
        clearInterval(physicsIntervalCursor);
        clearInterval(physicsIntervalSwarnCollision);
        
        looping = false;
    }
}

function physicsMouseloop(mousePosition,circleElements){
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
                    
                    console.log("circle collision");
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
            console.log(movex, movey);
            let cx = parseFloat(circle.getAttribute('cx'));
            let cy = parseFloat(circle.getAttribute('cy'));
            
            circle.setAttribute('cx', cx + movex);
            circle.setAttribute('cy', cy + movey);

        });
    }
}

export{startPhysicsloop, stopPhysicsloop};



