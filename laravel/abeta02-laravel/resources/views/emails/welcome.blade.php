<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
</head>

<body>
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px; border: 1px solid #ddd;">
                <h2>Welcome to Our Website!</h2>
                <p>Hello {{ $user->name }},</p>
                <p>Welcome to our website! We're thrilled to have you on board.</p>
                <p>If you have any questions or need assistance, feel free to contact us.</p>
                <p>Best regards,<br>{{ config('app.name') }}</p>
            </td>
        </tr>
    </table>
</body>

</html>
