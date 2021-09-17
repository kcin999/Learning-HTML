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
echo json_encode($result);

?>