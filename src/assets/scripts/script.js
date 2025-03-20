
$(document).ready(function () {

    new WOW({
            animateClass: 'animate__animated',
        }
    ).init();


    $('.carousel').slick({
        // autoplay: true,
        autoplaySpeed: 4500,
        dots: false,
        speed: 600,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    $('.accordion').accordion({
        heightStyle: false,
    });


    let inputName = $('#inputName');
    let inputSecName = $('#inputSecName');
    let inputPhone = $('#inputPhone');
    let inputCountry = $('#inputCountry');
    let inputIndex = $('#inputIndex');
    let inputAddress = $('#inputAddress');


    //запрет ввода букв
    inputIndex.on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Отображаем блок с благодарностью
    function thanksBlock() {
        $('.order-form').hide();
        $('.thanks').show();

    }

    $('#formBtn').click(function () {

        if (!inputName.val() && !inputSecName.val() && !inputPhone.val() && !inputCountry.val() && !inputIndex.val() && !inputAddress.val()) {
            alert("Заполните все поля!");
            return;
        }
        if (!inputName.val()) {
            alert('Заполните Имя');
            return
        }
        if (!inputSecName.val()) {
            alert('Заполните Фамилию');
            return
        }
        if (!inputPhone.val()) {
            alert('Заполните Номер телефона');
            return
        }
        if (!inputCountry.val()) {
            alert('Заполните страну');
            return
        }
        if (!inputIndex.val()) {
            alert('Заполните Индекс');
            return
        }
        if (!inputAddress.val()) {
            alert('Заполните Адрес');
            return
        }

        thanksBlock()
    });

//PopUp
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }

    });


});
