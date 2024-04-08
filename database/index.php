<html>

<head>
    <title>PHP & MySQL</title>
</head>

<body>
    <form method="post" action="<?php $_PHP_SELF ?>">
        <table width="600" border="0" cellspacing="1" cellpadding="2">
            <tr>
                <td width="250">Ho</td>
                <td>
                    <input name="ho" type="text" id="ho">
                </td>
            </tr>
            <tr>
                <td width="250">Ten</td>
                <td>
                    <input name="ten" type="text" id="ten">
                </td>
            </tr>
            <tr>
                <td width="250">Tuoi</td>
                <td>
                    <input name="tuoi" type="text" id="tuoi">
                </td>
            </tr>
            <tr>
                <td width="250">Diem Thi</td>
                <td>
                    <input name="diemthi" type="float" id="diemthi">
                </td>
            </tr>
            <tr>
                <td width="250"> </td>
                <td> </td>
            </tr>
            <tr>
                <td width="250"> </td>
                <td>
                    <input name="add" type="submit" id="add" values="Them ban ghi">
                </td>
            </tr>
        </table>
    </form>

    <?php

    // Connect to database
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'employee_management';
    $port = '3307';
    $conn = mysqli_connect($host, $user, $pass, $db, $port);
    if (!$conn) {
        die("Thong bao ve loi co lien quan");
    }
    echo "Ket noi thanh cong<br />";
    mysqli_select_db($conn, 'sinhvien');

    // Create table sinhvien
    /**
     
        $sql = 'CREATE DATABASE sinhvien';
        $retval = mysqli_query($conn, $sql);
        if (!$retval) {
            die('Khong the tao co so du lieu: ' . mysqli_connect_error());
        }
        echo "Co so du lieu sinhvien duoc tao thanh cong <br />";
        
     */

    // Drop database sinhvien
    /**
     
        mysqli_select_db($conn, 'sinhvien');
        $sql1 = 'DROP DATABASE sinhvien';
        $retval1 = mysqli_query($conn, $sql1);
        if (!$retval1) {
            die('Khong the xoa co so du lieu: ' . mysqli_connect_error());
        }
        echo "Co so du lieu sinhvien duoc xoa thanh cong <br />";
     */

    // Create table sinhvienk60
    /**
     $sql = "CREATE TABLE sinhvienk60( " .
        "mssv INT NOT NULL AUTO_INCREMENT, " .
        "ho VARCHAR(255) NOT NULL, " .
        "ten VARCHAR(255) NOT NULL, " .
        "tuoi INT NOT NULL, " .
        "diemthi FLOAT(4,2) NOT NULL, " .
        "PRIMARY KEY ( mssv )); ";

    mysqli_select_db($conn, 'sinhvien');
    $retval = mysqli_query($conn, $sql);
    if (!$retval) {
        die('Khong the tao bang: ' . mysqli_error($conn));
    }
    echo "Tao bang sinhvienk60 thanh cong\n";
     */

    // Get data from form
    // $ho = $_POST['ho'];
    // $ten = $_POST['ten'];
    // $tuoi = $_POST['tuoi'];
    // $diemthi = $_POST['diemthi'];

    // Insert data into table sinhvienk60

    // $sql = "INSERT INTO sinhvienk60 " .
    //     "(ho, ten, diemthi, tuoi) " .
    //     "VALUES " .
    //     "('$ho','$ten','$diemthi', '$tuoi')";
    // $retval = mysqli_query($conn, $sql);
    // if (!$retval) {
    //     die('Khong the nhap du lieu: ' . mysqli_error($conn));
    // }
    // echo "Nhap du lieu thanh cong\n";


    // Select data from table sinhvienk60
    /*
    $sql = 'SELECT mssv, ho, 
               ten, diemthi
        FROM sinhvienk60';

    $retval = mysqli_query($conn, $sql);
    if (!$retval) {
        die('Khong the lay du lieu: ' . mysqli_error($conn));
    }
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        echo "MSSV :{$row['mssv']}  <br> " .
            "Ho: {$row['ho']} <br> " .
            "Ten: {$row['ten']} <br> " .
            "Diem Thi : {$row['diemthi']} <br> " .
            "--------------------------------<br>";
    }
    echo "Lay du lieu thanh cong\n";
    */

    $sql = 'SELECT mssv, ho, 
               ten, diemthi
        FROM sinhvienk60
        WHERE diemthi > 9 and diemthi < 10';
    $retval = mysqli_query($conn, $sql);
    if (!$retval) {
        die('Khong the lay du lieu: ' . mysqli_error($conn));
    }
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        echo "MSSV :{$row['mssv']}  <br> " .
            "Ho: {$row['ho']} <br> " .
            "Ten: {$row['ten']} <br> " .
            "Diem Thi : {$row['diemthi']} <br> " .
            "--------------------------------<br>";
    }

    $sql = 'UPDATE sinhvienk60
        SET ten="Ronaldo"
        WHERE mssv=3';

    $retval = mysqli_query($conn, $sql);
    if (!$retval) {
        die('Khong the cap nhat du lieu: ' . mysqli_error($conn));
    }
    echo "Cap nhat du lieu thanh cong\n";

    $sql = 'SELECT * from sinhvienk60 WHERE ho LIKE "%the%"';
    $retval = mysqli_query($conn, $sql);
    if (!$retval) {
        die('Khong the lay du lieu: ' . mysqli_error($conn));
    }
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        echo "WHERE LIKE <br />";
        echo "MSSV :{$row['mssv']}  <br> " .
            "Ho: {$row['ho']} <br> " .
            "Ten: {$row['ten']} <br> " .
            "Diem Thi : {$row['diemthi']} <br> " .
            "--------------------------------<br>";
    }

    // ORDER BY 
    $sql = 'SELECT mssv, ho, 
               ten, diemthi
        FROM sinhvienk60
        ORDER BY  ten DESC';
    $retval = mysqli_query($conn, $sql);    
    if (!$retval) {
        die('Khong the lay du lieu: ' . mysqli_error($conn));
    }
    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
        echo "ORDER BY <br />";
        echo "MSSV :{$row['mssv']}  <br> " .
            "Ho: {$row['ho']} <br> " .
            "Ten: {$row['ten']} <br> " .
            "Diem Thi : {$row['diemthi']} <br> " .
            "--------------------------------<br>";
    }

    $sql = 'DELETE FROM sinhvienk60
        WHERE mssv=7';

    $retval = mysqli_query($conn, $sql);
    if (!$retval) {
        die('Khong the xoa du lieu: ' . mysqli_error($conn));
    }
    echo "Xoa du lieu thanh cong\n";

    mysqli_close($conn);
    ?>


</body>

</html>