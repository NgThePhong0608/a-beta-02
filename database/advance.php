<?php
echo "Today is " . date("Y/m/d") . "<br>";
echo "Today is " . date("Y.m.d") . "<br>";
echo "Today is " . date("Y-m-d") . "<br>";
echo "Today is " . date("l") . "<br>";
echo "The time is " . date("h:i:sa") . "<br>";

// Set the timezone to Ho Chi Minh
date_default_timezone_set("Asia/Ho_Chi_Minh");
echo "The time is " . date("h:i:sa") . "<br>";

$d = mktime(11, 14, 54, 8, 6, 2001);
echo "Created date is " . date("Y-m-d h:i:sa", $d) . "<br>";

$d = strtotime("10:30pm August 6 2001");
echo "Created date is " . date("Y-m-d h:i:sa", $d) . "<br>";

$d = strtotime("tomorrow");
echo date("Y-m-d h:i:sa", $d) . "<br>";

$d = strtotime("next Saturday");
echo date("Y-m-d h:i:sa", $d) . "<br>";

$d = strtotime("+3 Months");
echo date("Y-m-d h:i:sa", $d) . "<br>";

$startdate = strtotime("Saturday");
$enddate = strtotime("+6 weeks", $startdate);

while ($startdate < $enddate) {
    echo date("M d", $startdate) . "<br>";
    $startdate = strtotime("+1 week", $startdate);
}

$d1 = strtotime("Jan 29 2025");
$d2 = ceil(($d1 - time()) / 60 / 60 / 24);
echo "There are " . $d2 . " days until Jan 29 2025.";
