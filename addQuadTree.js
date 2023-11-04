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
      
      console.log(`beginning of checkForQuads, point:\`${JSON.stringify(point)}\``) //, this:\`${JSON.stringify(this)}\`
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
          console.log(`This:${this} HasQuad true, with point: \`${JSON.stringify(point)}\``)
          for(const x in this){
            //if current QuadTree element contains QuadTree climb down hierarchy
            if(this[x] instanceof QuadTree){
              //Nw (0,0), Ne(1,0), Sw(0,1), Se(1,1)
              //Nw
              console.log(`This-Child:\`${JSON.stringify(this[x])}\` in this: \`${JSON.stringify(this)}\`is an instance of ${QuadTree} with point \`${JSON.stringify(point)}\``);
              if((point.x<this.boundary.width/2) && (point.y<this.boundary.height/2)){
                console.log(`point is Nw. In QT \`${JSON.stringify(this[x])}\` recurse point:\`${JSON.stringify(point)}\` in NW:${this.Nw}`)
                this.Nw.checkForQuads(point);
                //this.Nw.points.push(point);
              }
              //Ne
              if((point.x>this.boundary.width/2) && (point.y<this.boundary.height/2)){
                console.log(`point is Ne. In QT \`${JSON.stringify(this[x])}\` recurse point: \`${JSON.stringify(point)}\` in NE:${this.Ne}`)
                this.Ne.checkForQuads(point);
                //this.Ne.points.push(point);
              }
              //Sw
              if(point.x<this.boundary.width/2 && point.y>this.boundary.height/2){
                console.log(`point is Sw. In QT \`${JSON.stringify(this[x])}\` recurse point:\`${JSON.stringify(point)}\` in SW:${this.Sw}`)
                this.Sw.checkForQuads(point);
                //this.Sw.points.push(point);
              }
              //Se
              if(point.x>this.boundary.width/2 && point.y>this.boundary.height/2){
                console.log(`point is Se. In QT \`${JSON.stringify(this[x])}\` recurse point:\`${JSON.stringify(point)}\` in SE:${this.Se}`);
                this.Se.checkForQuads(point);
                //this.Se.points.push(point);
              }
              return true;
            }
          }
        }
  
        else{  
          //if all inner quads are null  
          //either 1 create new quads if capacity is surpassed and migrate points to new quads
          //or 2 add point to existing this quad
          if(this.points.length>=this.capacity){
              
            //add current point to array aswell for migration
            this.points.push(point);
  
            console.log(`create new quad in this:\`${JSON.stringify(this)}\``);
            this.createNewQuad(this.boundary, this.capacity);
            for(let i = 0; i<this.points.length;i++){
              //Nw
              console.log(this.points[i]);
              if(this.points[i].x<this.boundary.width/2 && this.points[i].y<this.boundary.height/2){
                console.log(`point is in new Nw. Point:\`${JSON.stringify(this.points[i])}\` in this.NW:${this.Nw}`) //\`${JSON.stringify(this)}\`
                this.Nw.points.push(this.points[i]);
              }
              //Ne
              else if(this.points[i].x>this.boundary.width/2 && this.points[i].y<this.boundary.height/2){
                console.log(`point is in new Ne. Point:\`${JSON.stringify(this.points[i])}\` in this.NE:${this.Ne}`) //\`${JSON.stringify(this)}\`
                this.Ne.points.push(this.points[i]);
              }
              //Sw
              else if(this.points[i].x<this.boundary.width/2 && this.points[i].y>this.boundary.height/2){
                console.log(`point is in new Sw. Point:\`${JSON.stringify(this.points[i])}\` in this.SW:${this.Sw}`) //\`${JSON.stringify(this)}\`
                this.Sw.points.push(this.points[i]);
              }
              //Se
              else if(this.points[i].x>this.boundary.width/2 && this.points[i].y>this.boundary.height/2){
                console.log(`point is in new Se. Point:\`${JSON.stringify(this.points[i])}\` in this.SE:${this.Se}`) //\`${JSON.stringify(this)}\`
                this.Se.points.push(this.points[i]);
              }
            }
            //after migrating (points) array to sub quads-array clear it out
            this.points = [];
            console.log(`clear points `); //in \`${JSON.stringify(this)}\`
            //check if quad capacity is surpassed, if yes recurse 
          }
          else{
            (console.log(`regular push, point: \`${JSON.stringify(point)}\``)); //in: \`${JSON.stringify(this)}\`
            this.points.push(point);
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
    
    //testing
    window.svgQuadTree = svgQuadTree;
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