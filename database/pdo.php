<?php
// Set the PDO error mode to exception
$servername = "localhost";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=user_management", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully" . "<br>";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "<br>";
}

//Khởi tạo Prepared Statement từ biến $conn ở phần trước
$stmt = $conn->prepare("INSERT INTO user (name, mail, age) values (?, ?, ?)");

//Gán các biến (lúc này chưa mang giá trị) vào các placeholder theo thứ tự tương ứng
$stmt->bindParam(1, $name);
$stmt->bindParam(2, $mail);
$stmt->bindParam(3, $age);

//Gán giá trị và thực thi
$name = "Nguyen The Phong";
$mail = "phongnt@gmail.com";
$age = 23;

$stmt->execute();

//Gán những giá trị khác và tiếp tục thực thi
$name = "Dinh Kha Vy";
$mail = "vydk@gmail.com";
$age = 22;
$stmt->execute();

$users = array(
    array('Bruno Fernandes', 'bruno@mu.com', 29),
    array('Marcus Rashford', 'marcus@mu.com', 27),
);
foreach ($users as $user) {
    $stmt->execute($user);
}

$stmt = $conn->prepare('INSERT INTO user (name, mail, age) values (:name, :mail, :age)');

//Gán các biến (lúc này chưa mang giá trị) vào các placeholder theo tên của chúng
$stmt->bindParam(':name', $name);
$stmt->bindParam(':mail', $mail);
$stmt->bindParam(':age', $age);
$name = 'Andre Onana';
$mail = 'onana@mu.com';
$age = 28;
$stmt->execute();

// Inser objects
class User
{
    public $name;
    public $mail;
    public $age;
}

$person = new User();
$person->name = 'Kobbie Mainoo';
$person->mail = 'kobbie@mu.com';
$person->age = 18;

$stmt = $conn->prepare('INSERT INTO user (name, mail, age) values (:name, :mail, :age)');

$stmt->execute((array)$person);


// Select data

$stmt = $conn->prepare('SELECT * from user');

//Thiết lập kiểu dữ liệu trả về
$stmt->setFetchMode(PDO::FETCH_ASSOC);

//Gán giá trị và thực thi
$stmt->execute();

//Hiển thị kết quả, vòng lặp sau đây sẽ dừng lại khi đã duyệt qua toàn bộ kết quả
while ($row = $stmt->fetch()) {
    echo $row['name'] . '<br/>';
    echo $row['mail'] . '<br/>';
    echo $row['age'] . '<br/>';
}

echo $conn->lastInsertId();

$stmt = $conn->prepare("DELETE FROM user WHERE id = ?");
$idList = array(1, 2, 3, 4);

foreach ($idList as $id) {
    $stmt->bindParam(1, $id);
    $stmt->execute();
}

// delete all
$stmt = $conn->prepare("DELETE FROM user");
$stmt->execute();
// Close connection
$conn = null;
