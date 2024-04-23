<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAX Example with jQuery</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <div id="result"></div>

    <button id="loadData">Load Data</button>

    <script>
        $(document).ready(function() {
            $("#loadData").click(function() {
                $.ajax({
                    url: "https://api.joind.in/v2.1/events",
                    type: "GET",
                    dataType: "json",
                    success: function(data) {
                        $("#result").html("");
                        console.log(data);
                        $.each(data.events, function(index, element) {
                            $("#result").append("<p>" + element.name + "</p>");
                            $("#result").append("<p>" + element.url_friendly_name + "</p>");
                            $("#result").append("<p>" + element.start_date + "</p>");
                            $("#result").append("<p>" + element.end_date + "</p>");
                            $("#result").append("<p>" + element.description + "</p>");
                            $("#result").append("<p>" + element.tz_place + "</p>");
                            $("#result").append("<p>" + element.tz_continent + "</p>");
                            $("#result").append("<p>" + element.attendee_count + "</p>");
                            $("#result").append("<p>" + element.talks_count + "</p>");
                            $("#result").append("<p>" + element.location + "</p>");
                            $("#result").append("<hr />");
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log("Error: " + textStatus, errorThrown);
                    }
                });
            });
        });
    </script>

</body>

</html>