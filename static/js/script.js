$(function () {
    var port = 3009

    // /* add user au clic**/
  //  $('#afficher').click(function (e) {
      //  e.preventDefault;
        /* Find au clic**/
        $.ajax({
            url: 'http://localhost:' + port + '/find',
            type: 'GET',
            success: function (data) {
                $('#list').html('');
                $.each(data, function (i, d) {
                    $('#list').append('<li class="list-group-item">Nom : ' + d.name + ' | Genre : ' + genre(d.genre) + ' <button class="put btn btn-secondary btn-sm" id=' + d._id + '> Modifier </button> <button class="del btn btn-danger btn-sm" id=' + d._id + '> X </button></li>');
                });
                /* del user au clic**/
                $('button.del').click(function () {   
                    // e.preventDefault;                   
                    var id = $(this).attr('id');
                   // console.log("id",id);
                    const nom = $('#name').val();
                    const genre = $('#genre').val();
                    $.ajax({
                        url: 'http://localhost:' + port + '/personne/' + id,
                        type: 'DELETE',
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
            },
            error: function (e) {
                console.error("erreur :", e);
            }
        });
  //  });

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
    // $('a.bouton').click(function (e) {
    //     e.preventDefault;
    //     console.log("id");
    //     var id = $(this).attr('id');
    //     alert(id);
    //     const nom = $('#name').val();
    //     const genre = $('#genre').val();
    //     $.ajax({
    //         url: 'http://localhost:' + port + '/del' + id,
    //         type: 'POST',
    //         data: {
    //             nom: nom,
    //             genre: genre
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             // location.reload();
    //         },
    //         error: function (e) {
    //             console.error("erreur :", e);
    //         }
    //     });
    // });
});



function genre(g) {
    if (g == "m") {
        return "Masculin";
    } else {
        return "Féminin";
    }
}