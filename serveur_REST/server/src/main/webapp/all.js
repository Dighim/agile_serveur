var desc = false;
var user;
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
                $('<div id="description"><div id="avatar"><img src="photoProfil.jpg" alt="Avatar"></div><div id="info">User: <span>'+user+'</span></div></div>').appendTo($("body"));
                desc = true;
            }
		});
		$("#exit").off("click");
		$("#exit").click(function() {
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
		   user = $("#userlogin").val();
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

function postTable(intitule, public, duree, lieu, date, nbPers) {
	//console.log("Public :"+Lpublic);
    postTableGeneric(intitule, "privé", duree, lieu, date, nbPers, 'v1/table/')
}

function postTableGeneric(intitule, public, duree, lieu, date, nbPers, url) {
	console.log("Date: " + date)
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
			"date" : date,
			"nbPers" : nbPers
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
	$("body").append("<div><table class=\"table table-bordered\">");
	for (index = 0; index < data.length; ++index) {
		console.log("Boucle "+index);
		$("body").append("<tr>");
		$("body").append(tableStringify(data[index]));
		$("body").append("</tr>");
	}
	$("body").append("</table></div>");
}

function generateTables(){
	
}

function tableStringify(table) {
	console.log("Table: "+table);
	var tab ="<td>" + table.idTable + "  </td><td>" + table.intitule + "  </td><td>" + ((table.public) ? "public" : "privé") + "  </td><td>" + table.duree + "  </td><td>" + table.lieu + "  </td><td>" + table.date + "  </td><td>" + table.nbPers;
	return tab;
}