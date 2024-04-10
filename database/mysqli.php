<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbName = "user_management";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error) . "<br/>";
}
echo "Connected successfully" . "<br/>";

// Create new table 
$sql = "CREATE TABLE guests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
if ($conn->query($sql) === TRUE) {
    echo "Table guests created successfully" . "<br/>";
} else {
    echo "Error creating table: " . $conn->error . "<br/>";
}

// Insert data
$sql = "INSERT INTO guests (firstname, lastname, email)
VALUES ('Erik', 'ten Hag', 'erik@mu.com'),
    ('Mikel', 'Arteta', 'mikel@ars.com'),
    ('Pep', 'Guardiola', 'pep@mc.com')
";

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo "New record created successfully. Last inserted ID is: " . $last_id . "<br/>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error . "<br/>";
}


// prepare and bind

$stmt = $conn->prepare("INSERT INTO guests (firstname, lastname, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $firstname, $lastname, $email);

// set parameters and execute
$firstname = "Jugen";
$lastname = "Klopp";
$email = "klopp@lvp.com";
$stmt->execute();
$stmt->close();

$sql = "SELECT id, firstname, lastname FROM guests";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["id"] . "</td><td>" . $row["firstname"] . " " . $row["lastname"] . "</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 results";
}

$sql = "SELECT id, firstname, lastname FROM guests WHERE lastname='ten Hag'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"] . " - Name: " . $row["firstname"] . " " . $row["lastname"] . "<br>";
    }
} else {
    echo "0 results";
}

$sql = "SELECT id, firstname, lastname FROM guests ORDER BY lastname DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"] . " - Name: " . $row["firstname"] . " " . $row["lastname"] . "<br>";
    }
} else {
    echo "0 results";
}
// delete data
$sql = "delete from guests";
if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully" . "<br/>";
} else {
    echo "Error deleting record: " . $conn->error . "<br/>";
}

$conn->close();
