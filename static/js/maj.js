$(function () {
    var port = 3009
/* Find au chargement**/
    $.ajax({
        url: 'http://localhost:' + port + '/find',
        type: 'GET',
        success: function (data) {
            $('#list').html();
            $.each(data, function (i, d) {
                $('#list').append('<div><a href="#" id=id_'+d._id+'> '+d._id+'</a> - Nom : ' + d.name + ' | Genre : ' + genre(d.genre) + '</div>');
            });
        },
        error: function (e) {
            console.error("erreur :", e);
        }
    });


/* maj user au clic**/
    $('#maj').click(function () {
        const _id = $('#_id').val();
        const nom = $('#name').val();
        const genre = $('#genre').val();
        $.ajax({
            url: 'http://localhost:' + port + '/personne/'+_id,
            type: 'POST',
            data: {
                _id: _id,
                nom: nom,
                genre: genre
            },
            success: function (data) {
                console.log(data);
                // location.reload();
            },
            error: function (e) {
                console.error("erreur :", e);
            }
        });
    });
});

function genre(g) {
    if (g == "m" || g == "M") {
        return "Masculin";
    } else {
        return "Féminin";
    }
}