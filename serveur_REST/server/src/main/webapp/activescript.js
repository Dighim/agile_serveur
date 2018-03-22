$(document).ready(function() {
    $("#get").click(function () {
        getUser($('#user').val(), $('#alias').val())
    });
    $("#gotoins").click(function (){
        $("body>div").hide();
        $("#ins").show();

    });
    $("#gotoconnect").click(function (){
        $("body>div").hide();
        $("#connect").show();
    });
    $("#insbutton").click(function () {
        postUser(
            $('#user').val(),
            $('#lname').val(),
            $('#fname').val(),
            $('#passwd').val())});
    listUsers()
});
$("#connectbutton").click(function () {
    login();
});