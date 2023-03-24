"use strict";
import { AddSVGCircle} from './addCircle.js';

//Click to add circles
const screenClick = document.querySelector('#content_svg');
screenClick.addEventListener('pointerdown', (event) => {
    console.log("test");
    AddSVGCircle(event);
});

//Update UI slider number
const svgSize = document.querySelector('#svgprop_size');
const svgAmount = document.querySelector('#svgprop_amount');
const svgSpread = document.querySelector('#svgprop_spread');
const displaySvgsize = document.querySelector('#display_svgsize');
const displayAmount = document.querySelector('#display_amount'); // ammount created
const displaySpread = document.querySelector('#display_spread'); 
displaySvgsize.textContent = svgSize.value;
displayAmount.textContent = svgAmount.value;
displaySpread.textContent = svgSpread.value;
svgSize.addEventListener(`input`, ()=>{displaySvgsize.textContent = svgSize.value;})
svgAmount.addEventListener(`input`, ()=>{displayAmount.textContent = svgAmount.value;})
svgSpread.addEventListener(`input`, ()=>{displaySpread.textContent = svgSpread.value;})


//draw circle
//generate quads