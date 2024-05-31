//Responsive mobile design
const mainMenu = document.querySelector('.burger');
const gui = document.querySelector('#gui_floater');
const links = document.querySelector('.guiLinks');
const modal = document.getElementById('mainMenuModal');

let toggled = false;
function toggleMenu(){

    //disabling menu
    if(toggled){
        links.style.display = "none";
        modal.style.display = "none";
        toggled = false;
        mainMenu.classList.remove('active');
    }
    //enabling menu
    else if(!toggled){
        links.style.display = "flex";
        modal.style.display = "block";
        toggled = true;
        mainMenu.classList.toggle('active');
        
    }
}

function resetNav(){
    toggled = false;
    if(window.innerWidth > 540){
        modal.style.display = "none";
        links.style.display = "inline-block";
        
    }
    else if(window.innerWidth < 541){
        modal.style.display = "none";
        links.style.display = "none";
        gui.style.top = "0px"
        gui.style.left = "0px"
        mainMenu.classList.remove('active');
    }
}

export {toggleMenu, resetNav}