"use strict";
import {addSVGCircle, buttonListeners} from './addCircle.js';
import {generateQuadTree} from './addQuadTree.js';
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
        screenClick.removeChild(screenClick.childNodes[i]);
    }
});

//generate quads
document.querySelector('#generate_quadtree').addEventListener('pointerdown', () => {
    generateQuadTree();
});
