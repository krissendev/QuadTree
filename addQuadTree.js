"use strict";
//svg and quad tree are sepparated
//svg point to objects within quad-tree

//check for quad existing
//check for more than 4 elements on screen
//if yes split area into rectangle of four
//

// NW   |   NE
// SW   |   SE  

/*
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

class QuadTree {
  constructor(boundary, capacity) {

  }
  subdivide() {
    NWNESWSE
  }
}

*/
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
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
        this.Nw = null;
        this.Ne = null;
        this.Sw = null;
        this.Se = null;
    }
    createNewQuad(quadCapacity){
      const testRect = new Rectangle(0,0,visualViewport.width/2, visualViewport.height/2);
      this.Nw = new QuadTree(testRect, quadCapacity);
      this.Ne = new QuadTree(testRect, quadCapacity);
      this.Sw = new QuadTree(testRect, quadCapacity);
      this.Se = new QuadTree(testRect, quadCapacity);
    }

    //recursive counting number of "boundary" in Quad
    checkForQuads(){
      for(const x in this){
        if(this[x] instanceof QuadTree && (this.Nw||this.Ne||this.Sw||this.Se)){
          return true;
        }
      }
      return false;
    }

    insertPoint(point, capacity){
      this.createNewQuad(capacity);
      
      console.log(this.checkForQuads());
      //check for existing quads
      if(this.checkForQuads()){}

        //if yes check if point coolerates with any of them
      //if not check capacity
        //capacity exceeding divide quads then add point

        //capacity ok add point


      //this.createNewQuad(capacity);
      //this.countRectangleCildren();

      function hideComments(){

      //1. get point position, find matching border
      /*for(let i = 0; i < this.children.length; i++)
      {console.log("child")}*/
      
      /*if(this.boundary){

        console.log("has inner boundary", this.boundary)
      }
      else{
        console.log("has no inner boundary")
      }*/


      //2. check if boundary/rectangle has sub/under boundary


      //3. if yes, continue checking for boundaries in correct coordinate until no more border is left

      //4. check if boundary has more than or equal to >= 4

      //4.1 if not add point do boundary

      //4.2 if yes split boundary into 4 new boundary with naming convention Nw,Ne,Sw,Se

      //4.2.1 add all belonging points to new boundary aswell as the current point



      /*if(this.points.length<this.capacity)
      {
        console.log("insert" + this.points);
        this.points.push(point);
      }
      else{
        subdivideQuad(point);
        console.log("subdivided");
      }*/
    }

    }
    subdivideQuad(){
        console.log("subdividing quad");
    }
    //Draw quad/rectangle
}

//Create Quad
function generateQuadTree(){
    const quadborderbox = new Rectangle(0,0,visualViewport.width, visualViewport.height);
    let quadCapacity = 4;
    const svgQuadTree = new QuadTree(quadborderbox, quadCapacity);


    //add circles point / create new Quad 
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    circleElements.forEach(circle => {
        const x = parseFloat(circle.getAttribute('cx'));
        const y = parseFloat(circle.getAttribute('cy'));
        const point = new Point(x, y, circle);
        svgQuadTree.insertPoint(point, svgQuadTree.capacity);
      });

    console.log(svgQuadTree);
}



export{generateQuadTree}