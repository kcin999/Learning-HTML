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