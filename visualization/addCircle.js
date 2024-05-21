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

const svgContainter = document.querySelector('#quadtree-circles');
const svgColor = document.querySelector('#svgprop_color');
const svgSize = document.querySelector('#svgprop_size');
const svgAmount = document.querySelector('#svgprop_amount');
const svgSpread = document.querySelector('#svgprop_spread');
const displaySvgsize = document.querySelector('#display_svgsize');
const displayAmount = document.querySelector('#display_amount'); // ammount created
const displaySpread = document.querySelector('#display_spread'); 
const displayCount = document.querySelector('#display_svgNumber'); // ammount existing
let circleCount = 0;

//Draw circles
function addSVGCircle(circleCount){
    for(let i=0; i< svgAmount.valueAsNumber; i++){
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        //randomizing the spread and axis (+/-) of each click
        const binaryX = Math.round(Math.random());
        const binaryY = Math.round(Math.random());
        const operatorX = binaryX ? '+' : '-';
        const operatorY = binaryY ? '+' : '-';
        circle.setAttribute("cx" , eval(`event.clientX ${operatorX} Math.random() * svgSpread.valueAsNumber`));
        circle.setAttribute("cy" , eval(`event.clientY ${operatorY} Math.random() * svgSpread.valueAsNumber`));
        circle.setAttribute("r" , svgSize.valueAsNumber);
        circle.setAttribute("fill",svgColor.value);
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
    svgSize.addEventListener(`input`, ()=>{displaySvgsize.textContent = svgSize.value;})
    svgAmount.addEventListener(`input`, ()=>{displayAmount.textContent = svgAmount.value;})
    svgSpread.addEventListener(`input`, ()=>{displaySpread.textContent = svgSpread.value;})

}

export{addSVGCircle, buttonListeners};
