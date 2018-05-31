console.log("Please watch over your XSSkiddies in this console area. Only authorized/l33t personell allowed. Parents carry any responibility. Kids may fall into Honeypots. Stay safe, don't get pwned.");

$(document).ready(function () {

    // Switch between Categories in the Impressions section
    $('#designs').click(function(){
        resetKnowHow();
        
        $('.cat_design').addClass('flex');
        $(this).addClass('filter__item--active');
    });
    $('#code').click(function(){
        resetKnowHow();
        
        $('.cat_code').show();
        $(this).addClass('filter__item--active');
    });
    $('#plugins').click(function(){
        resetKnowHow();
        
        $('.cat_plugins').addClass('flex');
        $(this).addClass('filter__item--active');
    });
    function resetKnowHow() {
        $('.showcase .cat_code, .showcase .cat_design, .showcase .cat_plugins').removeClass('flex').hide();
        $('.showcase .filter__item').removeClass('filter__item--active');
    }
    
    // Switch between Cards in the Skills section
    var cardsServices = $('.knowhow .card'),
        switchesServices = $('.knowhow .category__item'),
        frontend = $('#cardFrontend'),
        switchFrontend = $('#switchFrontend'),
        backend = $('#cardBackend'),
        switchBackend = $('#switchBackend'),
        screendesign = $('#cardScreendesign'),
        switchDesign = $('#switchDesign'),
        print = $('#cardPrint'),
        switchPrint = $('#switchPrint'),
        performance = $('#cardPerformance'),
        switchPerformance = $('#switchPerformance'),
        dev = $('#dev'),
        design = $('#design'),
        skillsDev = $('#skillsDev'),
        skillsDesign = $('#skillsDesign');
    
    design.click(function(){
        dev.removeClass('filter__item--active');
        $(this).addClass('filter__item--active');
        skillsDev.addClass('category--inactive');
        skillsDesign.removeClass('category--inactive');
        
        switchDesign.click();
    });
    switchDesign.click(function(){
        resetServices();
        screendesign.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });
    switchPrint.click(function(){
        resetServices();
        print.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });

    dev.click(function(){
        design.removeClass('filter__item--active');
        $(this).addClass('filter__item--active');
        skillsDesign.addClass('category--inactive');
        skillsDev.removeClass('category--inactive');
        
        switchFrontend.click();
    });
    switchFrontend.click(function(){
        resetServices();
        frontend.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });
    switchBackend.click(function(){
        resetServices();
        backend.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });
    switchPerformance.click(function(){
        resetServices();
        performance.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });
    
    function resetServices() {
        cardsServices.addClass('card--inactive');
        switchesServices.removeClass('category__item--active');
    }
    
    // Switch between Cards in the Contact section
    var cardsContact = $('.contact .pamphlet'),
        switchesContact= $('.contact .category__item'),
        mail = $('#mail'),
        switchMail = $('#switchMail'),
        phone = $('#phony'),
        switchPhone = $('#switchPhone');
    
    switchMail.click(function(){
        resetContactView();
        mail.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });
    
    switchPhone.click(function(){
        resetContactView();
        phone.removeClass('card--inactive');
        $(this).addClass('category__item--active');
    });
    
    function resetContactView() {
        cardsContact.addClass('card--inactive');
        switchesContact.removeClass('category__item--active');
    }
    
    // Switch between Testimonials
    $('.quote__customerbranding--messmer').click(function(){
        resetTestimonials();
        $(this).removeClass('quote__customerbranding--inactive');
        $('.quote--messmer').removeClass('hide');
    });
    $('.quote__customerbranding--tariffuxx').click(function(){
        resetTestimonials();
        $(this).removeClass('quote__customerbranding--inactive');
        $('.quote--tariffuxx').removeClass('hide');
    });
    $('.quote__customerbranding--jsg').click(function(){
        resetTestimonials();
        $(this).removeClass('quote__customerbranding--inactive');
        $('.quote--jsg').removeClass('hide');
    });
    $('.quote__customerbranding--ic').click(function(){
        resetTestimonials();
        $(this).removeClass('quote__customerbranding--inactive');
        $('.quote--ic').removeClass('hide');
    });
    
    function resetTestimonials() {
        $('.quote').addClass('hide');
        $('.quote__customerbranding').not(':first').addClass('quote__customerbranding--inactive');
    }
    
    // WAVES PLUGIN
    Waves.attach('.btn');
    Waves.attach('.nav__navigation__item');
    Waves.init();
    
    // Stack Exchange REST-API Call -> Get Stack Overflow Reputation
    // This functionality offers no real value, I just woke up one day and decided to play around with REST APIs. Now my jsfiddle is cluttered again.
    // The call is only executed when hovering or tapping .footer__more
    $('.footer__more').one('mouseenter', function(){
        var resultElement = $('#sorep');
        $.ajax({
            url: 'https://api.stackexchange.com/2.2/users/4033913?order=desc&sort=reputation&site=stackoverflow',
            method: 'get',
            dataType: 'json',
            success: function (response) {
                resultElement.attr('title','Stack Overflow Reputation: ' +response.items[0].reputation);
            },
            error: function (err) {
                console.log('SO RESTget failed: ' +err);
            }
        });  
    })
    
});