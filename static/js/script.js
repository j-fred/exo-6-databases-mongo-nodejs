$(function () {
    var port = 5009
    /* Find au chargement**/
    $.ajax({
        url: 'http://localhost:' + port + '/find',
        type: 'GET',
        success: function (data) {
            $('#list').html();
            $.each(data, function (i, d) {
                $('#list').append('<div><a class="bouton" href="#" id=' + d._id + '> ' + d._id + '</a> Nom : ' + d.name + ' | Genre : ' + genre(d.genre) + '<a href="personne/' + d._id + '" id=' + d._id + '> ( X Supprimer ) </a></div>');
            });
        },
        error: function (e) {
            console.error("erreur :", e);
        }
    });


    /* add user au clic**/
    $('#add').click(function () {
        const nom = $('#name').val();
        const genre = $('#genre').val();
        $.ajax({
            url: 'http://localhost:' + port + '/add',
            type: 'POST',
            data: {
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



    /* del user au clic**/
    $('a.bouton').click(function () {
        console.log("id");
        // e.preventDefault;
        var id = $(this).attr('id');
        alert(id);
        // const nom = $('#name').val();
        // const genre = $('#genre').val();
        // $.ajax({
        //     url: 'http://localhost:' + port + '/del' + id,
        //     type: 'POST',
        //     data: {
        //         nom: nom,
        //         genre: genre
        //     },
        //     success: function (data) {
        //         console.log(data);
        //         // location.reload();
        //     },
        //     error: function (e) {
        //         console.error("erreur :", e);
        //     }
        // });
    });
});



function genre(g) {
    if (g == "m") {
        return "Masculin";
    } else {
        return "Féminin";
    }
}