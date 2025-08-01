"use strict"
const screenClick = document.querySelector('#quadtree-rects');
//let svgQuadTree;
let root; 
let stack = [{node: root, path: [null]}];
//let stack = [{node: Nw, path: [svgQuadTree.Nw.Nw.Se.Sw.Nw]}];
//svgQuadTree.Nw.Nw.Se.Sw.Nw

let reactInterval;
let looping = false;

function startReactCreate(){
    if(!looping){
        looping = true;
        reactInterval = setInterval(() => {
            createRects()
        }, 500); 
    }
}
function stopReactCreate(){
    if(looping){
        clearInterval(reactInterval);        
        looping = false;
    }
}

function createRects(){
    // console.log("func")
    if(window.svgQuadTree === undefined || window.svgQuadTree === null){
        console.error(`Create Quad Tree first!`);
        //console.log(`undefined? \`${JSON.stringify(window.svgQuadTree)} \``);
    }
    else{

        //clear out frame
        screenClick.innerHTML ="";
        
        
        //stack declaration
        const svgQuadTree = window.svgQuadTree;
        // console.log(svgQuadTree);

        root = svgQuadTree;             //init-head
        stack[0].node = root;              //current heead
        stack[0].path[0] =`Root`;         //chain-head, string of array identifiers

        // console.log("full stack:", stack)
        // console.log("stack0:", stack[0])
        // console.log("length:", stack.length )
        recursiveRect(svgQuadTree, stack);
        //test(svgQuadTree, stack)
    }
}

function test(svgQuadTree, stack){
    //console.log(svgQuadTree);
    for(let i in svgQuadTree){
        stack.push({
            node: stack[0].node[i],
            path: [...stack[0].path, i] 
        });
        // console.log(stack[0].node);
        // console.log(stack.length);
    }
}

function recursiveRect(svgQuadTree, stack){
    
    for(let i in svgQuadTree){
        //console.log(`this is NwNeSwSe:`, svgQuadTree[i]);
        
        //CASE1; Draw rects on found `boundaries`

        if(i === `boundary` &&                          // match i to boundary
        svgQuadTree[i] &&                               // i not null
        (Object.keys(svgQuadTree[i]).length > 0)){      //i has children
            // console.log(`drawing boundary`, i);
            // console.log(`in:\`${JSON.stringify(i, null, 2)} \``);
            drawBorder(svgQuadTree[i]);
        }
        
        //CASE2; Recursion inside `NwNeSwSe` that has children

        if(i !== `boundary` &&                          //not boundary
        Array.isArray(svgQuadTree[i]) == false &&       //not array
        svgQuadTree[i] !== null &&                      // i not null
        (Object.keys(svgQuadTree[i]).length > 0)){      ///NwNeSwSe

            //updating stack to next inner context            
            stack.push({
                node: stack[0].node[i],
                path: [...stack[0].path, i] 
            });
            //console.log(`in:\`${JSON.stringify(stack, null, 2)} \``);
            //console.log(`length`,stack.length)
            
            recursiveRect(svgQuadTree[i], stack);    
        }

        //CASE3; if NwNeSwSe children is null, return statement move stack

        if(i !== `boundary` &&                          //not boundary
        Array.isArray(svgQuadTree[i]) == false &&       //not array
        svgQuadTree[i] !== null &&                      // i not null
        (Object.keys(svgQuadTree[i]).length < 0)){      ///NwNeSwSe empty

            //updating stack to next outer context
            stack.pull({
                node: stack[0].node[i],
                path: [...stack[0].path, i] 
            });

            //console.log(`in:\`${JSON.stringify(stack, null, 2)} \``);
            //console.log(stack)
            return;
        }

        //handle return stack

    }
}

function drawBorder(rectRef){
    // console.log(`drawing border`, rectRef);    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute("x", rectRef.x);
    rect.setAttribute("y", rectRef.y);
    rect.setAttribute("width", rectRef.width);
    rect.setAttribute("height", rectRef.height);
    rect.setAttribute("fill", "none");
    rect.setAttribute("stroke", "red");
    screenClick.appendChild(rect);    
}
export{createRects, startReactCreate, stopReactCreate};