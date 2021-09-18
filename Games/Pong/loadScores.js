//$.post("insertScore.php", data, gamestate = "startMenu");



sendData ={
    "GameMode": "OnePlayer"
}
$.get("getScores.php",sendData, function(data){
    text = "<table border='1'><th>Name</th><th>Score</th>";
    data  =JSON.parse(data);
    for(let i =0; i< data.length; i++){
        text += "<tr><td>"+data[i][0]+"</td><td>"+data[i][1]+"</td></tr>";
    }
    text+= "</table>";
    document.getElementById("OnePlayerScores").innerHTML = text;
});
