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

$json = file_get_contents('php://input');
$req_details = json_decode($json);
if($req_details->email != '' && $req_details->password != ''){
    $email = isset($req_details->email)?trim($req_details->email):null;
    $password = isset($req_details->password)?trim($req_details->password):null;

    $stmt = $conn->prepare("SELECT * FROM users WHERE BINARY email = '$email' AND BINARY password = '$password' "); 
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    $dataReader = $stmt->fetchAll();
    if(count($dataReader) > 0){
        echo json_encode(array('data' => $dataReader, 'status' => 'Success'));
    }else{
        echo json_encode(array('status' => 'Fail'));
    }
    
}

?>