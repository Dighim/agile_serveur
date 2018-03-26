var desc = false;
var currentUser;
var log;
var pseudo;
var id;
var Lpublic = true;

function getUser(name) {
	getUserGeneric(name, "v1/user/");
}

function getUserGeneric(name, url) {
	$.getJSON(url + name, function(data) {
		//afficheUser(data);
	});
}

function login() {
	getWithAuthorizationHeader("v1/login", function(data){
		console.log(data);
		currentUser = data;
		id = currentUser.id;
		pseudo = currentUser.pseudo;
		$("#table").show();
		$("#reponse").text("");
		$("#connect").hide();
		$("table").show();
		document.getElementById('gotoins').innerHTML = "Profil";
		document.getElementById('gotoconnect').innerHTML = "Déconnexion";
		document.getElementById('gotoins').id = 'gotoprof';
		document.getElementById('gotoconnect').id = 'exit';
		$("#gotoprof").off("click");
		$("#gotoprof").click(function (){
			if(!desc) {
				$('<div id="description"><div id="avatar"><img src="photoProfil.jpg" alt="Avatar"></div><div id="info">User: '+log+'<br>Pseudo: '+pseudo+'</div></div>').appendTo($("body"));
				desc = true;
			}
		});
		$("#exit").off("click");
		$("#exit").click(function() {
			document.location.href="/";
		});
		//afficheUser(data);
	});
}


function getWithAuthorizationHeader(url, callback) {
	if($("#userlogin").val() != "") {
		$.ajax
		({
			type: "GET",
			url: url,
			dataType: 'json',
			beforeSend : function(req) {
				req.setRequestHeader("Authorization", "Basic " + btoa($("#userlogin").val() + ":" + $("#passwdlogin").val()));
				log = $("#userlogin").val();

			},
			success: callback,
			error : function(jqXHR, textStatus, errorThrown) {
				$("#reponse").text("Mauvais utilisateur / mot de passe");
			}
		});
	} else {
		$.getJSON(url, function(data) {
			//afficheUser(data);
		});
	}
}

function postUser(user, pseudo, pwd) {
	postUserGeneric(user, pseudo, pwd, 'v1/user/')
}

function postUserGeneric(user, pseudo, pwd, url) {
	console.log("postUserGeneric " + url)
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"user" : user,
			"pseudo" : pseudo,
			"password" : pwd,
			"id" : 0
		}),
		success : function(data, textStatus, jqXHR) {
			$("#ins").hide();
			$("#connect").show();
			$("#reponse").text("");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$("#reponse").text("L'utilisateur "+user+ " existe déjà.");
		}
	});
}

function listUsers() {
	listUsersGeneric("v1/user/");
}

function listUsersGeneric(url) {
	$.getJSON(url, function(data) {
		afficheListUsers(data)
	});
}

function afficheUser(data) {
	console.log(data);
	$("#reponse").html(userStringify(data));
}

function showCrea(crea, callback, idTable){
	$.getJSON("v1/user/", function(data) {
		for (index = 0; index < data.length; ++index) {
			if(data[index].id == crea){ 
				callback(data[index].pseudo, idTable);
			}
		}
	});
}

function afficheListUsers(data) {
	var ul = document.createElement('ul');
	ul.className = "list-group";
	var index = 0;
	for (index = 0; index < data.length; ++index) {
		var li = document.createElement('li');
		li.className = "list-group-item";
		li.innerHTML = userStringify(data[index]);
		ul.appendChild(li);
	}
	$("#reponse").html(ul);
}

function userStringify(user) {
	return user.id + ". " + user.pseudo + " &lt;" + " (" + user.user + ")";
}

function postTable(intitule, public, duree, lieu, date,heure , nbPers) {
	postTableGeneric(intitule, "privé", duree, lieu, date, heure, nbPers, 'v1/table/')
}

function postTableGeneric(intitule, public, duree, lieu, date, heure, nbPers, url) {
	var currentdate = new Date();
	var dateTab = date.split("/");
	var year = dateTab[2];
	var month = dateTab[1];
	var day = dateTab[0];
	var localDate = year+'-'+month+'-'+day+"T"+ heure + ":00Z";
	console.log("Date: " + localDate);
	console.log("Nombre personnes :"+nbPers);
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"id" : 0,
			"intitule" : intitule,
			"public" : public,
			"duree" : duree,
			"lieu" : lieu,
			"date" : localDate,
			"nbPers" : nbPers,
			"crea" : id
		}),
		success : function(data, textStatus, jqXHR) {
			$("#createTable").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$("#reponse").text("La table "+intitule+ " existe déjà.");
		}
	});
}

function listTables() {
	listTablesGeneric("v1/table/");
}

function listTablesGeneric(url) {
	$.getJSON(url, function(data) {
		afficheListTables(data)
	});
}

function afficheTable(data) {
	console.log(data);
	$("#reponse").html(tableStringify(data));
}

function afficheListTables(data) {
	console.log("AfficheListTables length:"+ data.length);
	var index = 0;
	var html = "<div><button class='btn btn-default gotocreateTable'>Créer Table</button><table class=\"table table-bordered\"><tr><th>Titre</th><th>Créateur</th><th>Type</th><th>Jeu</th><th>Durée</th><th>Date</th><th>Heure</th><th>Lieu</th><th>Etat</th><th>Joueurs</th></tr>";
	for (index = 0; index < data.length; ++index) {
		console.log("Boucle "+index);
		html += "<tr>"+tableStringify(data[index])+"</tr>";
		showCrea(data[index].crea, function(creaPseudo, idTable){
			$('#user'+idTable).text(creaPseudo);
		});
	}
	$("body").append(html);
	$(".gotocreateTable").click(function (){
		console.log("gotocreatetable");
		$("body>div").hide();
		$("#createTable").show();
	});
	$('.afficheTable').click(function(event){
		var idT = event.target.id;
		console.log(event.target.id);
		$.getJSON("/v1/table/"+idT, function(data) {
			afficheTableDetails(data);
		})
	});
}

function tableStringify(table) {
	console.log(table);
	var tab ="<td><a href=# class='afficheTable' id="+table.idTable+">" + table.intitule + "</a></td><td id=user"+table.id+"></td><td>{Type}</td><td>{Jeu}</td><td>" + table.duree + "  </td><td>" + table.date.replace("T","</td><td>").replace(":00Z","") + "  </td><td> "+ table.lieu+"</td><td>"+((table.public==0) ? "public" : "prive")+"</td><td>0/" + table.nbPers+ "</td>";
	return tab;
}

function inscription(idUser, idTable){
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : "/table/"+idTable,
		dataType : "json",
		data : JSON.stringify({
			"idUser" : idUser,
			"idTable" : idTable
		}),
		success : function(data, textStatus, jqXHR) {
			//message succes
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//message echec
		}
	});
}

function afficheTableDetails(table){
	$("body").append("<div id='afficheUneTable' class='jumbotron p-3 p-md-5 text-white bg-dark'><br><br><div><button id='inscription' class='btn btn-default'>S'inscrire</button><table class='table table-bordered'><tr><td>Intitule: "+table.intitule+"</td> <td><p style='text-align:center'>Id: "+table.id+"</p> </td></tr> <tr> <td rowspan='5' style='vertical-align:middle'><center><p>Liste des joueurs</p></center></td><td>Lieu: "+table.lieu+"</td> </tr> <tr> <td>Date: "+table.date.replace("T"," à ").replace(":00Z","")+"<br></td></tr> <tr><td>Durée: "+table.duree+"</td></tr><td>Joueurs max: "+table.nbPers+"<br></td><tr><td>"+((table.public==0) ? "public" : "prive")+"</td></tr></table></div>");
}