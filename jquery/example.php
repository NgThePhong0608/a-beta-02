<?php
// Mô phỏng việc trả về dữ liệu từ máy chủ
$data = array(
    array("name" => "John", "age" => 30),
    array("name" => "Jane", "age" => 25),
    array("name" => "Bob", "age" => 35)
);

// Trả về dữ liệu dưới dạng JSON
echo json_encode($data);
