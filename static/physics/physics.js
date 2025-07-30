"use strict";
//import {decimalFixing} from '../util/decimalFixing.js'
import {physicsMouseloopQuad} from './mousePhysics.js'
import{physicsCircleCollisionQuad} from './pointCheckQuad.js'
import {physicsSwarmMove} from './pointWander.js'

let physicsIntervalSwarm;
let physicsIntervalSwarmCollision;

//raf = RequestAnimationFrame
//NOTE Regarding RequestAnimationFrame(somefunc), the variable of said function is by deafult the timestamp of the frame
let raf_swarm;
let raf_cursor;
let raf_swarmcollision;
let looping = false;

function loopCursor(circleElements){    
    physicsMouseloopQuad(window.mousePosition, circleElements, window.QuadTree, window.svgQuadTree)
    raf_cursor = requestAnimationFrame(()=>{loopCursor(circleElements)});
}
function loopSwarmMove(circleElements){
    physicsSwarmMove(circleElements);    
    raf_swarm = setTimeout(() => requestAnimationFrame(()=>{(loopSwarmMove(circleElements))}), 50);
}
function loopSwarmCollide(QuadTree, head){
    physicsCircleCollisionQuad(QuadTree, head)
    raf_swarmcollision = requestAnimationFrame(()=>{loopSwarmCollide(QuadTree, head)});
}
function startPhysicsloop(mousePosition){

    let currentQuad = window.svgQuadTree;
    let head = [];

    if(!looping){
        looping = true;
        const svgContainer = document.querySelector('#quadtree-circles');
        const circleElements = svgContainer.querySelectorAll('circle');
        loopCursor(circleElements);
        loopSwarmMove(circleElements);
        loopSwarmCollide(QuadTree, head)
    }
}
function stopPhysicsloop(){
    console.log("stopping physics loop, looping:", looping)
    if(looping){
        cancelAnimationFrame(raf_cursor);
        clearInterval(raf_swarm);
        cancelAnimationFrame(raf_swarmcollision)
        // clearInterval(physicsIntervalSwarm);
        // clearInterval(physicsIntervalSwarmCollision);
        looping = false;
    }
}


export{startPhysicsloop, stopPhysicsloop};