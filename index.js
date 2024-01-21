"use strict";
import {addSVGCircle, buttonListeners} from './addCircle.js';
import {generateQuadTree} from './addQuadTree.js';
import {createRects} from './addRect.js';
import {startPhysicsloop, stopPhysicsloop} from './physics.js';


//Click to add circles
const screenClick = document.querySelector('#content_svg');
screenClick.addEventListener('pointerdown', (event) => {
    addSVGCircle(event);
});

//Update UI slider number
document.addEventListener('DOMContentLoaded', function () {
    buttonListeners();
});


//clear canvas
document.querySelector('#clear_svg').addEventListener('pointerdown', () => {
    for(let i = screenClick.childElementCount - 1; i>=0; i--){
        console.log(screenClick.childNodes[i]);
        screenClick.removeChild(screenClick.childNodes[i]);
    }
});

//generate quads
document.querySelector('#generate_quadtree').addEventListener('pointerdown', () => {
    generateQuadTree();
});

//generate rect
document.querySelector('#generate_rect').addEventListener('pointerdown', () => {
    console.log("click");
    createRects();
});

//store mouse position
let mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (event)=>{
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});

//turn on physics
document.querySelector('#toggle_mousePhysics').addEventListener('change', (event) => {
    let checkbox = event.target;
    if(checkbox.checked){
        console.log("startphysics")
        startPhysicsloop(mousePosition);
    }
    else{
        stopPhysicsloop();
    }
});


