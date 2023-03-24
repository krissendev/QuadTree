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


//generate quads