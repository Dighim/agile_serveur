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
        $("#exit").off("click");
        $("#exit").click(function() {
            document.location.href="/";
        });
        $("#gotoprof").click(function(){
            $("body>div").hide();
            afficheProfil();

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


function afficheProfil(){
    $('<div id="description"><div id="avatar"><img src="photoProfil.jpg" alt="Avatar"></div><div id="info">User: '+log+'<br>Pseudo: '+pseudo+'</div></div>').appendTo($("body"));

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

function putTable(idT, intitule, public, duree, lieu, date,heure , nbPers, etat, callback) {
    putTableGeneric(idT, intitule, public, duree, lieu, date, heure, nbPers, etat, callback)
}

function putTableGeneric(idT, intitule, public, duree, lieu, date, heure, nbPers, etat, callback) {
    var currentdate = new Date();
    var dateTab = date.split("/");
    var year = dateTab[0];
    var month = dateTab[1];
    var day = dateTab[2];
    var localDate = year+'-'+month+'-'+day+"T"+ heure + ":00Z";
    console.log("Date: " + localDate);
    console.log("Nombre personnes :"+nbPers);
    $.ajax({
        type : 'PUT',
        contentType : 'application/json',
        url : "/v1/table/"+idT,
        dataType : "json",
        data : JSON.stringify({
            "id" : 0,
            "intitule" : intitule,
            "publique" : (public)?1:0,
            "duree" : duree,
            "lieu" : lieu,
            "date" : localDate,
            "nbPers" : nbPers,
            "crea" : id,
            "etat" : etat
        }),
        success : function(data, textStatus, jqXHR) {
            $("#modifTable").hide();
            callback();
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $("#reponse").text("Erreur modif table");
        }
    });
}

function postTable(intitule, public, duree, lieu, date,heure , nbPers, callback) {
    postTableGeneric(intitule, public, duree, lieu, date, heure, nbPers, 'v1/table/', callback)
}

function postTableGeneric(intitule, public, duree, lieu, date, heure, nbPers, url, callback) {
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
            "intitule" : intitule,
            "publique" : (public)?1:0,
            "duree" : duree,
            "lieu" : lieu,
            "date" : localDate,
            "nbPers" : nbPers,
            "crea" : id,
            "etat" : -1
        }),
        success : function(data, textStatus, jqXHR) {
            $("#createTable").hide();
            callback();
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
	var html = "<div id='afficheTable'><button class='btn btn-default gotocreateTable'>Créer Table</button><table class=\"table table-bordered\"><tr><th>Titre</th><th>Créateur</th><th>Type</th><th>Jeu</th><th>Durée</th><th>Date</th><th>Heure</th><th>Lieu</th><th>Etat</th><th>Joueurs</th><th>Visibilité</th></tr>";
	for (index = 0; index < data.length; ++index) {
		console.log("Boucle "+index);
		html += "<tr>"+tableStringify(data[index])+"</tr>";
		showCrea(data[index].crea, function(creaPseudo, idTable){
			$('#user'+idTable).text(creaPseudo);
		}, data[index].idTable);
		getNbIns(data[index]);
	}
	$("#afficheTable").remove();
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

function stateStringify(state){
	switch(state){
		case -1:return "En attente de jouer";
		case 0:return "En cours";
		case 1:return "Terminée";
	}
	return "Incorrecte";
}

function tableStringify(table) {
    console.log(table);
    var tab ="<td><a href=# class='afficheTable' id="+table.idTable+">" + table.intitule + "</a></td><td id=user"+table.idTable+"></td><td>{Type}</td><td>{Jeu}</td><td>" + table.duree + "  </td><td>" + table.date.replace("T","</td><td>").replace(":00Z","") + "  </td><td> "+ table.lieu+"</td><td>"+stateStringify(table.etat)+"</td><td id='nbIns"+table.idTable+"'></td><td>"+((table.publique==1) ? "Publique" : "Privée")+"</td>";
    return tab;
}

function getNbIns(table){
	$.ajax({
		type : 'GET',
		contentType : 'application/json',
		url : "/v1/table/"+table.idTable+"/ins",
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			if(data == table.nbPers){
				$('#nbIns'+table.idTable).css("background-color","red");
			}
			else if(data > (table.nbPers/2)){
				$('#nbIns'+table.idTable).css("background-color","orange");
			}
			else{
				$('#nbIns'+table.idTable).css("background-color","green");
			}
			$('#nbIns'+table.idTable).text(data+"/"+ table.nbPers);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log("erreur");
		}
	});
}


function inscription(idTable){
    var dif=$("#nbIns"+idTable).text();
    var s=dif.split("/",2);
    if(s[0]!=s[1]){
        console.log("idT; "+idTable);
        $.ajax({
            type : 'POST',
            contentType : 'application/json',
            url : "/v1/table/"+idTable+"/ins/"+id,
            dataType : "json",
            success : function(data, textStatus, jqXHR) {
                console.log("inscription succeed");
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("inscription failed");		}
        });
    }
}

function afficheTableDetails(table){
    $("#afficheUneTable").remove();
    $("body").append("<div id='afficheUneTable' class='jumbotron p-3 p-md-5 text-white bg-dark'><br><br><div><button id='inscription' class='btn btn-default'>S'inscrire</button>"+modif(table)+deleteTab(table)+"<button id='fermer' class='btn btn-default'>Fermer</button><table class='table table-bordered'><tr><td>Intitule: "+table.intitule+"</td> <td id='changeState'></td></tr> <tr> <td rowspan='5' style='vertical-align:middle'><center id='afficheListe'></center></td><td>Lieu: "+table.lieu+"</td> </tr> <tr> <td>Date: "+table.date.replace("T"," à ").replace(":00Z","")+"<br></td></tr> <tr><td>Durée: "+table.duree+"</td></tr><td>Joueurs max: "+table.nbPers+"<br></td><tr><td>"+((table.public==0) ? "public" : "prive")+"</td></tr></table></div>");
    showProgressState(table);
    listerJoueurs(table);
    $("#inscription").click(function(){
		inscription(table.idTable);
		$("#afficheUneTable").remove();
		listTables();
	});
    $("#modification").click(function(){
        $("body>div").hide();
        afficheModifTable(table);
    });
    $("#deleteTab").click(function(){
		deleteTable(table.idTable);
		$("#afficheUneTable").remove();
		listTables();
	});
    $("#fermer").click(function(){
        $("#afficheUneTable").hide();
    });
	if(table.etat == 1){
		$("#inscription").remove();
	}
}

function showProgressState(table){
    $('#changeState').html("");
    if(id == table.crea){
        switch(table.etat){
            case -1:
                $('#changeState').html("<a href='#' style='text-align:center'>Lancer la partie</a>");
                $('#changeState a').click(function(e){
                    changeState(table.etat, table.idTable);
                    showProgressState(table);
                });
                break;
            case 0:
                $('#changeState').html("<a href='#' style='text-align:center'>Terminer la partie</a>");
                $('#changeState a').click(function(e){
                    changeState(table.etat, table.idTable);
                    showProgressState(table);
                });
                break;
            case 1:
                $('#changeState').text("Terminée");
                break;
        }
    }else {
        $('#changeState').text(stateStringify(table.etat));
    }
}

function changeState(tableState, idTable){
    var newState = (tableState+1 == 2)?2:tableState+1;
    $.ajax({
        type : 'PUT',
        contentType : 'application/json',
        url : "/v1/table/"+idTable+"/etat/"+newState,
        dataType : "json",
        success : function(data, textStatus, jqXHR) {
            listTables();
            afficheTableDetails(table);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log("erreur");
        }
    });
}

function modif(table){
    console.log(table.etat);
    console.log(id);
    if(table.crea==id && table.etat != 1){
        return "<button id='modification' class='btn btn-default'> Modifier </button>";
    }
    else{
        return ""
    }
}

function deleteTab(table){
    console.log(table.crea);
    console.log(id);
    if(table.crea==id){
        return "<button id='deleteTab' class='btn btn-default'>Supprimer</button>";
    }
    else{
        return ""
    }
}

function listerJoueurs(table){
    var list;
    $.ajax({
        type : 'GET',
        contentType : 'application/json',
        url : "/v1/table/"+table.idTable+"/users",
        dataType : "json",
        success : function(data, textStatus, jqXHR) {
            list = "<ul>";
            for(var i=0; i<data.length; i++){
                console.log("user: "+data[i].pseudo);
                list = list + "<li>" + data[i].pseudo + "</li>";
            }
            list = list + "</ul>";
            $("#afficheListe").html(list);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log("erreur");
        }
    });
}

function deleteTable(idTable){
    console.log("idTable: "+idTable);
    $.ajax({
        type : 'DELETE',
        contentType : 'application/json',
        url : "/v1/table/"+idTable,
        dataType : "json",
        success : function(data, textStatus, jqXHR) {
            console.log("table deleted");
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log("error delete table");
        }
    });
}

function afficheModifTable(table){
    $("#createTable").hide();
    $("#modifTable").remove();
    $("body").append("<div id='modifTable' class='jumbotron p-3 p-md-5 text-white bg-dark'> <br><br> <table class='table table-bordered'><tr> <td> Intitulé : <input type='text' id='intitule' value='"+table.intitule+"'> </td><td><p style='text-align:center'>Id:"+table.idTable+"</p></td></tr><tr><td rowspan='5' style='vertical-align:middle'><center><p>Liste des joueurs</p></center></td><td> Lieu : <input type='text' id='lieu' value='"+table.lieu+"'></td> </tr> <tr> <td>Date : <input type='date' id='date' value='"+table.date.split("T")[0]+"'>Heure : <input type='time' id='heure' value='"+table.date.split("T")[1].replace("Z","")+"'><br></td></tr><tr><td>Duree :  <input type='text' id='duree value='"+table.duree+"'></td> </tr><td>nbr de joueurs max :<input type='text' id='nbPers' value='"+table.nbPers+"'><br></td><tr><td>Publique <input type='checkbox' id='public' name='public' checked></td></tr>  </table> <center><button id='modifTab' class='btn btn-default'>Modifier Table</button></center></div>");
    $("#modifTab").click(function(){
        console.log("Lieu: "+ $("#lieu").text);
        putTable(
            table.idTable,
            $("#intitule").val(),
            $("#public").is(":checked"), 
            $("#duree").val(),
            $("#lieu").val(),
            $("#date").val(),
            $("#heure").val(),
            $("#nbPers").val(),
            table.etat
            , function(){
                listTables();
            });
    });
}
