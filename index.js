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
        console.log("stopphysics")
        stopPhysicsloop();
    }
});

//Minimize GUI docker
document.querySelector('#corner_icon').addEventListener('pointerdown', () => {
    let border = document.querySelector("ul");
    let group= document.querySelector("ul").childNodes[3].style;

    if(group.visibility == "visible"){
        group.visibility = "hidden";
        border.style.height = "50px";
    }
    else{
        group.visibility = "visible"
        border.style.height = "auto";
    } 
});


//Movable GUI
let isMovingGUI = false;

//Drag and release ul gui element to move
document.querySelector('.title_bar').addEventListener('pointerdown', () => {
    let gui = document.querySelector('#gui_floater');
    let computedstyle = (window.getComputedStyle(gui));
    let computedx = parseFloat(computedstyle.left.match(/^-?\d+(\.\d+)?/)[0]);
    let computedy = parseFloat(computedstyle.top.match(/^-?\d+(\.\d+)?/)[0]);
    let anchor_x = mousePosition.x - computedx;
    let anchor_y = mousePosition.y - computedy;
    isMovingGUI = true;
    guimove(gui.style, anchor_x, anchor_y);
    
});

document.querySelector('.title_bar').addEventListener('pointerup', () => {
    isMovingGUI = false;
});

function guimove(gui, anchor_x, anchor_y){
    let border = document.querySelector('.title_bar').getBoundingClientRect();
    //loop if pressed LMB mouse
    if(isMovingGUI){        
        //loop if mouse if above GUI, else exit
        if((mousePosition.x > border.x) 
        && (mousePosition.x < (border.width+border.x))
        &&(mousePosition.y > border.y) 
        && (mousePosition.y < (border.height+border.y))){
            gui.left = (mousePosition.x - anchor_x) + "px";
            gui.top = (mousePosition.y - anchor_y) + "px";
            window.requestAnimationFrame(()=> guimove(gui, anchor_x, anchor_y));
        }
        else{isMovingGUI=false;}
    }
    else{isMovingGUI=false;}
}