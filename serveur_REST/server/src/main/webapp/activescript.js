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
			$("#public").val(), 
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

    $("#gotoprof").click(function(){
        console.log("progils1");
        $("body>div").hide();
		$("#connect").show();        
        console.log("profils");
    });
