<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <form action="{{ route('register') }}" method="POST">
        @csrf
        <input type="text" name="name">
        <input type="text" name="surname">
        <input type="email" name="email">
        <input type="password" name="password">
        <button type="submit">Gönder</button>
    </form>

</body>

</html>
