<?php
ini_set('display_errors', 1); 
error_reporting(E_ALL);
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "GameScores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO  (PlayerName, Score,GameMode)
VALUES '$_POST['PlayerName']', $_POST['Score'], $_POST['GameMode'])";

if ($conn->query($sql) === TRUE) {
  echo "Success";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
