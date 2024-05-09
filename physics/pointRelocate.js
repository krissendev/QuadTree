"use strict";
import{decimalFixing} from '../util/decimalFixing.js'

function moveCircle(circleI, circleJ){
    console.log("moveCircle")
    let icr = parseFloat(circleI.getAttribute('r'));
    
    // let r = Number(parseFloat(circleI.getAttribute('r')).toFixed(2));

    // //round to 2 decimal numbers Number(_.toFixed(2))
    // let icx = Number(parseFloat(circleI.getAttribute('cx')).toFixed(2));
    // let icy = Number(parseFloat(circleI.getAttribute('cy')).toFixed(2));
    // let jcx = Number(parseFloat(circleJ.getAttribute('cx')).toFixed(2));
    // let jcy = Number(parseFloat(circleJ.getAttribute('cy')).toFixed(2));


    
    //round to 2 decimal numbers Number(_.toFixed(2))
    let ir = parseFloat(circleI.getAttribute('r'));
    let jr = parseFloat(circleJ.getAttribute('r'));
    let combinedRadius = decimalFixing(ir + jr);

    let icx = decimalFixing(circleI.getAttribute('cx'));
    let icy = decimalFixing(circleI.getAttribute('cy'));
    let jcx = decimalFixing(circleJ.getAttribute('cx'));
    let jcy = decimalFixing(circleJ.getAttribute('cy'));
    
    //icx = Number(icx.toFixed(2));
    // let dx = icx - jcx;
    // let dy = icy - jcy;
    // let distance = Number(Math.sqrt(dx * dx + dy * dy).toFixed(2))
    
    let dx = decimalFixing(icx - jcx);
    let dy = decimalFixing(icy - jcy);
    
    let distanceScalar = decimalFixing(Math.sqrt(dx * dx + dy * dy));
    console.log("moveCircle",distanceScalar, typeof(distanceScalar))

    if (distanceScalar < combinedRadius) {
        //console.log(circleI, circleJ)
        if (distanceScalar === 0) distanceScalar = 0.01;
        
        let scale = 0;
        console.log("moveCircle", typeof(icx), typeof(dx), typeof(scale), typeof(distanceScalar))
        let nix = decimalFixing(icx + (dx + scale / distanceScalar))
        let niy = decimalFixing(icy + (dy + scale / distanceScalar))
        let njx = decimalFixing(jcx - (dx + scale / distanceScalar))
        let njy = decimalFixing(jcy - (dy + scale / distanceScalar))
        console.log("moveCircle ",nix, niy, njx, njy, typeof(nix))
        // console.log("collide")
        circleI.setAttribute('fill', '#ff0000');
        circleJ.setAttribute('fill', '#ff0000');
        circleI.setAttribute('cx',  nix );
        circleI.setAttribute('cy',  niy );
        circleJ.setAttribute('cx',  njx );
        circleJ.setAttribute('cy',  njy );
    }
}
export{moveCircle}