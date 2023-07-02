"use strict";
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
      this.quadrants = [
        [null, null],  // Represents the Nw and Ne quadrants
        [null, null]   // Represents the Sw and Se quadrants
    ];
  }
  createNewQuad(quadborderbox, quadCapacity){
    let quadNw = {
      x:quadborderbox.x,
      y:quadborderbox.y,
      width:quadborderbox.width/2,
      height:quadborderbox.height/2
    };
    let quadNe = {
      x:quadborderbox.width/2,
      y:quadborderbox.y,
      width:quadborderbox.width/2,
      height:quadborderbox.height/2
    };
    let quadSw = {
      x:quadborderbox.x,
      y:quadborderbox.height/2,
      width:quadborderbox.width/2,
      height:quadborderbox.height/2
    };
    let quadSe = {
      x:quadborderbox.width/2,
      y:quadborderbox.height/2,
      width:quadborderbox.width/2,
      height:quadborderbox.height/2
    };
    this.quadrants = [
        [          
            new QuadTree(quadNw, quadCapacity),  // Nw at [0][0]
            new QuadTree(quadNe, quadCapacity)   // Ne at [0][1]
        ],
        [
            new QuadTree(quadSw, quadCapacity),  // Sw at [1][0]
            new QuadTree(quadSe, quadCapacity)   // Se at [1][1]
        ]
    ];
  }

    //recursive counting number of "boundary" in Quad
    checkForQuads(){
      // is any child in QuadTree object key (key:value) another Quad ?
    //   constructor(boundary,capacity){
    //     this.boundary = boundary;
    //     this.capacity = capacity;
    //     this.points = [];
    //     this.quadrants = [
    //       [null, null],  // Represents the Nw and Ne quadrants
    //       [null, null]   // Represents the Sw and Se quadrants
    //   ];
    // }
      const keys = Object.keys(this);
      for(let row of this.quadrants){   //array level 1     
        for (let col of row) {          //array level 2 either null or Quad
          if(col === null){return false;}
          else if(col instanceof QuadTree){ 
            return true;
          }
        }
      }
      return false;
    }


    insertPoint(point, capacity){
      //Check for existing quads at top level
      if (this.checkForQuads()) {
        //check point position
        
        //recursive loop until hits null on position

        console.log("testbool worked!")
      }
      //create quad at top level
      else{
        this.createNewQuad(this.boundary, this.capacity);
      }

        //Nw (0,0), Ne(1,0), Sw(0,1), Se(1,1)
        //  (f,f ),   (t,f),   (f,t),   (t,t)   

        //#1  find the correct position for a point
        //#1.1 check quadrants
        //#1.2 check for more quads
        //#2 check if given quad has reached it's capacity
        //#2.1 assign points in maxed quad to temp array, remove points from quad
        //2.2 create a new set of nested quads
        //2.3 reassign points to appropiate new quads

        //Nw
        //if(this.points[i].x<this.boundary.width/2 
        //&& this.points[i].y<this.boundary.height/2){

          //this.Nw.points.push(this.points[i]);
       // }

    //   if quadrant of 4 possible 
    //     if more quads
    //       go deeper
    //     else if quad > capacity
    //       create new quads
    //       redistribute
    //     else if quad < capacity 
    //       add point to quadrant
    //     else create 4 quadrant
    //   }
    // else {} //not !hasQuad 
     //}

     
  }
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
        console.log(point)
        svgQuadTree.insertPoint(point, svgQuadTree.capacity);
      });

    console.log(svgQuadTree);
}



export{generateQuadTree}