"use strict";
import {addSVGCircle, buttonListeners} from './visualization/addCircle.js';
import {startReactCreate, stopReactCreate} from './visualization/addRect.js';
import {generateQuadTree, startQuadGenerationLoop, stopQuadGenerationLoop} from './quadTree/addQuadTree.js';
import {startPhysicsloop, stopPhysicsloop} from './physics/physics.js';
import {toggleMenu, resetNav, debounce, initWindowSize} from './util/responsiveMenu.js'

let circleCount=0;

//store mouse position
let mousePosition = { x: 0, y: 0 };
document.addEventListener("mousemove", (event)=>{
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});

window.mousePosition = mousePosition;

//RadioToggle-Generate/Physics
document.querySelectorAll('input[name="toggleCursorMode"]').forEach(item => {
    item.addEventListener("change",inputChangeHandler, false);
})    
//Init RadioToggle-Generate/Physics State
let toggleCursorModeInit =document.querySelectorAll('input[name="toggleCursorMode"]:checked');
inputChangeHandler({ target: toggleCursorModeInit[0] });

function inputChangeHandler(e){
    //Click to be in physics state
    if(e.target.id==="mousePhysics"){
        document.addEventListener("mousemove",  onMouseMove, { passive: false })
        document.removeEventListener("pointerdown", onInputDown, { passive: false });
        
        //guarantees QuadTree exists before setInterval occurs
        generateQuadTree(); 

        startQuadGenerationLoop();
        startReactCreate();
        startPhysicsloop(mousePosition, QuadTree, svgQuadTree);
    }
    //Click to add circles
    else if(e.target.id==="mouseGenerate"){
        document.removeEventListener("mousemove",  onMouseMove, { passive: false });
        document.addEventListener("pointerdown", onInputDown, { passive: false });
        stopPhysicsloop();
        stopQuadGenerationLoop();
        stopReactCreate();
    }
}

function onMouseMove(){
    console.log("mouse moving...")
}
function onInputDown(event){
    //Check if cursor is within the floater-box(desktop) or burger-button(mobile)
    let guiFloaterBox = document.querySelector('#gui_floater');
    let guiIsVisible = document.querySelector('.listElement');
    let computedstyleBox = (window.getComputedStyle(guiFloaterBox));

    const mobileWrap = document.querySelector('#mobileWrap')
    let mobileMenuHidden = mobileWrap.classList.contains('active');
    console.log("mobileMenuHidden:",mobileMenuHidden)
    //let mobileMenuUp = computedstyleVisible.display === "flex";

    let dockerLeft = parseFloat(computedstyleBox.left.match(/^-?\d+(\.\d+)?/)[0]);
    let dockerWidth = parseFloat(computedstyleBox.width.match(/^-?\d+(\.\d+)?/)[0]);
    let dockerTop = parseFloat(computedstyleBox.top.match(/^-?\d+(\.\d+)?/)[0]);
    let dockerHeight = parseFloat(computedstyleBox.height.match(/^-?\d+(\.\d+)?/)[0]);

    let mx=event.clientX;
    let my=event.clientY;
    //Mobile
    let burger = document.querySelector('#mainMenu');
    let isMobile = (window.getComputedStyle(burger)).display === "block";

    //generate
    console.log("click generate. isMobile:",isMobile," mobileMenuHidden:",mobileMenuHidden)
    console.log("outside mobile topbar ?", " dockerWidth:", dockerWidth, " dockerHeight:", dockerHeight," isMobile:",isMobile, " mx:", mx, " my:", my)  
    if(isMobile &&
      (mx<=dockerWidth+dockerLeft && 
      mx>= dockerLeft)&&
      (my<=dockerHeight+dockerTop && 
      my>= dockerTop)
    ){
      console.log("inside mobile topbar ?", " dockerWidth:", dockerWidth, " dockerHeight:", dockerHeight," isMobile:",isMobile, " mx:", mx, " my:", my)  
    }
    else if(isMobile && mobileMenuHidden){
        console.log("inside mobile burger")
    }
    //Desktop
    else if(!isMobile && 
        (mx<=dockerWidth+dockerLeft && 
       mx>= dockerLeft)&&
       (my<=dockerHeight+dockerTop && 
       my>= dockerTop)){
        return;
    }
    // dockerHidden
    else{
        console.log("generate circle")
        circleCount = addSVGCircle(event, circleCount);
    }
    //console.log("mouse down...", event, window.mousePosition)
    
}


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

//Aria - keyboard button activation

function togglePhysics(event){
    console.log("toggled check")
    let checkbox = event.target;
    if(checkbox.checked){
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