"use strict";
import {borderQuadsplit} from './splitQuadTree.js';
import {checkBoundary} from './checkpointQuadTree.js';

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
class QuadTree{
    constructor(boundary,capacity){
        this.borderQuadsplit = borderQuadsplit; //imported function
        this.checkBoundary = checkBoundary;     //imported function
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.Nw = null;
        this.Ne = null;
        this.Sw = null;
        this.Se = null;
    }
    createNewQuad(quadborderbox, quadCapacity){
      this.Nw = new QuadTree(quadborderbox.nw, quadCapacity);
      this.Ne = new QuadTree(quadborderbox.ne, quadCapacity);
      this.Sw = new QuadTree(quadborderbox.sw, quadCapacity);
      this.Se = new QuadTree(quadborderbox.se, quadCapacity);
    }

    //recursive counting number of "boundary" in Quad
    checkForQuads(point, capacity){
      //If x or y of point is outside DOM canvas skip point
      if (this.checkpointOutsideScope(point)){return;}
      //debugObject("67", this, point)

      //check if (this) QuadTree contains instanceof Quadtree
      let hasQuad = false;
      const keys = Object.keys(this);
      const length = keys.length;
      try{
        for(let i =0; i< length; i++){
          const key=keys[i]
          const value= this[key];
          if(value instanceof QuadTree){
            hasQuad = true;
            break;
          }
        }
        if(hasQuad){
          for(const x in this){
            //if current QuadTree element contains QuadTree climb down hierarchy
            if(this[x] instanceof QuadTree){
              const withinboundary = checkBoundary(point, this[x]);
              if(withinboundary !== null){
                withinboundary.checkForQuads(point, capacity)
              }
            }
          }
          return true;
        }
        
        else if(!hasQuad){  
          if(this.points.length>=this.capacity){
              
            //add current point to array aswell for migration
            this.points.push(point);
            this.createNewQuad(this.borderQuadsplit(this.boundary), this.capacity);
            for(let i = 0; i<this.points.length;i++){
              const withinboundary = checkBoundary(this.points[i].x, this.boundary);
              if(withinboundary !== null){
                withinboundary.points.push(this.points[i]);
              }
            }
            this.points = [];
            return;
          }
          //points array is not yet filled
          else if(this.points.length<this.capacity){
            //if points array is full
            this.points.push(point);
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
        this: \`${JSON.stringify(this)}\`,
        point: \`${JSON.stringify(point)}\`,
        hasQuad: ${hasQuad},
        Object-keys: ${keys},
        Object-keylength: ${length}
        `)
      }
    }

    checkpointOutsideScope(point){
      if (point.x >this.width || point.x < 0){
        debug.log(`point.x ${point} out of bounds`)
        return true //I want this to exit out from checkForQuads
      }
      else if(point.y > this.height || point.y<0){
        debug.log(`point.y ${point} out of bounds`)
        return true //I want this to exit out from checkForQuads
      }
      return false //I want this to continue in checkForQuads
    }
}

//Create Quad
function generateQuadTree(){
    const quadborderbox = new Rectangle(0,0,visualViewport.width, visualViewport.height);
    let quadCapacity = 4;
    const svgQuadTree = new QuadTree(quadborderbox, quadCapacity, "root");
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    
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
        const x = parseFloat(circle.getAttribute('cx'));
        const y = parseFloat(circle.getAttribute('cy'));
        const point = new Point(x, y, circle);
        svgQuadTree.checkForQuads(point, svgQuadTree.capacity);
      });
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
  console.log(debugObj);
}

export{generateQuadTree}