"use strict";

let physicsIntervalSwarm;
let physicsIntervalCursor;
let physicsIntervalSwarmCollision;
let looping = false;

function startPhysicsloop(mousePosition, QuadTree, svgQuadTree){

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
        // physicsIntervalSwarm = setInterval(() => {
        //     physicsSwarmMove(circleElements)
        // }, 500); 
        physicsIntervalSwarmCollision = setInterval(() => {
            //QuadTree is class for typechecking quads
            //currentQuad = used for recursing down the three like a tail 
            //quadTree = the whole three
            //head array of path 
            console.log("Set Interval...")
            physicsCircleCollisionQuad(QuadTree, head)
        }, 100);
    }
}
function stopPhysicsloop(){
    if(looping){
        //clearInterval(physicsIntervalSwarm);
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
                        let distanceScalar = Math.sqrt(dx * dx + dy * dy);
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
    //console.log("CYCLE - START")
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
                    if (distanceScalar === 0) distanceScalar = 0.01;
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

    //round to 2 decimal numbers Number(_.toFixed(2))
    let icx = Number(parseFloat(circleI.getAttribute('cx')).toFixed(2));
    let icy = Number(parseFloat(circleI.getAttribute('cy')).toFixed(2));
    let jcx = Number(parseFloat(circleJ.getAttribute('cx')).toFixed(2));
    let jcy = Number(parseFloat(circleJ.getAttribute('cy')).toFixed(2));


    
    //icx = Number(icx.toFixed(2));
    let dx = icx - jcx;
    let dy = icy - jcy;
    
    let distance = Number(Math.sqrt(dx * dx + dy * dy).toFixed(2))
    
    

    if (distance < 2*r) {
        //console.log(circleI, circleJ)
        let distanceScalar = Math.sqrt(dx * dx + dy * dy);
        if (distanceScalar === 0) distanceScalar = 0.01;

        let scale = 0;

        let nix = Number((icx + (dx + scale / distanceScalar)).toFixed(2))
        let niy = Number((icy + (dy + scale / distanceScalar)).toFixed(2))
        let njx = Number((jcx - (dx + scale / distanceScalar)).toFixed(2))
        let njy = Number((jcy - (dy + scale / distanceScalar)).toFixed(2))
        // console.log("collide")
        circleI.setAttribute('fill', '#ff0000');
        circleJ.setAttribute('fill', '#ff0000');
        circleI.setAttribute('cx', nix );
        circleI.setAttribute('cy', niy );
        circleJ.setAttribute('cx', njx );
        circleJ.setAttribute('cy', njy );
    }
}

    

function physicsCircleCollisionQuad(QuadTree, head){
    console.log("STARTING...")
    //currentQuad refresh of window.svgQuadTree for consistent read/lookup
    let currentQuad = window.svgQuadTree;
    if(head.length>0){
        for(let i = 0; i<head.length;i++){
            if(currentQuad[head[i]]!=null && currentQuad!=null){
                currentQuad = currentQuad[head[i]];
            }
            else{break;}
        }
    }

    //Check point collision
    if(currentQuad.points.length >0){   
        //there is no point of checking with 1 or less points against each other
        for(let i=0; i<currentQuad.points.length; i++){
            
            //check point against overlap in current quad
            if(currentQuad.points.length >1){
                for(let j=i+1; j<currentQuad.points.length; j++){
    
                    let circleI = currentQuad.points[i].data;
                    let circleJ = currentQuad.points[j].data;
                    moveCircle(circleI, circleJ);
                }
            }

            //check if point against boundary and eventual points at intersection
            let circle = currentQuad.points[i].data;
            let cx = circle.getAttribute('cx');
            let cy = circle.getAttribute('cy');
            let r = circle.getAttribute('r');
            let boundary = currentQuad.boundary;

            //SeNwNeNw + N = NeSwSeSw(Sw=null) -> NeSwSe
            //SeNwNeSe + S = SeNwSe
            //SeNw + W = SwNe (Ne=null) -> Sw


            let crossingBorders = [];
            if(cy-r < boundary.y){crossingBorders.push("N")}
            if(cx+r > boundary.x + boundary.width){crossingBorders.push("E")}
            if(cx-r < boundary.x){crossingBorders.push("W")}
            if(cy+r > boundary.y + boundary.height){crossingBorders.push("S")}
            

            //Every crossingBorder is checked for point overlap by using "headBorderTarget" as a shorthand starting lookup point             
            if(crossingBorders.length >0){
                let headBorderTarget;
                for(let j =0; j< crossingBorders.length; j++){

                    headBorderTarget = head;
                    let switchPairObj =  {"N":"S", "S":"N", "E":"W", "W":"E"};
                    
                    //swap based on parameter
                    for(let k = headBorderTarget.length; k>0; k--){
						
						//crossingBorders ammount of borders to check and loop  through
						//headBorderTarget = ["NW", "NE","SW"....]
						//crossingBorders[i].tag = "W" ..etc


                        //if it contains the opposite axis, it's a match. Switch and exit
                        if(headBorderTarget[k-1].includes(switchPairObj[crossingBorders[j]])){
                            headBorderTarget[k-1] = headBorderTarget[k-1].replace(switchPairObj[crossingBorders[j]], crossingBorders[j]);
                            break;
                        }
                        //else if it contains the same axis, switch and continue until root
                        else if(headBorderTarget[k-1].includes(crossingBorders[j])){
                            headBorderTarget[k-1] = headBorderTarget[k-1].replace(crossingBorders[j], switchPairObj[crossingBorders[j]])
                                                        
                        }
                    }
					
					//check for null entries
                    headBorderTarget = removeHeadEndNull(headBorderTarget);
                    
                    
                    if(headBorderTarget!=null){
                        let tempTree = window.svgQuadTree;;
                        for(let j=0; j<headBorderTarget.length-1; j++){
                            let copy1 = JSON.parse(JSON.stringify(headBorderTarget[j]));
                            let copy2 = JSON.parse(JSON.stringify(tempTree[headBorderTarget[j]]));
    
                            if(tempTree[headBorderTarget[j]]==null){
                                console.log("? undefined",copy1, typeof(copy1), copy2 )
                            }
                            else{
                                // console.log("DB accessor on tempTree:",copy1, "\n Headbordertarget:", headBorderTarget, headBorderTarget.length-1, j)
                                tempTree = tempTree[headBorderTarget[j]];
                            }
                            //let copy2 = JSON.parse(JSON.stringify(tempTree));
                            // console.log("DB final tempTree:",copy2)
        
                            let point = currentQuad.points[i].data;
                            //opposite direction to find the closest boundary in the boundary checkup of headBorderTarget-tempTree
                            let direction = switchPairObj[crossingBorders[i]];
                            checkBorders(tempTree, QuadTree, boundary, direction, point, cx, cy, r, headBorderTarget);
        
                            //if tempTree does not have instances of QuadTree check the matching quad to boundary
                            //else if tempTree has QuadTree run a recursive function until the matchin boundary has
                            //no further QuadTree instances
                        }
                    }


                }
            }

        }
    }
    //Recurse deper
    else{
        const quadProperties = Object.keys(currentQuad);
        for(let i=0;i<quadProperties.length; i++){
            const property=quadProperties[i]
            const propertyValue= currentQuad[property];
            if(propertyValue instanceof QuadTree){
                console.log("in", head);
                head.push(property)
                physicsCircleCollisionQuad(QuadTree, head)
            }
        }
    }
    console.log("out")
    head.pop();
} 

function checkBorders(tempTree, QuadTree, boundary, direction,  point, cx, cy, r, headBorderTarget){
    //this tempTree is the end point to check for
    if(tempTree.points.length>0){
        //check points against point
        for(let j=0; j<tempTree.points.length; j++){
            let point2 = tempTree.points[j].data;
            if(point!==point2){
                moveCircle(point, point2);
            }
        }

    }
    else{
        
        const quadProperties = Object.keys(tempTree);
        console.log(headBorderTarget);
        for(let i=0; i< quadProperties.length; i++){
            if(tempTree[quadProperties[i-1]]!=null){

                if(tempTree[quadProperties[i-1]] instanceof QuadTree){
                    let quadBoundary = tempTree[quadProperties[i-1]].boundary;
                    //continue deeper if point is within bounds
                    if(quadBoundary.x < cx-r &&
                       quadBoundary.y < cy-r &&
                       quadBoundary.x + quadBoundary.width  > cx+r &&
                       quadBoundary.y + quadBoundary.height > cy+r){
                         //en akse er presis, type : x'{x, x+width}
                         //en annen akse er retningsmessig prioritert, type y'>{y} men av alle y'':{y1',y2',y3'} den minste
                         //matches the boundary!
     
                         //Because multiple nested quads can in theory be in bounds of the point diameter, tempTree should not be changed
                         //so that it can be reused in the loop for multicases, therefore using "recursiveInstancedTempTree" instead in the recursion "checkBorders"
                         let recursiveInstancedTempTree = tempTree[quadProperties[i-1]];
                         
                         checkBorders(recursiveInstancedTempTree, QuadTree, boundary, direction,  point, cx, cy, r);
                    }
                }
            }
            
        }

        //else no point found
    }
}
function removeHeadEndNull(headBorderTarget){
    try{
    //tempHeadClone     ["NW","SE"...]
    //tempTree          root:{NW:{SE:....}}
    //head is used in every iteration of crossingBorders
    //headBorderTarget is crossingBorders target destination

    let tempTree = window.svgQuadTree;;
    for(let h = 0; h<headBorderTarget.length - 1; h++){
        console.log(tempTree);
        if(tempTree[headBorderTarget[h]]!=null){
            tempTree = tempTree[headBorderTarget[h]]	
        }
        //else if(tempTree[headBorderTarget[h]]==null){
        else {
            //when a null entry is reached all remaining array entries are dropped
            //let indexesDeleted = headBorderTarget.length - headBorderTarget[h];
            let indexesDeleted = headBorderTarget.length - h;
            headBorderTarget = headBorderTarget.slice(0,-indexesDeleted)
            // console.log("inside null drop:", headBorderTarget, "is null?:", tempTree[headBorderTarget[h]], headBorderTarget.length, h, tempTree)
            return headBorderTarget;
        }
    }
    }
    catch(error){
        console.log(error)
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



