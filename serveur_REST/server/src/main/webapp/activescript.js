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
			$('#passwd').val())
	});
	$("#addTable").click(function () {
		postTable(
			$("#intitule").val(),
			$("#public").is(":checked"), 
			$("#duree").val(),
			$("#lieu").val(),
			$("#date").val(),
            $("#heure").val(),
			$("#nbPers").val()
		, function(){
			listTables()
		});
	});
	$("#connectbutton").click(function () {
		login();
	});

	$("#gotoallTables").click(function(){
		$("body>div").hide();
		listTables();
	});
	
	$("#testins").click(function (){
		
	});
});
