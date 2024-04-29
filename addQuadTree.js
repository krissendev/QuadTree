"use strict";
import {borderQuadsplit} from './splitQuadTree.js';
import {checkBoundary} from './checkpointQuadTree.js';

let generationInterval;
let looping = false;
class Point{
    constructor(x,y,data){
        this.x = x;
        this.y = y;
        this.data = data;
    }
}
class Rectangle{
    constructor(x,y,width,height){
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height; 
    }
}
export class QuadTree{
    constructor(boundary,capacity){
        this.borderQuadsplit = borderQuadsplit; //imported function
        this.checkBoundary = checkBoundary;     //imported function
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.NW = null;
        this.NE = null;
        this.SW = null;
        this.SE = null;
    }
    createNewQuad(quadborderbox, quadCapacity){
      this.NW = new QuadTree(quadborderbox.NW, quadCapacity);
      this.NE = new QuadTree(quadborderbox.NE, quadCapacity);
      this.SW = new QuadTree(quadborderbox.SW, quadCapacity);
      this.SE = new QuadTree(quadborderbox.SE, quadCapacity);
    }

    //Recursive counting number of "boundary" in Quad
    checkForQuads(point, capacity, quad){
      const quadTree = quad;
      let hasQuad = false;
      const quadProperties = Object.keys(quadTree);
      const numbersofQuadProperties = quadProperties.length;
      if (quadTree.checkpointOutsideScope(point, quadTree)){return;}
      
      try{
        //Check if this QuadTree hasQuad (Contains instance of Quadtree)
        for(let propertyIndex =0; propertyIndex< numbersofQuadProperties; propertyIndex++){
          const property=quadProperties[propertyIndex]
          const propertyValue= quadTree[property];
          if(propertyValue instanceof QuadTree){
            hasQuad = true;
            break;
          }
        }
        if (quadTree.points.includes(point)) {return}
        if(hasQuad){
          for(const quadProperty in quadTree){
            //If current QuadTree element contains QuadTree climb down hierarchy recursivly, ie Nw,Ne,Sw,Se
            if(quadTree[quadProperty] instanceof QuadTree){
              const withinboundary = checkBoundary(point, quadTree);
              if(withinboundary !== null){
                withinboundary.checkForQuads(point, capacity, withinboundary)
                break;
              }
            }
          }
          return true;
        }
        
        //Current QuadTree in recursion is empty
        else if(!hasQuad){      
          if(quadTree.points.length>=quadTree.capacity){
            quadTree.points.push(point);
            //add current point to array aswell for migration
            //this.points.push(point);
            quadTree.createNewQuad(quadTree.borderQuadsplit(quadTree.boundary), quadTree.capacity);
            hasQuad = true;

            for(let i = 0; i<quadTree.points.length;i++){
              if(quadTree.points[i] !== null && quadTree.points[i] !== undefined) {
                // const withinboundary = checkBoundary(quadTree.points[i], quadTree.boundary, quadTree);
                const withinboundary = checkBoundary(quadTree.points[i], quadTree);
                if(withinboundary !== null){
                  withinboundary.points.push(quadTree.points[i]);
                }
              }
            }
            quadTree.points = [];
            return;
          }
          //points array is not yet filled
          else if(quadTree.points.length<this.capacity && 
                  !quadTree.points.includes(point)){
            //if points array is full
            quadTree.points.push(point);
            return;
          }
          else{
            console.debug(`something unexpected happened`);
            return;
          }
        }

      }
      catch{
        console.error(`error in checkForQuads`)
        console.error(`
        this: \`${JSON.stringify(quadTree)}\`,
        point: \`${JSON.stringify(point)}\`,
        hasQuad: ${hasQuad},
        Object-keys: ${quadProperties},
        Object-keylength: ${numbersofQuadProperties}
        `)
      }
    }

    checkpointOutsideScope(point, quadTree){
      if (point.x >quadTree.width || point.x < 0){
        // console.debug(`point.x ${point} out of bounds`)
        return true //I want this to exit out from checkForQuads
      }
      else if(point.y > quadTree.height || point.y<0){
        // console.debug(`point.y ${point} out of bounds`)
        return true //I want this to exit out from checkForQuads
      }
      return false //I want this to continue in checkForQuads
    }
}

let pointCounter = 0;

//Create Quad
function generateQuadTree(){
    // console.log("generateQuadTree")
    const quadborderbox = new Rectangle(0,0,visualViewport.width, visualViewport.height);
    let quadCapacity = 4;
    const svgQuadTree = new QuadTree(quadborderbox, quadCapacity);
    const svgContainer = document.querySelector('#content_svg');
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

function debugObject(line){
  let debugObj = `On line:${line}. \n`
  for (let i = 1; i < arguments.length; i++) {
    try{
      //build string
      if(typeof arguments[i]=== `object`&& arguments[i] !== null){
        //let name = Object.keys(arguments[i]);
        let type = typeof arguments[i];
        debugObj = debugObj.concat(`Type: ${type} - \`${JSON.stringify(arguments[i])}\`.\n`);
      }else{
        debugObj = debugObj.concat(arguments[i]);
      }
    }
    catch(error){
      console.debug(error);
    }
  }
  //write string of objects
  // console.log(debugObj);
}


export{generateQuadTree, startQuadGenerationLoop, stopQuadGenerationLoop}