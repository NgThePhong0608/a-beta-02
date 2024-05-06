<!DOCTYPE html>
<html>

<head>
    <title>Notify Email</title>
</head>

<body>
    <h2>Dear {{ $user['name'] }}</h2>
    <br />
    Your password has been reset to default by admin. You can login to system now.
    <br />
    <a href="{{ url('login') }}">Login here !</a>
</body>

</html>
