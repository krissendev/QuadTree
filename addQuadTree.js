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
    }
    insertPoint(){
        console.log("insert");
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

    //add circles to quadtree
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    circleElements.forEach(circle => {
        const x = parseFloat(circle.getAttribute('cx'));
        const y = parseFloat(circle.getAttribute('cy'));
        const point = new Point(x, y, circle);
        svgQuadTree.insertPoint(point);
      });

    console.log(svgQuadTree);
}



export{generateQuadTree}