$(function () {
    // $('#btn').click(function () {
    $.ajax({
        url: 'http://localhost:3009/find',
        type: 'GET',
        success: function (data) {
             $.each(data, function (i, d) {
                $('#personnages').append('<div>Nom : '+d.name+'</div>');

                $('#personnages').append('<div>Genre : '+genre(d.genre)+'</div>');
             });
        },
        error: function (e) {
            console.error("erreur :", e);
        }
    });
    // });
});

function genre(g){
    if(g == "m"){
        return "Masculin";
    }else{
        return"Féminin";
    }
}