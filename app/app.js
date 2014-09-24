function app() {
    $(".iconBox").hover(
        function() {
            var hoverClassName = $(this).attr('class');
            if (hoverClassName === 'call iconBox') {
                $('.linkDescription')[0].textContent = 'call me';
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
}

window.onload = app;
