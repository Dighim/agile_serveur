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
    var allFilled = true;
    var select = '#createTable input';
    var defaultBorder = $('#intitule').css("border");
    $(select).each(function(index, data){
        if($(this).val() == "") {
            $(this).css('border', 'solid 3px #cc0000');
            allFilled = false;
        }else $(this).css('border', defaultBorder);
    });
    if(allFilled){
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
    }
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
