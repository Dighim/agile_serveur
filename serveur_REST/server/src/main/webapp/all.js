var desc = false;
var user;
function getUser(name) {
	getUserGeneric(name, "v1/user/");
}

function getUserGeneric(name, url) {
	$.getJSON(url + name, function(data) {
		afficheUser(data);
	});
}

function login() {
	getWithAuthorizationHeader("v1/login", function(data){
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
	    afficheUser(data);
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
       			$("#connect p").show();
       		}
     });
     } else {
     $.getJSON(url, function(data) {
     	    afficheUser(data);
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