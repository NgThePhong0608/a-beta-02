<!DOCTYPE html>
<html>

<head>
    <title>Welcome Email</title>
</head>

<body>
    <section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <header>
            <a href="{{ route('login') }}">
                <img class="w-auto h-7 sm:h-8" src="http://localhost:8000/storage/hrm.png" alt="">
            </a>
        </header>

        <main class="mt-8">
            <h2 class="text-gray-700 dark:text-gray-200">Welcome to the site {{ $user['name'] }},</h2>

            <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                Your registered email-id is {{ $user['email'] }} , Please click on the below link to verify your email
                account
            </p>

            <a class="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                {{-- <a href="{{ url('user/verify', $user->verifyUser->token) }}">Verify Email</a> --}} <a href="{{ $verificationUrl }}">Verify Email</a>
            </a>
            <p>This link will expire in 60 minutes.</p>

            <p class="mt-8 text-gray-600 dark:text-gray-300">
                Thanks, <br>
                HRM team
            </p>
        </main>


        <footer class="mt-8">
            <p class="text-gray-500 dark:text-gray-400">
                This email was sent from <a href="#" class="text-blue-600 hover:underline dark:text-blue-400"
                    target="_blank">hrm@hrm.com</a>.
            </p>

            <p class="mt-3 text-gray-500 dark:text-gray-400">© <?php echo date('Y'); ?> HRM System. All Rights
                Reserved.</p>
        </footer>
    </section>
</body>

</html>
