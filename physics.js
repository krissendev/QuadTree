"use strict";
let looping = false;
function startPhysicsloop(){
    if(!looping){
        looping = true;
        physicsloop();
    }
}
function stopPhysicsloop(){
    if(looping){
        looping = false;
    }
}

function physicsloop(){
    if (looping){
        console.log("currently looping");
        window.requestAnimationFrame(physicsloop);    
    }
}



export{startPhysicsloop, stopPhysicsloop};



