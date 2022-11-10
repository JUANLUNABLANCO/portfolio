/* ********** Menu ********** */
((d) => {
    const $btnMenu = d.querySelector('.menu-btn'),
        $menu = d.querySelector('.menu');

    $btnMenu.addEventListener('click', (e) => {
        $btnMenu.firstElementChild.classList.toggle('none');
        $btnMenu.lastElementChild.classList.toggle('none');
        $menu.classList.toggle('is-active');
    });

    d.addEventListener('click', (e) => {
        if (!e.target.matches('.menu a')) return false;

        $btnMenu.firstElementChild.classList.remove('none');
        $btnMenu.lastElementChild.classList.add('none');
        $menu.classList.remove('is-active');
    });
})(document);
/* ********** Menu ***************** */
/* ********** language and flags ************* */
((d) => {
    var form_dictionary = {
        en: {
            username: 'Your full name',
            email: 'Your contact email *',
            message: 'Leftme your message, please *',
        },
        es: {
            username: 'Tu nombre',
            email: 'Tu mejor email *',
            message: 'Déjame tu mensaje... *',
        },
    };
    var username = d.querySelector('.username-input');
    var email = d.querySelector('.email-input');
    var message = d.querySelector('.message-input');

    var lang = d.getElementById('selected_lang');

    function selectedOption() {
        var options_array = Array.from(d.querySelector('#selected_lang').options);
        console.log(options_array);
        var index_selected = d.querySelector('#selected_lang').selectedIndex;
        console.log(index_selected);

        updateSelect(options_array, index_selected);
    }

    function updateSelect(options_array, index_selected) {
        let languages = ['en', 'es'];
        let flags = d.querySelectorAll('.flag');
        // let flag_selected = flags.querySelector('.flag--' + languages[index_selected]);
        let optionSelected = d.querySelector('#selected_lang').options[index_selected];
        options_array.forEach(function(item) {
            item.removeAttribute('selected');
        });
        optionSelected.setAttribute('selected', 'selected');

        // $('.item-lang[lang=en]').fadeIn(1500);
        // $('.item-lang[lang=es').hide();
        switch (languages[index_selected]) {
            case 'en':
                // banderas remove .active
                flags.forEach(function(item) {
                    item.classList.remove('active');
                });
                // banderas add .active
                d.querySelector('.flag--en').classList.add('active');
                // ocultar idiomas que no han sido seleccionados
                let allOthersItemsEn = d.querySelectorAll(".item-lang[lang='es']");
                fadeOut(allOthersItemsEn, 10);
                // mostrar los que si
                let allItemsLanguageEn = d.querySelectorAll(".item-lang[lang='en']");
                fadeIn(allItemsLanguageEn, 10);
                // inputs y textarea changes
                username.setAttribute('placeholder', form_dictionary.en.username);
                email.setAttribute('placeholder', form_dictionary.en.email);
                message.setAttribute('placeholder', form_dictionary.en.message);

                break;

            case 'es':
                // banderas remove .active
                flags.forEach(function(item) {
                    item.classList.remove('active');
                });
                // banderas add .active
                d.querySelector('.flag--es').classList.add('active');
                // ocultar idiomas que no han sido seleccionados
                let allOthersItemsEs = d.querySelectorAll(".item-lang[lang='en']");
                fadeOut(allOthersItemsEs, 10);
                // mostrar los que si
                let allItemsLanguageEs = d.querySelectorAll(".item-lang[lang='es']");
                fadeIn(allItemsLanguageEs, 10);
                // inputs y textarea changes
                username.setAttribute('placeholder', form_dictionary.es.username);
                email.setAttribute('placeholder', form_dictionary.es.email);
                message.setAttribute('placeholder', form_dictionary.es.message);

                break;
        }
    }

    function fadeOut(elements, time) {
        var op = 1; // initial opacity
        var timer = setInterval(function() {
            if (op <= 0.1) {
                clearInterval(timer);
                elements.forEach(function(item) {
                    item.style.display = 'none';
                });
            }
            elements.forEach(function(item) {
                item.style.opacity = op;
                item.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op -= op * 0.1;
            });
        }, time);
    }

    function fadeIn(elements, time) {
        var op = 0.1; // initial opacity
        elements.forEach(function(item) {
            item.style.display = 'block';
        });
        var timer = setInterval(function() {
            if (op >= 1) {
                clearInterval(timer);
            }
            elements.forEach(function(item) {
                item.style.opacity = op;
                item.style.filter = 'alpha(opacity=' + op * 100 + ')';
                op += op * 0.1;
            });
        }, time);
    }

    selectedOption();

    lang.addEventListener('change', function() {
        selectedOption();
    });
})(document);
/* ********** language ************* */
/* ********** ContactForm ********** */
((d) => {
    const $form = d.querySelector('.contact-form'),
        $loader = d.querySelector('.contact-form-loader'),
        $response = d.querySelector('.contact-form-response');

    $form.addEventListener('submit', (e) => {
        e.preventDefault();
        $loader.classList.remove('none');
        fetch('https://formsubmit.co/ajax/9fa64cbc853657c2e0b040d5f45ada8a', {
                method: 'POST',
                body: new FormData(e.target),
            })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json);
                location.hash = '#gracias';
                $form.reset();
            })
            .catch((err) => {
                console.log(err);
                let message = err.statusText || 'Ocurrió un error al enviar, intenta nuevamente';
                $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
            })
            .finally(() => {
                $loader.classList.add('none');
                setTimeout(() => {
                    location.hash = '#close';
                }, 3000);
            });
    });
})(document);
/* ********** ContactForm ********** */
/* ********** 3d cloud tags ******** */
const myTags = [
    'TypeScript', 'CSS', 'HTML',
    'Angular', 'Nodejs', 'Web3',
    'VanillaJS', 'express', 'TDD',
    'scrum', 'git', 'MongoDB', 'solidity'
];
var tagCloud = TagCloud('.cloudtag', myTags, {
    // radius in px
    radius: 150,
    // animation speed
    // slow, normal, fast
    maxSpeed: 'normal',
    initSpeed: 'normal',
    // 0 = top
    // 90 = left
    // 135 = right-bottom
    direction: 135,

    // interact with cursor move on mouse out
    keep: true
});
console.log(tagCloud);


/* ********** 3d cloud tags ******** */
