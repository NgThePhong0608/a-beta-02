<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài tập thực hành</title>
</head>

<body>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="name">
            Name:
        </label>
        <input type="text" name="name" required><br>
        <label for="phone">
            Phone:
        </label>
        <input type="text" name="phone" required><br>
        <label for="email">
            Email:
        </label>
        <input type="email" name="email" required><br>
        <button type="submit">Submit</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $errors = array();

        if (empty($name)) {
            $errors[] = "Name is required";
        } else {
            if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
                $errors[] = "Only letters and white space allowed in name";
            }
        }

        if (empty($phone)) {
            $errors[] = "Phone is required";
        } else {
            if (strlen($phone) != 10) {
                $errors[] = "Phone number must be 10 digits";
            }
            if (!preg_match("/^[0-9]*$/", $phone)) {
                $errors[] = "Invalid phone number format";
            }
        }

        if (empty($email)) {
            $errors[] = "Email is required";
        } else {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Invalid email format";
            }
        }

        if (!empty($errors)) {
            echo "<h3>Errors:</h3>";
            echo "<ul>";
            foreach ($errors as $error) {
                echo "<li>$error</li>";
            }
            echo "</ul>";
        } else {
            echo "<h3>Form submitted successfully!</h3>";
        }
    }
    ?>
</body>

</html>