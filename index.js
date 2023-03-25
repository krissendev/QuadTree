"use strict";
import { AddSVGCircle, ButtonListeners} from './addCircle.js';

//Click to add circles
const screenClick = document.querySelector('#content_svg');
screenClick.addEventListener('pointerdown', (event) => {
    console.log("test");
    AddSVGCircle(event);
});

//Update UI slider number
document.addEventListener('DOMContentLoaded', function () {
    ButtonListeners();
});


//clear canvas
document.querySelector('#clear_svg').addEventListener('pointerdown', () => {
    for(let i = screenClick.childElementCount - 1; i>=0; i--){
        console.log(screenClick.childNodes[i]);
        screenClick.removeChild(screenClick.childNodes[i]);
    }
});

//generate quads