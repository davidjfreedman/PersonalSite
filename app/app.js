function app() {



    //SPLASH SCREEN



    $(".iconBox").hover(
        function() {
            var hoverClassName = $(this).attr('class');
            if (hoverClassName === 'call iconBox') {
                $('.linkDescription').textContent = 'call me';
            } else if (hoverClassName === 'email iconBox') {
                $('.linkDescription')[0].textContent = 'email me';
            } else if (hoverClassName === 'download iconBox') {
                $('.linkDescription')[0].textContent = 'download my resume';
            } else if (hoverClassName === 'github iconBox') {
                $('.linkDescription')[0].textContent = 'check out my github';
            } else if (hoverClassName === 'linkedin iconBox') {
                $('.linkDescription')[0].textContent = 'view my linkedin';
            };
            // if $( this) ===
        },
        function() {
            $('.linkDescription')[0].textContent = 'hover for info';
        });
    $('.goto').hover(
        function() {
            $(this)[0].textContent = "Coming Soon";
        },
        function() {
            var hoverClassName = $(this).attr('class');
            if (hoverClassName === 'projectsButton goto') {
                $(this)[0].textContent = "Projects";
            } else if (hoverClassName === 'experienceButton goto') {
                $(this)[0].textContent = "Experience";
            } else if (hoverClassName === 'aboutButton goto') {
                $(this)[0].textContent = "About";
            };
        });




    //PROJECTS SECTION




    var projectsArray = [{
        name: "Affluentsy",
        image: "affluentsy.jpg",
        description: "Designed as a tongue-in-cheek blend of high-end retail sites and a the more hands-on Etsy, this project incorporates search engines, categorizing, sorting, and more.",
        liveLink: "http://shielded-lake-4499.herokuapp.com",
        gitSite: "https://github.com/davidjfreedman/FinalProject",
        tech: "jQuery, Javascript, Myth, lodash/underscore templating, FontAwesome, Photoshop, JS Prototypes, Node.js, Etsy API, heroku, HTML, CSS, CSS3"
    }, {
        name: "Color Clock",
        image: "colorclock.jpg",
        description: "It started as a clock where the time values shift the background color. It soon became... odder.",
        liveLink: "http://davidjfreedman.github.io/HW23-Dates/",
        gitSite: "https://github.com/davidjfreedman/HW23-Dates",
        tech: "Javascript, jQuery, HTML, CSS"
    }, {
        name: "Wat Watch",
        image: "watwatch.jpg",
        description: "A simple, normal stopwatch app.<br> Hmm. we'll have to do something about that 'normal' bit soon...",
        liveLink: "http://davidjfreedman.github.io/HW25-watwatch/",
        gitSite: "https://github.com/davidjfreedman/HW25-watwatch",
        tech: "Javascript, jQuery, HTML, CSS"
    }, ]
    for (var i = 1; i < projectsArray.length; i++) {
        var oneProj = projectsArray[i];
        var projHTML = '<div class="projectBox secondaryProjBoxes"><div class="projTopSection"><img class="projImage" src="../assets/images/projects/' + oneProj.image + '" /></div><div class="projBottomSection"><div class="projTitle">' + oneProj.name + '</div><div class="projDescription">' + oneProj.description + '</div><div class="projLinks"><a href="' + oneProj.liveLink + '"><div class="liveProjLink">LIVE SITE</div></a><a href="' + oneProj.gitSite + '"><div class="gitProjLink">CODE</div></a></div><div class="projTech"><p class="techTitle">Tech Used</p><p class="techText">' + oneProj.tech + '</p></div></div></div>';
        $('.projectsContent').append(projHTML);
    }
    // each object is the code inset for the projects page
    // on

    //HEADER ON/OFF

    $(window).scroll(function() {
        if (window.scrollY >= $('.splashScreen')[0].offsetHeight) {
            $('.header').addClass('headerOn');
        } else {
            $('.header').removeClass('headerOn');
        }
    });

    //OPEN/CLOSE MENU
    $('.menuButton').click(function() {
        $('.leftMenu').toggleClass('menuOpenOn');
    });

    $('.headerOutsideLinks').click(function() {
        $('.rightMenu').toggleClass('menuOpenOn');
    });

    $('.mask').click(function() {
        if ($('.menuOpen').hasClass('menuOpenOn')) {

            $('.leftMenu').removeClass('menuOpenOn');
            $('.rightMenu').removeClass('menuOpenOn');
        };
    }); // clicking outside the open menu closes it.

    $(window).resize(function() {
        if ($('.header').width() >= 900) {
            $('.leftMenu').removeClass('menuOpenOn');
        }
    }); // closes menu if window wide enough for topnav

    $('body').on('click', '.menuLink .topButton .headerLink', function() {
        $("html, body").animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 625);
    });


}

window.onload = app;
