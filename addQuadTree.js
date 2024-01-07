"use strict";
import {borderQuadsplit} from './splitQuadTree.js';
//svg and quad tree are sepparated
//svg point to objects within quad-tree

//check for quad existing
//check for more than 4 elements on screen
//if yes split area into rectangle of four

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
    constructor(boundary,capacity, tag){
        this.borderQuadsplit = borderQuadsplit; //imported function
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.tag = tag;
        this.Nw = null;
        this.Ne = null;
        this.Sw = null;
        this.Se = null;
    }
    createNewQuad(quadborderbox, quadCapacity){
      this.Nw = new QuadTree(quadborderbox.nw, quadCapacity, "Nw");
      this.Ne = new QuadTree(quadborderbox.ne, quadCapacity, "Ne");
      this.Sw = new QuadTree(quadborderbox.sw, quadCapacity, "Sw");
      this.Se = new QuadTree(quadborderbox.se, quadCapacity, "Se");
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
          //console.log(`This:${this} HasQuad true, with point: \`${JSON.stringify(point)}\``)

          for(const x in this){
            //if current QuadTree element contains QuadTree climb down hierarchy
            if(this[x] instanceof QuadTree){
              //Nw (0,0), Ne(1,0), Sw(0,1), Se(1,1)
              //Nw
              if((point.x<this.boundary.width/2) && (point.y<this.boundary.height/2)){
                this.Nw.checkForQuads(point, capacity);
                return;
              }
              //Ne
              if(((point.x<this.boundary.width)) && ((point.y<this.boundary.height/2))){
                this.Ne.checkForQuads(point,capacity);
                return;
              }
              //Sw
              if((point.x<this.boundary.width/2) && (point.y<this.boundary.height)){
                this.Sw.checkForQuads(point,capacity);
                return;
              }
              //Se
              if((point.x<this.boundary.width) && (point.y<this.boundary.height)){
                this.Se.checkForQuads(point, capacity);
                return;
              }
              else{
                console.debug(`something unexpected happened`);
              }
            }
          }
          return true;
        }
        
        else if(!hasQuad){  
          //if all inner quads are null  
          //either 1 create new quads if capacity is surpassed and migrate points to new quads
          //or 2 add point to existing this quad

          //points array is full, split quad and redistribute points
          if(this.points.length>=this.capacity){
              
            //add current point to array aswell for migration
            this.points.push(point);
            console.log("creatingNewQuad");
            this.createNewQuad(this.borderQuadsplit(this.boundary, this.tag), this.capacity);
            for(let i = 0; i<this.points.length;i++){
              //Nw
              //console.log(this.points[i]);
              if(this.points[i].x<this.boundary.width/2 && this.points[i].y<this.boundary.height/2){
                this.Nw.points.push(this.points[i]);
              }
              //Ne
              else if(this.points[i].x<this.boundary.width && this.points[i].y<this.boundary.height/2){
                this.Ne.points.push(this.points[i]);
              }
              //Sw
              else if((this.points[i].x<this.boundary.width/2) && (this.points[i].y<this.boundary.height)){
                this.Sw.points.push(this.points[i]);
              }
              //Se
              else if((this.points[i].x<this.boundary.width) && (this.points[i].y<this.boundary.height)){
                this.Se.points.push(this.points[i]);
              }
              else{
                console.debug(`something unexpected happened`);
              }
            }
            //after migrating (points) array to sub quads-array clear it out
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
    //Draw quad/rectangle
}

//Create Quad
function generateQuadTree(){
    const quadborderbox = new Rectangle(0,0,visualViewport.width, visualViewport.height);
    let quadCapacity = 4;
    const svgQuadTree = new QuadTree(quadborderbox, quadCapacity, "root");
    
    //testing
    window.svgQuadTree = svgQuadTree;
    //svgQuadTree.createNewQuad(svgQuadTree.capacity);
    //svgQuadTree.Nw.createNewQuad(svgQuadTree.capacity);
    //add circles point / create new Quad 
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
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

    //console.log(svgQuadTree);
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