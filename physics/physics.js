"use strict";
//import {decimalFixing} from '../util/decimalFixing.js'
import {physicsMouseloopQuad} from './mousePhysics.js'
import{physicsCircleCollisionQuad} from './pointCheckQuad.js'
import {physicsSwarmMove} from './pointWander.js'

let physicsIntervalSwarm;
let physicsIntervalCursor;
let physicsIntervalSwarmCollision;
let looping = false;

function startPhysicsloop(mousePosition, QuadTree, svgQuadTree){

    let currentQuad = window.svgQuadTree;
    let head = [];

    //console.log("startphysics");
    const svgContainer = document.querySelector('#quadtree-circles');
    const circleElements = svgContainer.querySelectorAll('circle');
    if(!looping){
        looping = true;
        physicsIntervalCursor = setInterval(() => {
            let svgQuadTree = window.svgQuadTree;
            physicsMouseloopQuad(mousePosition, circleElements, QuadTree, svgQuadTree)
        }, 50);

        physicsIntervalSwarm = setInterval(() => {
            physicsSwarmMove(circleElements)
        }, 100); 
        physicsIntervalSwarmCollision = setInterval(() => {
            //QuadTree is class for typechecking quads
            //currentQuad = used for recursing down the three like a tail 
            //quadTree = the whole three
            //head array of path 
            //console.log("Set Interval...")
            physicsCircleCollisionQuad(QuadTree, head)
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


export{startPhysicsloop, stopPhysicsloop};