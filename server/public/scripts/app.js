var people;
var personIndex = 9;
//var dataitem;

$(document).ready(function() {
    getData();
    $('#previous').on('click', function () {
        console.log("previous");
        progressLeft();
        update();
    });
    $('#next').on('click', function () {
        console.log("next");
        progressRight();
        update();
    });

    function update() {
        var currentPerson = people[personIndex];
        $('.person-name').stop(true, true).fadeOut('slow').html(currentPerson.name).stop(true, true).fadeIn("slow");
        $('.person-favoriteMovie1').stop(true, true).fadeOut('slow').html(currentPerson.favoriteMovie1).stop(true, true).fadeIn("slow");
        $('.person-favoriteMovie2').stop(true, true).fadeOut('slow').html(currentPerson.favoriteMovie2).stop(true, true).fadeIn("slow");
        $('.person-favoriteSong').stop(true, true).fadeOut('slow').html(currentPerson.favoriteSong).stop(true, true).fadeIn("slow");
        $('.pagination li').removeClass('active');
        //dataitem = $(this).data('id');
        //console.log(dataitem);
        //$('ul li.' + dataitem).addClass('active');
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
                //for( var j = 0; j < people.length; j++ ) {
                  //  $('#peopleContainer').data('person-id', j);
                //}

                $('.page').on('click', function() {
                    console.log('button!');
                    var oldPersonIndex = personIndex
                    personIndex = $(this).parent().data('id');
                    if (oldPersonIndex != personIndex) {
                        update();
                    }
                });

                update();


            },
            error: function () {
                console.log('ERROR: Unable to contact the server.');
            }

        });
    }


function progressLeft() {
    personIndex--;
    if (personIndex < 0) {
        personIndex = (people.length - 1);
    }
};


    function progressRight() {
        personIndex++;
        if (personIndex == (people.length - 1)) {
            personIndex = 0;
        }
    };


});
    //$('p.person-name').replaceWith('<p class="person-name"></p>');




