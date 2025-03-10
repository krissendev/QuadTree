"use strict";
/*
id
#VALUE: HTML            JS
svgprop_color       :   svgColor
svgrop_size         :   svgSize
svgprop_amount      :   svgAmount
svgprop_spread      :   svgSpread

#DISPLAY: HTML          JS
display_svgsize     :   displaySvgsize
display_amount      :   displayAmount
display_spread      :   displaySpread
display_svgNumber   :   displayCount
*/
import {decimalFixing} from '../util/decimalFixing.js'

const svgContainter = document.querySelector('#quadtree-circles');
const svgColor = document.querySelector('#svgprop_color');
const svgSize = document.querySelector('#svgprop_size');
const svgAmount = document.querySelector('#svgprop_amount');
const svgSpread = document.querySelector('#svgprop_spread');
const displaySvgsize = document.querySelector('#display_svgsize');
const displayAmount = document.querySelector('#display_amount'); // ammount created
const displaySpread = document.querySelector('#display_spread'); 
const displayCount = document.querySelector('#display_svgNumber'); // ammount existing
const displayColorCode = document.querySelector('#display_color');
let circleCount = 0;

//Draw circles
function addSVGCircle(event, circleCount){
    for(let i=0; i< svgAmount.valueAsNumber; i++){
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        //randomizing the spread and axis (+/-) of each click
        const binaryX = Math.round(Math.random());
        const binaryY = Math.round(Math.random());

        const id = `circle-${circleCount}`;

        const r1= decimalFixing(Math.random());
        const r2= decimalFixing(Math.random());
        const cx = decimalFixing(operatorSwitch(binaryX, event.clientX, r1, svgSpread.valueAsNumber))

        const cy = decimalFixing(operatorSwitch(binaryY, event.clientY, r2, svgSpread.valueAsNumber))
        
        circle.setAttribute("id" , id);
        circle.setAttribute("cx" , cx);
        circle.setAttribute("cy" , cy);
        circle.setAttribute("r" , svgSize.valueAsNumber);
        circle.setAttribute("fill",svgColor.value);
        circle.setAttribute("role","img");
        circle.setAttribute("aria-label",`Id: ${id}, X:${cx}, Y:${cy}`);
        svgContainter.appendChild(circle);
        circleCount++;
        displayCount.innerHTML = circleCount;
    }
    console.log(circleCount)
    return circleCount;
}

//Update UI slider number
function buttonListeners(){
    displaySvgsize.textContent = svgSize.value;
    displayAmount.textContent = svgAmount.value;
    displaySpread.textContent = svgSpread.value;
    displayColorCode.textContent = svgColor.value;
    displayCount.textContent = "0";
    

    svgSize.addEventListener(`input`, ()=>{
        console.log("input")    
        displaySvgsize.textContent = svgSize.value;}
    )
    svgAmount.addEventListener(`input`, ()=>{displayAmount.textContent = svgAmount.value;})
    svgSpread.addEventListener(`input`, ()=>{displaySpread.textContent = svgSpread.value;})
    svgColor.addEventListener('input', ()=>{displayColorCode.textContent = svgColor.value;})

}

//+/- cursor, random, spread
function operatorSwitch(operator, cursor, random, spread) {
    let adjustment = 3;
    return operator ? cursor + (adjustment * random * spread): cursor -(adjustment * random * spread);
}


export{addSVGCircle, buttonListeners};
