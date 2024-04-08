<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session - Cookie PHP</title>
</head>

<body>
    <h2>Login</h2>
    <form method="POST">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br>
        <input type="checkbox" name="remember_me"> Remember me<br>
        <input type="submit" name="login" value="Login">
    </form>

    <h2>Logout</h2>
    <form method="POST">
        <input type="submit" name="logout" value="Logout">
    </form>

    <?php
    session_start();
    if (isset($_SESSION['username'])) {
        echo "Welcome back, " . $_SESSION['username'];
    } elseif (isset($_COOKIE['remember_me'])) {
        $username = $_COOKIE['remember_me'];
        $_SESSION['username'] = $username;
        echo "Welcome back, " . $username;
    } else {
        echo "You are not logged in";
    }

    if (isset($_POST['login'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        if ($username === 'admin' && $password === 'password') {
            $_SESSION['username'] = $username;
            echo "Login successful!";
            if (isset($_POST['remember_me'])) {
                setcookie('remember_me', $token, time() + (86400 * 15 * 30), "/"); // 86400 = 1 day
            }
        } else {
            echo "Invalid username or password";
        }
    }

    if (isset($_POST['logout'])) {
        session_unset();
        session_destroy();
        setcookie('remember_me', '', time() - 3600, "/");
        echo "Logged out successfully!";
    }
    ?>
</body>

</html>