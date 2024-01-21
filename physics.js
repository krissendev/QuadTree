"use strict";



let looping = false;
function startPhysicsloop(mousePosition){
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    if(!looping){
        looping = true;
        physicsloop(mousePosition, circleElements);
    }
}
function stopPhysicsloop(){
    if(looping){
        looping = false;
    }
}

function physicsloop(mousePosition,circleElements){
    //console.log("loop");
    if (looping && circleElements ){
        //console.log(circleElements.length)
        circleElements.forEach(circle => {
            let cx = circle.getAttribute('cx');
            let cy = circle.getAttribute('cy');
            let r = circle.getAttribute('r')
            
            
            if((mousePosition.x > (cx-r) && mousePosition.x < (cx+r))&&
               (mousePosition.y > (cy-r) && mousePosition.y < (cy+r))){
                    //console.log(`mp:${mousePosition.x} ${mousePosition.y}, circle: ${cx} ${cy} ${r}`);
                    circle.setAttribute('fill', '#ff0000');

            }
            else{
                //console.log(circle);
                circle.setAttribute('fill', '#000000');
            }
            
        })

        
        //console.log(`Mouse: ${mousePosition.x}, ${mousePosition.y}`);
        window.requestAnimationFrame(() => physicsloop(mousePosition, circleElements));    
    }
}



export{startPhysicsloop, stopPhysicsloop};



