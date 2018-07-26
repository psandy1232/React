<?php 
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
try {
    $conn = new PDO("mysql:host=$servername;dbname=practice", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "Connection failed: " . $e->getMessage();
}

// $allheaders = getallheaders();
// echo "<pre>";print_r($allheaders);exit;

$json = file_get_contents('php://input');
$req_details = json_decode($json);

// exit;
//echo "<pre>";print_r($req_details);exit;

if(isset($req_details) ){
  
  $updateEmail = isset($req_details->updateEmail)?trim($req_details->updateEmail):null;
  $email = isset($req_details->email)?trim($req_details->email):null;
  $first_name = isset($req_details->first_name)?trim($req_details->first_name):null;
  $last_name = isset($req_details->last_name)?trim($req_details->last_name):null;
  $phone = isset($req_details->phone)?trim($req_details->phone):null;
  $city = isset($req_details->city)?trim($req_details->city):null;
  
  $exs = checkEmailExisted($updateEmail);
  if($exs == true){
    $sql = "UPDATE users SET email='$email', first_name='$first_name', last_name='$last_name', city='$city', phone=$phone WHERE email = '$updateEmail' ";
    if($conn->exec($sql)){
      echo json_encode(array('status'=>'Success'));
    }else{
      echo json_encode(array('status'=>'FAIL'));
    }
  }else{
    echo json_encode(array('status'=>'Email does not existed'));
  }
}else{
  echo json_encode(array('status'=>'No Post data found'));
}


function checkEmailExisted($email = NULL){
  global $conn;
  $stmt = $conn->prepare("SELECT * FROM users WHERE email = '$email' ORDER BY first_name ASC"); 
  $stmt->execute();
  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
  $dataReader = $stmt->fetchAll();
  if(count($dataReader) > 0){
     return true;
  }else{
    return false;
  }
}
?>