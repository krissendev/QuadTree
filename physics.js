"use strict";

let physicsInterval;
let looping = false;
function startPhysicsloop(mousePosition){
    console.log("startphysics");
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    if(!looping){
        looping = true;
        physicsloop(mousePosition, circleElements);
        physicsInterval = setInterval(() => {
            physicsloop(mousePosition, circleElements)
        }, 100); 
    }
}
function stopPhysicsloop(){
    if(looping){
        clearInterval(physicsInterval);
        looping = false;
    }
}

function physicsloop(mousePosition,circleElements){
    console.log("looping");
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


export{startPhysicsloop, stopPhysicsloop};



