<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "GameScores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM PongScores WHERE GameMode=? ORDER BY Score DESC LIMIT 5";
$stmt = $conn->prepare($sql);

if (!$stmt->bind_param("s", $_GET["GameMode"])) {
  die( "Error in bind_param: (" .$conn->errno . ") " . $conn->error);
}
if (!$stmt->execute()) {
  die( "Error in execute: (" .$conn->errno . ") " . $conn->error);
}
$result = $stmt->get_result()->fetch_all();

$text = "<table border=1><th>Name</th><th>Score</th>";
for($i = 0; $i< count($result); $i++){
  $text = $text."<tr><td>".$result[$i][0]."</td><td>".$result[$i][1]."</td></tr>";
}

echo $text."</table>"
?>