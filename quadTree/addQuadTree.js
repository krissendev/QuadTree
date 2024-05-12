"use strict";
import{Rectangle} from './Rectangle.js'
import{Point} from './Point.js'
import { QuadTree } from './QuadTree.js';

let generationInterval;
let looping = false;

let pointCounter = 0;

//Create Quad
function generateQuadTree(){
    const quadborderbox = new Rectangle(0,0,visualViewport.width, visualViewport.height);
    let quadCapacity = 4;
    const svgQuadTree = new QuadTree(quadborderbox, quadCapacity);
    const svgContainer = document.querySelector('#quadtree-circles');
    const circleElements = svgContainer.querySelectorAll('circle');
    
    window.QuadTree = QuadTree;
    window.svgQuadTree = svgQuadTree;
    window.circleElements = circleElements;
    //for printing circle coordinates
    /*
    window.circleElements.forEach(circle => {
    const x = circle.getAttribute('cx');
    const y = circle.getAttribute('cy');
    console.log(`Circle at (x: ${x}, y: ${y})`);
    });
    */
    circleElements.forEach(circle => {
        pointCounter++;
        // console.log(pointCounter)

        const x = parseFloat(circle.getAttribute('cx'));
        const y = parseFloat(circle.getAttribute('cy'));
        const point = new Point(x, y, circle);
        svgQuadTree.checkForQuads(point, svgQuadTree.capacity, svgQuadTree);
      });
      return svgQuadTree;
}

function startQuadGenerationLoop(){
  if (!looping){
    looping = true;
    generationInterval = setInterval(() => {
      generateQuadTree();
          }, 20);
  }
}
function stopQuadGenerationLoop(){
  if(looping){
    clearInterval(generationInterval)
    looping = false;
  }
}

export{generateQuadTree, startQuadGenerationLoop, stopQuadGenerationLoop}