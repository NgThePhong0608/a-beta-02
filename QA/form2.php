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

        <label for="age">
            Age:
        </label>
        <input type="text" name="age"><br>

        <label for="address">
            Address:
        </label>
        <input type="text" name="address"><br>

        <label for="phone">
            Phone:
        </label>
        <input type="text" name="phone" required><br>

        <label for="job">
            Job:
        </label>
        <input type="text" name="job"><br>

        <label for="email">
            Email:
        </label>
        <input type="email" name="email" required><br>

        <label for="password">
            Passwod:
        </label>
        <input type="password" name="password" required><br>

        <button type="submit">Submit</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $age = $_POST["age"];
        $address = $_POST["address"];
        $phone = $_POST["phone"];
        $job = $_POST["job"];
        $email = $_POST["email"];
        $password = $_POST["password"];
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

        if (empty($password)) {
            $errors[] = "Password is required";
        } else {
            if (strlen($password) < 8 && strlen($password) < 8 || !preg_match("/[!@#$%^&*()\-_=+{};:,<.>]/", $password)) {
                $errors[] = "Password must be at least 8 characters long and contain special characters";
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
            echo "<h3>Your information: </h3>";
            echo "<ul>";
            echo "<li>Name: $name</li>";
            echo "<li>Age: $age</li>";
            echo "<li>Address: $address</li>";
            echo "<li>Phone: $phone</li>";
            echo "<li>Job: $job</li>";
            echo "<li>Email: $email</li>";
            echo "<li>Password:  " . str_repeat('*', strlen($password)) . "</li>";
            echo "</ul>";
        }
    }
    ?>
</body>

</html>