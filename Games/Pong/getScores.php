<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "GameScores";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT TOP 5 * FROM PongScores WHERE GameMode=? ORDER BY Score DESC";
$stmt = $conn->prepare($sql);
// $stmt->bind_param("s", $_GET["GameMode"]);

// if (!$stmt->bind_param("s", $_GET["GameMode"])) {
//   die( "Error in bind_param: (" .$conn->errno . ") " . $conn->error);
// }
// if (!$stmt->execute()) {
//   die( "Error in execute: (" .$conn->errno . ") " . $conn->error);
// } else {
//   echo "Successfully Grabbed Top 5 " . $_GET['GameMode'] . " scores.";
// }

?>