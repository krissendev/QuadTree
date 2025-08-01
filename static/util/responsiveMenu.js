//Responsive mobile design
const mainMenu = document.querySelector('.burger');
const gui = document.querySelector('#gui_floater');
const lists = document.querySelector('.guiLists');
const modal = document.querySelector('#mainMenuModal');

const listElements = document.querySelectorAll('.listElement');
let toggled = false;
function toggleMenu(){

    //disabling menu
    if(toggled){
        lists.style.display = "none";
        modal.style.display = "none";
        mainMenu.classList.remove('active');
        lists.style.display = "flex";
        listElements.forEach(element => {
            element.style.display = "none";
        });
        toggled = false;
    }
    //enabling menu
    else if(!toggled){
        lists.style.display = "flex";
        modal.style.display = "block";
        mainMenu.classList.toggle('active');
        listElements.forEach(element => {
            element.style.display = "flex";
        });
        toggled = true;
    }
}
let counter=0;
function resetNav(){
    counter++;
    console.log(counter)
    toggled = false;
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