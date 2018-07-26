<?php 
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "123456";
try {
    $conn = new PDO("mysql:host=$servername;dbname=practice", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "Connection failed: " . $e->getMessage();
}

$json = file_get_contents('php://input');
$req_details = json_decode($json);
$req_details = (array)$req_details;
//echo "<pre>"; print_r($req_details);exit;
if(count($req_details) > 0 && $req_details['email'] != ''){
    $email = $req_details['email'];
    $stmt = $conn->prepare("DELETE FROM users WHERE email='$email' "); 
    if($stmt->execute()){
        echo json_encode(array('status'=>'Success'));
    }else{
        echo json_encode(array('status'=>'FAIL'));
    }
}else{
    echo "tests";
}

?>