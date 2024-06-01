"use strict";
import {addSVGCircle, buttonListeners} from './visualization/addCircle.js';
import {startReactCreate, stopReactCreate} from './visualization/addRect.js';
import {generateQuadTree, startQuadGenerationLoop, stopQuadGenerationLoop} from './quadTree/addQuadTree.js';
import {startPhysicsloop, stopPhysicsloop} from './physics/physics.js';
import {toggleMenu, resetNav, debounce, initWindowSize} from './util/responsiveMenu.js'

let circleCount=0;



//Click to add circles
const screenClick = document.querySelector('#content_svg');
screenClick.addEventListener('pointerdown', (event) => {
    circleCount = addSVGCircle(event, circleCount);
});

//Update UI slider number
document.addEventListener('DOMContentLoaded', function () {
    buttonListeners();

    //Responsive design (mobile) inline style based window width
    initWindowSize();
});


//clear canvas
const clearBtn = document.querySelector('#clear_svg');
clearBtn.addEventListener('pointerdown', () => {
    clearCanvas();
});
//Aria - keyboard button activation
clearBtn.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){clearCanvas();}
});
function clearCanvas (){
    const circles = document.querySelector('#quadtree-circles');
    const rects = document.querySelector('#quadtree-rects');
    const displayCount = document.querySelector('#display_svgNumber');
    circles.innerHTML = '';
    rects.innerHTML = '';
    circleCount=0;
    displayCount.innerHTML = circleCount;
}




//store mouse position
let mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (event)=>{
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});



//generate quads & turn on physics
const physicsCheckbox = document.querySelector('#toggle_mousePhysics');
physicsCheckbox.addEventListener('change', togglePhysics);


physicsCheckbox.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        physicsCheckbox.checked = !physicsCheckbox.checked;
        togglePhysics(event);
    }
});
//Aria - keyboard button activation
function togglePhysics(event){
    console.log("toggled check")
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
}

//Minimize GUI docker
let cornerIcon = document.querySelector('#corner_icon_inside');
const cornerBtn = document.querySelector('#corner_icon');
cornerBtn.addEventListener('pointerdown', () => {
    togglingBtn();
});
//Aria - keyboard button activation
cornerBtn.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){togglingBtn();}
});
function togglingBtn(){
    let border = document.querySelector("ul");
    let group= document.querySelector(".guiLists").style;
    if(group.visibility == "visible"){
        group.visibility = "hidden";
        border.style.height = "50px";
        cornerIcon.style.height = "10px";
        cornerBtn.setAttribute("aria-pressed", "false");
    }
    else{
        group.visibility = "visible"
        border.style.height = "auto";
        cornerIcon.style.height = "0px";
        cornerBtn.setAttribute("aria-pressed", "true");
    } 
}


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
window.addEventListener('resize', debounce(resetNav, 10));
//window.addEventListener('resize', resetNav);