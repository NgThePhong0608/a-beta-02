<?php
if (isset($_POST["submit"])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["banner"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Kiểm tra xem tệp đã tồn tại chưa
    if (file_exists($target_file)) {
        echo "Xin lỗi, tệp đã tồn tại.";
        $uploadOk = 0;
    }

    // Kiểm tra kích thước ảnh
    if ($_FILES["banner"]["size"] > 500000) {
        echo "Xin lỗi, kích thước tệp quá lớn.";
        $uploadOk = 0;
    }

    // Cho phép các định dạng ảnh nhất định
    if (
        $imageFileType != "jpg" && $imageFileType != "png"
    ) {
        echo "Xin lỗi, chỉ các tệp JPG, JPEG, PNG & GIF được phép.";
        $uploadOk = 0;
    }

    // Kiểm tra nếu $uploadOk = 0
    if ($uploadOk == 0) {
        echo "Xin lỗi, tệp của bạn không được tải lên.";

        // Nếu tất cả mọi thứ đều ổn, thử tải lên tệp
    } else {
        if (move_uploaded_file($_FILES["banner"]["tmp_name"], $target_file)) {
            echo "Tệp " . basename($_FILES["banner"]["name"]) . " đã được tải lên thành công.";
        } else {
            echo "Xin lỗi, đã xảy ra lỗi khi tải lên tệp của bạn.";
        }
    }
}
