$(document).ready(function() {
    $("#get").click(function () {
        getUser($('#user').val(), $('#alias').val());
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
            $('#pseudo').val(),
            $('#passwd').val())});
    //listUsers();
	$("#addTable").click(function () {
   	postTable(
			$("#intitule").val(),
			$("#public").val(), 
			$("#duree").val(),
			$("#lieu").val(),
			$("#date").val(),
			$("#nbPers").val()
	);
	});
});
$("#connectbutton").click(function () {
    login();
});
