$(document).ready(function(){
    // slider 1
    $('.slider-wrapper').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 4000,
    });
    // slider 2
    $('.trusted__slider-cont').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        // fade: true,
        cssEase: 'linear',
        // autoplay: true,
        autoplaySpeed: 4000,
    });

   // menu burger
   $('.icon_menu, .menu__link').click(function () {
    $('.icon_menu, .mobile-cont').toggleClass('active')
});

// close mobile menu when click outside of it
$('body').click(function(e){
    const menu = document.querySelector('.mobile-cont');
    if(!menu.contains(e.target) && !e.target.classList.contains('icon_menu')){
        $('.icon_menu, .mobile-cont').removeClass('active');
    }
});

// modal window
// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['modal-custom-1'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        //return false; // nothing happens
    }
});
// set content
modal.setContent(`<h3 class="common-header">Hi there! Send us a Message!</h3>
<p class="common-text">Enter Your Email:</p>
<input type="email" required placeholder="Type your email address" />
<p class="common-text">Your Message:</p>
<textarea placeholder="Type your message"></textarea>
`);

// add a button
modal.addFooterBtn('Send', 'tingle-btn tingle-btn--primary send-btn', function() {
    // here goes some logic
    //modal.close();
});

// add another button
modal.addFooterBtn('Cancel', 'tingle-btn tingle-btn--danger', function() {
    // here goes some logic
    modal.close();
});

// open modal
$('.in-touch').click(function(){
    modal.open();
});

// popup form sending
$('.send-btn').click(function(){
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    // collect data from form to be submitted
    const email_elem = $('.modal-custom-1 input');
    const email = email_elem.val();
    const message = $('.modal-custom-1 textarea').val();

    if(!validateEmail(email)){
        email_elem.addClass('invalid');
        return;
    }
    $.ajax({
        url: 'http://gpsolutions/testmail.php',
        data: {post_email: email, post_message: message},
        method:  'POST',
        error: function(res){
            modal.close();
            modal_error = new tingle.modal({
                footer: false,
                stickyFooter: false,
                closeMethods: ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                cssClass: ['modal-custom-error'],
                onOpen: function() {
                    console.log('modal open');
                },
                onClose: function() {
                    console.log('modal closed');
                },
                beforeClose: function() {
                    // here's goes some logic
                    // e.g. save content before closing the modal
                    return true; // close the modal
                    //return false; // nothing happens
                }
            });
            modal_error.setContent(`<img src="img/error.png" />
            <h3 class="common-header">Some error occured</h3>`);
            modal_error.open();
            setTimeout(function(){
                modal_error.close();
            }, 4000)            
        },
        success: function(res){
            let img;
            if(res == 'Wrong email' || res == 'Wrong user message' || res == 'Mail error'){
                img = "error.png";
            }else{
                img = "success.png";
            }
            modal.close();
            modal_success = new tingle.modal({
                footer: false,
                stickyFooter: false,
                closeMethods: ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                cssClass: ['modal-custom-success'],
                onOpen: function() {
                    console.log('modal open');
                },
                onClose: function() {
                    console.log('modal closed');
                },
                beforeClose: function() {
                    // here's goes some logic
                    // e.g. save content before closing the modal
                    return true; // close the modal
                    //return false; // nothing happens
                }
            });
            modal_success.setContent(`<img src="img/${img}" />
            <h3 class="common-header">${res}</h3>`);
            modal_success.open();
            setTimeout(function(){
                modal_success.close();
            }, 4000)
        }
    })
})

// contact form sending
$('.contact-cont form').submit(function(e){
    e.preventDefault();
    const userName = $('.contact-user').val();
    const userEmail = $('.contact-email').val();
    const userMessage = $('.contact-message').val();

    $('.sending-info').removeClass('invalid');
    $('.sending-info').addClass('sending');
    $('.sending-info').text('Sending message...');
    $.ajax({
        url: 'http://gpsolutions/testmail2.php',
        method: 'POST',
        data: {userName, userEmail, userMessage},
        error: function(res){
            $('.sending-info').removeClass('sending');
            $('.sending-info').addClass('invalid');

            $('.sending-info').text('Error occured');  
        },
        success: function(res){
            $('.sending-info').removeClass('sending');
            if(res == 'Wrong user name' || res == 'Wrong user email' || res == 'Wrong user message' || res == 'Mail error'){
            $('.sending-info').addClass('invalid');
            } else {
                $('.sending-info').addClass('success');
            }

            $('.sending-info').text(res);
        }
    })
})
})