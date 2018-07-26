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
// echo "<pre>";print_r($req_details);exit;

if(isset($req_details) ){
  
  $email = isset($req_details->email)?trim($req_details->email):null;
  $first_name = isset($req_details->first_name)?trim($req_details->first_name):null;
  $last_name = isset($req_details->last_name)?trim($req_details->last_name):null;
  $password = isset($req_details->password)?trim($req_details->password):null;
  $gender = isset($req_details->gender)?trim($req_details->gender):null;  
  $phone = isset($req_details->phone)?trim($req_details->phone):null;
  $city = isset($req_details->city)?trim($req_details->city):null;
  // $hobbies = isset($req_details->hobbies)?trim($req_details->hobbies):null;
  $about = isset($req_details->about)?trim($req_details->about):null;

  $hobbies = '';
  foreach($req_details->hobbies as $hobs){
      $hobs = (array)$hobs;
      if($hobs['value'] != ''){
        $hobbies .= $hobs['value'].',';
      }
  }
  $hobbies = rtrim($hobbies,",");
 
  
  $exs = checkEmailExisted($email);
  if($exs == false){
      $sql = "INSERT INTO users (email, password, first_name, last_name, gender,  city, phone, hobbies, about )
      VALUES ('$email','$password','$first_name','$last_name','$gender','$city','$phone','$hobbies','$about')";
      //echo $sql;  
      if($conn->exec($sql)){
        return "Created";
      }else{
        return "Failed";
      }
  }else{
    return "Email already existed.";
  }
  

}else{
  echo "No Post data found";
}


// function getData(){
//   global $conn;
//   $stmt = $conn->prepare("SELECT * FROM users ORDER BY first_name ASC"); 
//   $stmt->execute();
//   $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
//   $dataReader = $stmt->fetchAll();
//   if(count($dataReader) > 0){
//       return json_encode($dataReader);
//   }else{
//     return false;
//   }
// }

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