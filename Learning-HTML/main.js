function clickButton(){
    console.log("You clicked the button");
}

function openSideNav(){
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeSideNav(){
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

let navigationToggled = false;
function toggleNav(){
    if(!navigationToggled){
        openSideNav();
        navigationToggled = true;
    }else{
        closeSideNav();
        navigationToggled = false;
    }
}