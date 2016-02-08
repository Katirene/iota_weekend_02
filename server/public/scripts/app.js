var people;
var personIndex = 9;

$(document).ready(function() {
    getData();
    $('#previous').on('click', function () {
        console.log("previous");
        if (personIndex > 0) {
            personIndex--;
        }
        update();
    });
    $('#next').on('click', function () {
        console.log("next");
        if (personIndex < people.length -1 ) {
            personIndex++;
        }
        update();
    });

    function update() {
        var currentPerson = people[personIndex];
        $('.person-name').fadeOut('slow').html(currentPerson.name).fadeIn("slow");
        $('.person-favoriteMovie1').fadeOut('slow').html(currentPerson.favoriteMovie1).fadeIn("slow");
        $('.person-favoriteMovie2').fadeOut('slow').html(currentPerson.favoriteMovie2).fadeIn("slow");
        $('.person-favoriteSong').fadeOut('slow').html(currentPerson.favoriteSong).fadeIn("slow");
        $('.pagination li').removeClass('active');
        $('#' + personIndex).addClass("active");

        //console.log($('#peopleContainer').data());
    };

    function getData() {
        $.ajax({
            type: "GET",
            url: "/data",
            success: function (data) {
                console.log(data);
                people = data.people;
                for( var i = 0; i < people.length; i++ ) {
                    $('#next').before('<li id="' + i + '" data-id="' + i + '"><a class="page" href="#">' + (i + 1) + '</a></li>');
                }
                for( var j = 0; j < people.length; j++ ) {
                    $('#peopleContainer').data('person-id', j);
                }

                $('.page').on('click', function() {
                    console.log('button!');
                    personIndex = $(this).parent().data('id');

                    update();
                });

                update();


            },
            error: function () {
                console.log('ERROR: Unable to contact the server.');
            }

        });
    }
});
    //$('p.person-name').replaceWith('<p class="person-name"></p>');




