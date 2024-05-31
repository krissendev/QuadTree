"use strict";
import {addSVGCircle, buttonListeners} from './visualization/addCircle.js';
import {startReactCreate, stopReactCreate} from './visualization/addRect.js';
import {generateQuadTree, startQuadGenerationLoop, stopQuadGenerationLoop} from './quadTree/addQuadTree.js';
import {startPhysicsloop, stopPhysicsloop} from './physics/physics.js';
import {toggleMenu, resetNav} from './util/responsiveMenu.js'

let circleCount=0;



//Click to add circles
const screenClick = document.querySelector('#content_svg');
screenClick.addEventListener('pointerdown', (event) => {
    console.log(circleCount)
    circleCount = addSVGCircle(circleCount);
    console.log(circleCount)
});

//Update UI slider number
document.addEventListener('DOMContentLoaded', function () {
    buttonListeners();
});


//clear canvas
document.querySelector('#clear_svg').addEventListener('pointerdown', () => {
    const circles = document.querySelector('#quadtree-circles');
    const rects = document.querySelector('#quadtree-rects');
    const displayCount = document.querySelector('#display_svgNumber');
    circles.innerHTML = '';
    rects.innerHTML = '';
    circleCount=0;
    displayCount.innerHTML = circleCount;
});


//store mouse position
let mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (event)=>{
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});



//generate quads & turn on physics
document.querySelector('#toggle_mousePhysics').addEventListener('change', (event) => {
    let checkbox = event.target;
    if(checkbox.checked){
        generateQuadTree();
        startPhysicsloop(mousePosition, QuadTree, svgQuadTree);
        startQuadGenerationLoop();
        startReactCreate();
    }
    else{
        //console.log("stopphysics")
        stopPhysicsloop();
        stopQuadGenerationLoop();
        stopReactCreate();
    }
});

//Minimize GUI docker
let cornerIcon = document.querySelector('#corner_icon_inside');
document.querySelector('#corner_icon').addEventListener('pointerdown', () => {
    let border = document.querySelector("ul");
    let group= document.querySelector(".guiLinks").style;

    if(group.visibility == "visible"){
        group.visibility = "hidden";
        border.style.height = "50px";
        cornerIcon.style.height = "6px";
    }
    else{
        group.visibility = "visible"
        border.style.height = "auto";
        cornerIcon.style.height = "0px";
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
        gui.left = (mousePosition.x - anchor_x) + "px";
        gui.top = (mousePosition.y - anchor_y) + "px";
        window.requestAnimationFrame(()=> guimove(gui, anchor_x, anchor_y));
    }
    else{isMovingGUI=false;}
}

//Responsive design (mobile) Burger Main menu
document.querySelector('#mainMenu').addEventListener("pointerdown", toggleMenu);
window.addEventListener('resize', resetNav);