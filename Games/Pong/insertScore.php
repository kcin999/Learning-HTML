<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "GameScores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO PongScores (PlayerName, Score, GameMode) VALUES (?,?,?)";
$stmt = $conn->prepare($sql);
if (!$stmt->bind_param("sis", $_POST['PlayerName'],$_POST['Score'],$_POST['GameMode'])) {
  die( "Error in execute: (" .$conn->errno . ") " . $conn->error);
}
if (!$stmt->execute()) {
  die( "Error in execute: (" .$conn->errno . ") " . $conn->error);
} else {
  echo "Successfully Inserted ". $_POST['PlayerName'] . " with a score of " . $_POST['Score'];
}


?>
