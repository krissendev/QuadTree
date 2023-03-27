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
    createNewQuad(quadborderbox, quadCapacity){
      this.Nw = new QuadTree(quadborderbox, quadCapacity);
      this.Ne = new QuadTree(quadborderbox, quadCapacity);
      this.Sw = new QuadTree(quadborderbox, quadCapacity);
      this.Se = new QuadTree(quadborderbox, quadCapacity);
    }

    //recursive counting number of "boundary" in Quad
    checkForQuads(point){
      console.log(point);
      for(const x in this){
        if(this[x] instanceof QuadTree && (this.Nw!== null||this.Ne!== null||this.Sw!== null||this.Se!== null)){
          //Nw (0,0), Ne(1,0), Sw(0,1), Se(1,1)
          //Nw
          console.log("quad");
          if((point.x<this.boundary.width/2) && (point.y<this.boundary.height/2)){
            console.log(`point is Nw`, point)
            this.Nw.checkForQuads(point);
            //this.Nw.points.push(point);
          }
          //Ne
          if((point.x>this.boundary.width/2) && (point.y<this.boundary.height/2)){
            console.log(`point is Ne`, point)
            this.Ne.checkForQuads(point);
            //this.Ne.points.push(point);
          }
          //Sw
          if(point.x<this.boundary.width/2 && point.y>this.boundary.height/2){
            console.log(`point is Sw`, point)
            this.Sw.checkForQuads(point);
            //this.Sw.points.push(point);
          }
          //Se
          if(point.x>this.boundary.width/2 && point.y>this.boundary.height/2){
            console.log(`point is Se`, point);
            this.Se.checkForQuads();
            //this.Se.points.push(point);
          }
          return true;
        }
        
        //if all inner quads are null  
        //either 1 create new quads if capacity is surpassed and migrate points to new quads
        //or 2 add point to existing this quad
        else{
          if(this.points.length>=this.capacity){
            
            //add current point to array aswell for migration
            this.points.push(point);

            console.log(`create new quad`);
            this.createNewQuad(this.boundary, this.capacity);
            for(let i = 0; i<this.points.length;i++){
              //Ne
              if(this.points[i].x<this.boundary.width/2 && this.points[i].y<this.boundary.height/2){
                console.log(`point is in new Nw`, point)
                this.Nw.points.push(point);
              }
              //Ne
              if(this.points[i].x>this.boundary.width/2 && this.points[i].y<this.boundary.height/2){
                console.log(`point is in new Ne`, point)
                this.Ne.points.push(point);
              }
              //Sw
              if(this.points[i].x<this.boundary.width/2 && this.points[i].y>this.boundary.height/2){
                console.log(`point is in new Sw`, point)
                this.Sw.points.push(point);
              }
              //Se
              if(this.points[i].x>this.boundary.width/2 && this.points[i].y>this.boundary.height/2){
                console.log(`point is in new Se`, point)
                this.Se.points.push(point);
              }
            }
            //after migrating (points) array to sub quads-array clear it out
            this.points = [];
          }
          else{
            this.points.push(point);
          }
        }
      }
      return false;
    }

    insertPoint(point, capacity){
      //if quad already exist enter appropriate quad
      //if capacity > 4 create new quad
      this.checkForQuads(point);
      
      //console.log(this.checkForQuads(point));
      
      //has existing quads
      /*if(this.checkForQuads()){
        // check for position, enter quad with matching position

      }
      //has no existing quads
      else{

      }*/


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
    
    //test
    //svgQuadTree.createNewQuad(svgQuadTree.capacity);
    //svgQuadTree.Nw.createNewQuad(svgQuadTree.capacity);

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