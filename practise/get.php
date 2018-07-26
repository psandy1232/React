<?php 
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
try {
    $conn = new PDO("mysql:host=$servername;dbname=practice", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "Connection failed: " . $e->getMessage();
}

$stmt = $conn->prepare("SELECT * FROM users ORDER BY first_name ASC"); 
$stmt->execute();
$result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
$dataReader = $stmt->fetchAll();
if(count($dataReader) > 0){
    echo json_encode($dataReader);
}else{
    echo false;
}
?>