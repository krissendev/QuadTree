"use strict";

let physicsIntervalSwarm;
let physicsIntervalCursor;
let physicsIntervalSwarmCollision;
let looping = false;

function startPhysicsloop(mousePosition, QuadTree, svgQuadTree){
    //
    let quadTree = window.svgQuadTree;
    let currentQuad = window.svgQuadTree;
    let head = [];

    //console.log("startphysics");
    const svgContainer = document.querySelector('#content_svg');
    const circleElements = svgContainer.querySelectorAll('circle');
    if(!looping){
        looping = true;
        physicsMouseloopQuad(mousePosition, circleElements, QuadTree, currentQuad);
        physicsIntervalCursor = setInterval(() => {
            physicsMouseloopQuad(mousePosition, circleElements, QuadTree, currentQuad)
        }, 50);
        physicsIntervalSwarm = setInterval(() => {
            physicsSwarmMove(circleElements)
        }, 100); 
        physicsIntervalSwarmCollision = setInterval(() => {
            //QuadTree is class for typechecking quads
            //currentQuad = used for recursing down the three like a tail 
            //quadTree = the whole three
            //head array of path 
            physicsCircleCollisionQuad(QuadTree, currentQuad, quadTree, head)
        }, 100);
    }
}
function stopPhysicsloop(){
    if(looping){
        clearInterval(physicsIntervalSwarm);
        clearInterval(physicsIntervalCursor);
        clearInterval(physicsIntervalSwarmCollision);
        
        looping = false;
    }
}

function physicsMouseloop(mousePosition,circleElements, QuadTree, svgQuadTree){
    
    //console.log("looping");
    if (looping && circleElements ){
         //console.log("looping");
        if (looping && circleElements ){
            //console.log(circleElements.length)
            circleElements.forEach(circle => {
                let cx = parseFloat(circle.getAttribute('cx'));
                let cy = parseFloat(circle.getAttribute('cy'));
                let r = parseFloat(circle.getAttribute('r'));

                if((mousePosition.x > (cx-r) && mousePosition.x < (cx+r))&&
                (mousePosition.y > (cy-r) && mousePosition.y < (cy+r))){
                        //console.log(`mp:${mousePosition.x} ${mousePosition.y}, circle: ${cx} ${cy} ${r}`);
                        circle.setAttribute('fill', '#ff0000');
                        
                        let dx = mousePosition.x - cx;
                        let dy = mousePosition.y - cy;
                        let distanceScalar = Math.sqrt(dx * dx + dy * dy)+500;
                        let step1 = (Math.exp(-distanceScalar));
                        let step2 = 1/(step1-1);
                        //let nx = dx / distance;
                        //let ny = dy / distance;
                        let nx = (dx / step2)+ cx ;
                        let ny = (dy / step2)+ cy ;
                        //console.log(nx)
                        
                        circle.setAttribute('cx', nx );
                        circle.setAttribute('cy', ny );

                }
                else{
                    //console.log(circle);
                    circle.setAttribute('fill', '#000000');
                }  
            })
        }
    }
}



function physicsMouseloopQuad(mousePosition,circleElements, QuadTree, svgQuadTree){
    //console.log(svgQuadTree)
    if (looping && svgQuadTree ){
        if(svgQuadTree.points.length >0){
            for(let i=0; i<svgQuadTree.points.length; i++){
                let circle = svgQuadTree.points[i].data;
                

                let cx = parseInt(circle.getAttribute('cx'))
                let cy = parseInt(circle.getAttribute('cy'))
                let r = parseInt(circle.getAttribute('r'))
                if((mousePosition.x > (cx-r) && mousePosition.x < (cx+r))&&
                (mousePosition.y > (cy-r) && mousePosition.y < (cy+r))){
                    circle.setAttribute('fill', '#ff0000');
                    let dx = mousePosition.x - cx;
                    let dy = mousePosition.y - cy;
                    let distanceScalar = Math.sqrt(dx * dx + dy * dy);
                    let step1 = (Math.exp(-distanceScalar));
                    let step2 = 1/(step1-1);
                    let nx = (dx / step2)+ cx ;
                    let ny = (dy / step2)+ cy ;
                    
                    //console.log("mouseposition:", mousePosition)
                    // console.log(cx, cy)
                    // console.log(nx, ny)


                    circle.setAttribute('cx', ""+nx );
                    circle.setAttribute('cy', ""+ny );
                }                
                    
            }
        }
        
        else if(svgQuadTree.points.length === 0){
            const quadProperties = Object.keys(svgQuadTree);
            for(let i=0;i<quadProperties.length; i++){
                if(svgQuadTree[quadProperties[i]] instanceof QuadTree){
                    let quad = svgQuadTree[quadProperties[i]]
                    let boundary = quad.boundary;
                    //console.log(quad.points.length)
                    if( mousePosition.x>boundary.x &&
                        mousePosition.x<(boundary.x+boundary.width)&&
                        mousePosition.y>boundary.y &&
                        mousePosition.y<(boundary.y+boundary.height)
                        ){
                            physicsMouseloopQuad(mousePosition,circleElements, QuadTree, quad)
                    }
                }
            }
        }
    }
}


function moveCircle(circleI, circleJ){

    let icr = parseFloat(circleI.getAttribute('r'));
    let r = parseFloat(circleI.getAttribute('r'));
    let icx = parseFloat(circleI.getAttribute('cx'));
    let icy = parseFloat(circleI.getAttribute('cy'));
    let jcx = parseFloat(circleJ.getAttribute('cx'));
    let jcy = parseFloat(circleJ.getAttribute('cy'));

    let dx = icx - jcx;
    let dy = icy - jcy;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 2*r) {
        let dx = icx - jcx;
        let dy = icy - jcy;

        let distanceScalar = Math.sqrt(dx * dx + dy * dy);
        if (distanceScalar === 0) distanceScalar = 0.01;
        let moveDistance = r - (distanceScalar / 2);


        let nix = icx + (dx / distanceScalar) * moveDistance;
        let niy = icy + (dy / distanceScalar) * moveDistance;
        let njx = jcx - (dx / distanceScalar) * moveDistance;
        let njy = jcy - (dy / distanceScalar) * moveDistance;

        circleI.setAttribute('cx', nix );
        circleI.setAttribute('cy', niy );
        circleJ.setAttribute('cx', njx );
        circleJ.setAttribute('cy', njy );
    }
}

function physicsCircleCollisionQuad(QuadTree, currentQuad, quadTree, head){
    //check point overlap current quad
    if(currentQuad.points.length >0){
        for(let i=0; i<currentQuad.points.length; i++){
            for(let j=1; j<currentQuad.points.length; j++){

                let circleI = currentQuad.points[i].data;
                let circleJ = currentQuad.points[j].data;
                moveCircle(circleI, circleJ);
            }

            //check if point crosses boundary
            let circle = currentQuad.points[i].data;
            let cx = circle.getAttribute('cx');
            let cy = circle.getAttribute('cy');
            let r = circle.getAttribute('r');
            let boundary = currentQuad.boundary;


            

            //This code can be drasticly simplified and the head can simply be used to create a tempHead for quadTree lookup
            //Primary is the axis
            //Flip every attribute being the opposite of the primary and when the axis i s found the change is finished
            //If the last link is null, remove it...until the last link is not null
            //SeNwNeNw + N = NeSwSeSw(Sw=null) -> NeSwSe
            //SeNwNeSe + S = SeNwSe
            //SeNw + W = SwNe (Ne=null) -> Sw


            let crossingBorders = [];
            if(cy-r < boundary.y){crossingBorders.push("N")}
            if(cx+r > boundary.x + boundary.width){crossingBorders.push("E")}
            if(cx-r < boundary.x){crossingBorders.push("W")}
            if(cy+r > boundary.y + boundary.width){crossingBorders.push("S")}

            
            if(crossingBorders.length >0){
                for(let i =0; i< crossingBorders.length; i++){

                    //shorthand array
                    let headBorderTarget = head;
                    let switchPairObj =  {"N":"S", "S":"N", "E":"W", "W":"E"};

                    
                    //swap based on parameter
                    for(let j = headBorderTarget.length; j>0; j--){
						
						//crossingBorders ammount of borders to check and loop  through
						//headBorderTarget = ["NW", "NE","SW"....]
						//crossingBorders[i].tag = "W" ..etc


                        //if it contains the opposite axis, it's a match. Switch and exit
                        if(headBorderTarget[j-1].includes(switchPairObj[crossingBorders[i]])){
                            headBorderTarget[j-1] = headBorderTarget[j-1].replace(switchPairObj[crossingBorders[i]], crossingBorders[i]);
                            break;
                        }
                        //else if it contains the same axis, switch and continue until root
                        else if(headBorderTarget[j-1].includes(crossingBorders[i])){
                            headBorderTarget[j-1] = headBorderTarget[j-1].replace(crossingBorders[i], switchPairObj[crossingBorders[i]])
                                                        
                        }
                    }
					//headBorderTarget set,remove "null's" or recursive function remaining steps
					
					//check for null entries
                    removeHeadEndNull(headBorderTarget, quadTree);

					//if tempTree does not have instances of QuadTree check the matching quad to boundary
					//else if tempTree has QuadTree run a recursive function until the matchin boundary has
					//no further QuadTree instances

                }
            }

        }
    }
    //if no points check for deeper nesting
    else{
        const quadProperties = Object.keys(currentQuad);
        for(let i=0;i<quadProperties.length; i++){
            const property=quadProperties[i]
            const propertyValue= currentQuad[property];
            if(propertyValue instanceof QuadTree){
                head.push(property)
                physicsCircleCollisionQuad(QuadTree, propertyValue, quadTree, head)
            }
        }
    }
    head.pop();
}

function removeHeadEndNull(headBorderTarget, quadTree){

    //tempHeadClone     ["NW","SE"...]
    //tempTree          root:{NW:{SE:....}}
    //head is used in every iteration of crossingBorders
    //headBorderTarget is crossingBorders target destination

    // console.log(quadTree);
    let tempTree = quadTree;
    for(let h = 0; h<headBorderTarget.length - 1; h++){
        //console.log([headBorderTarget[h]]);
        if(tempTree[headBorderTarget[h]]!==(undefined||null) ){
            tempTree = tempTree[headBorderTarget[h]]	
        }
        else{
            //when a null entry is reached all remaining array entries are dropped
            let indexesDeleted = headBorderTarget.length - headBorderTarget[h];
            headBorderTarget.slice(0,-indexesDeleted)
            // console.log("inside null drop:", headBorderTarget, "is null?:", tempTree[headBorderTarget[h]], headBorderTarget.length, h, tempTree)
            return headBorderTarget;
        }
    }
}

function circleBoundaryOverlap (point, border, head, quadTree, QuadTree){
    //in
    const operators = {
        "<": (x, y) => x < y,
        ">": (x, y) => x > y,
    };
    let currentTree = quadTree;
    for(let i=0; i< head.length; i++){
		currentTree = currentTree[head[i]];
	}

    if(border.x && currentTree.points.length == 0){
		//west < boundary.x
		//east > boundary.x + boundary.width


        //West
		if(boundary.x.rel =="<"){
            //if border.num < quad.boundry then still outside
			if(operator[border.x.rel](border.x.num, currentTree.boundary.x)){
			   //Two quadrants ?
               head.pop();
			   circleBoundaryOverlap (point, border, head, quadTree, QuadTreeCl);
			}
            //inside
		}
    }


    //border is equal or within currentQuad.borders
    if(border.x){}
    if(border.y){}

    //out

}

function physicsCircleCollision(circleElements){
    if (looping && circleElements ){
        for(let i = 0; i<circleElements.length; i++){
            for (let j = i+1; j<circleElements.length; j++ ){

                let circleI = circleElements[i];
                let circleJ = circleElements[j];
                let r = parseFloat(circleI.getAttribute('r'));
                let icx = parseFloat(circleI.getAttribute('cx'));
                let icy = parseFloat(circleI.getAttribute('cy'));
                let jcx = parseFloat(circleJ.getAttribute('cx'));
                let jcy = parseFloat(circleJ.getAttribute('cy'));

                let dx = icx - jcx;
                let dy = icy - jcy;
                let distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < 2*r) {

                    let dx = icx - jcx;
                    let dy = icy - jcy;

                    //
                    let distanceScalar = Math.sqrt(dx * dx + dy * dy);
                    if (distanceScalar === 0) distanceScalar = 0.01;
                    let moveDistance = r - (distanceScalar / 2);


                    let nix = icx + (dx / distanceScalar) * moveDistance;
                    let niy = icy + (dy / distanceScalar) * moveDistance;
                    let njx = jcx - (dx / distanceScalar) * moveDistance;
                    let njy = jcy - (dy / distanceScalar) * moveDistance;

                    circleI.setAttribute('cx', nix );
                    circleI.setAttribute('cy', niy );
                    circleJ.setAttribute('cx', njx );
                    circleJ.setAttribute('cy', njy );

                }
            }
        }
    } 
}


function physicsSwarmMove(circleElements){
    if (looping && circleElements ){
        circleElements.forEach(circle => {
            let weight = 10; //value is split over 0 so half the value
            let balance = weight/2;
            let movex = (Math.random()* weight - balance)
            let movey = (Math.random()* weight - balance)
            let cx = parseFloat(circle.getAttribute('cx'));
            let cy = parseFloat(circle.getAttribute('cy'));
            
            circle.setAttribute('cx', cx + movex);
            circle.setAttribute('cy', cy + movey);

        });
    }
}

export{startPhysicsloop, stopPhysicsloop};



