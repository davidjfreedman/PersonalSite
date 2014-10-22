function app() {
    //OPEN/CLOSE MENU
    $('.menuButton').on('click', function() {
        $('.rightMenu').toggleClass('menuOpenOn');
    });

    $('.body').click(function() {
        if ($('.menuOpen').hasClass('menuOpenOn')) {
            $('.menuOpen').removeClass('menuOpenOn');
        };
    }); // clicking outside the open menu closes it.

    //CLOSE MENU WHEN CLICK LINK
    $('.menuLink').on('click', function() {
        $('.menuOpen').removeClass('menuOpenOn');
    })

    $(window).resize(function() {
        if ($('.header').width() >= 900) {
            $('.menuOpen').removeClass('menuOpenOn');
        }
    }); // closes menu if window wide enough for topnav


    //OPEN/CLOSE JOB INFOBOXES
    $('.jobInfo').on('click', function() {
        //save class info to var
        //if var already open, closes var
        //if not:
        //removes 'on' class from all
        //adds 'on' to var
        var clickedClass = this.className;
        console.log(clickedClass)
        if ($(this).hasClass('jobInfoShowing')) {
            $(this).removeClass('jobInfoShowing');
        } else {
            $('.jobInfo').removeClass('jobInfoShowing');
            $(this).addClass('jobInfoShowing');
        }

    })
}

window.onload = app();
