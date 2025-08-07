//Responsive mobile design
const mainMenu = document.querySelector('.burger');
const gui = document.querySelector('#gui_floater');
const lists = document.querySelector('.guiLists');
const modal = document.querySelector('#mainMenuModal');

const listElements = document.querySelectorAll('.listElement');
const mobileWrap = document.querySelector('#mobileWrap')

let mobileMenuVisible;

function toggleMenu(){
    mobileMenuVisible = mobileWrap.classList.contains('active');
    //enabling menu
    if(!mobileMenuVisible){
        mobileWrap.classList.add('active'); //display burger menu
        mainMenu.classList.add('active');  
        modal.style.display = "block";
        
    }
    //disabling menu
    else if(mobileMenuVisible){
        mobileWrap.classList.remove('active'); //hide burger menu
        mainMenu.classList.remove('active')
        modal.style.display = "none";
    }
}
let counter=0;
function resetNav(){
    counter++;
    console.log(counter)
    mobileMenuVisible = false;
    if(window.innerWidth > 540){
        gui.style.top = "10vh"
        gui.style.left = "0"
        console.log("big")
        modal.style.display = "none";
        lists.style.display = "block";
        listElements.forEach(element => {
            element.style.display = "block";
        });
    }
    else if(window.innerWidth <= 540){
        modal.style.display = "none";
        lists.style.display = "none";
        gui.style.top = "0px"
        gui.style.left = "0px"
        mainMenu.classList.remove('active');
        listElements.forEach(element => {
            element.style.display = "none";
        });
    }
}
function debounce(func, wait){
    let timeout;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            func.apply(context, args);
        }, wait);
        // console.log(timeout)
    }
}
function initWindowSize(){
    if(window.innerWidth > 540){
        listElements.forEach(element => {
            element.style.display = "block";
        });
    }
    else if(window.innerWidth <= 540){
        listElements.forEach(element => {
            element.style.display = "flex";
        });
    }
}

export {toggleMenu, resetNav, debounce, initWindowSize}