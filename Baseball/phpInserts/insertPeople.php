<?php
use Phppot\DataSource;

require_once 'DataSource.php';
$db = new DataSource();
$conn = $db->getConnection();

$fileName = $_FILES["file"]["tmp_name"];
    
if ($_FILES["file"]["size"] > 0) {
    
    $file = fopen($fileName, "r");
    
    while (($column = fgetcsv($file, 10000, ",")) !== FALSE) {
        
        $playerID = "";
        if (isset($column[0])) {
            $playerID = mysqli_real_escape_string($conn, $column[0]);
        }
        $birthYear = mysqli_real_escape_string($conn, $column[1]);;
        $birthMonth = mysqli_real_escape_string($conn, $column[2]);
        $birthDay = mysqli_real_escape_string($conn, $column[3]);
        $birthCountry = mysqli_real_escape_string($conn, $column[4]);
        $birthState = mysqli_real_escape_string($conn, $column[5]);
        $birthCity = mysqli_real_escape_string($conn, $column[6]);
        $deathYear = mysqli_real_escape_string($conn, $column[7]);
        $deathMonth = mysqli_real_escape_string($conn, $column[8]);
        $deathDay = mysqli_real_escape_string($conn, $column[9]);
        $deathCountry = mysqli_real_escape_string($conn, $column[10]);
        $deathState = mysqli_real_escape_string($conn, $column[11]);
        $deathCity = mysqli_real_escape_string($conn, $column[12]);
        $nameFirst =mysqli_real_escape_string($conn, $column[13]);
        $nameLast = mysqli_real_escape_string($conn, $column[14]);
        $nameGiven = mysqli_real_escape_string($conn, $column[15]);
        $weight = mysqli_real_escape_string($conn, $column[16]);
        $height = mysqli_real_escape_string($conn, $column[17]);
        $bats = mysqli_real_escape_string($conn, $column[18]);
        $throws = mysqli_real_escape_string($conn, $column[19]);
        $debut = mysqli_real_escape_string($conn, $column[20]);
        $finalGame = mysqli_real_escape_string($conn, $column[21]);
        $retroID = mysqli_real_escape_string($conn, $column[22]);
        $bbrefI = mysqli_real_escape_string($conn, $column[23]);
        
        $sqlInsert = "INSERT into people (playerID, birthYear, birthMonth, birthDay, birthCountry, birthState, birthCity, deathYear, deathMonth, deathDay, deathCountry, deathState, deathCity, nameFirst, nameLast, nameGiven, weight, height, bats, throws, debut, finalGame, retroID, bbrefID)
                values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $paramType = "siiisssiiisssssiisssss";
        $paramArray = array(
            $playerID,
            $birthYear,
            $birthMonth,
            $birthDay,
            $birthCountry,
            $birthState,
            $birthCity,
            $deathYear,
            $deathMonth,
            $deathDay,
            $deathCountry,
            $deathState,
            $deathCity,
            $nameFirs,
            $nameLast,
            $nameGiven,
            $weight,
            $height,
            $bats,
            $throws,
            $debut,
            $finalGame,
            $retroID,
            $bbrefI
        );
        $insertId = $db->insert($sqlInsert, $paramType, $paramArray);
            
        if (! empty($insertId)) {
            $type = "success";
            $message = "CSV Data Imported into the Database";
        } else {
            $type = "error";
            $message = "Problem in Importing CSV Data";
        }
    }
}

?>