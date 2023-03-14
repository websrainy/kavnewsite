$('.nav-button').click(function () {
  $('body').toggleClass('nav-open');
});

document.querySelector('nav .nav-toggle1').addEventListener('click',()=>{
  document.querySelector('nav .nav-toggle1 span').classList.toggle('active')
  document.querySelector('nav .nav-links').classList.toggle('active')
})
document.querySelector('nav .nav-links ul li a').addEventListener('click',()=>{
  document.querySelector('nav .nav-toggle1 span').classList.toggle('active')
  document.querySelector('nav .nav-links').classList.toggle('active')
})



1
window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

});




$('#buttonnavbart').click(function () {
  // If the clicked element has the active class, remove the active class from EVERY .nav-link>.state element

  $('.navbar-nav').removeClass('py-4');
  $('.navbar-nav').css('padding-top', '4%');


  if ($('.container.navcontainernback').hasClass('navcontainernback')) {
    $('.container.navcontainernback').removeClass('navcontainernback');

  }
  // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
  else {
    $('.container.navcontainernback').removeClass('navcontainernback');
    $('.navjava').addClass('navcontainernback');

  }

  if ($('nav').hasClass('mobileexpand')) {
    $('nav').removeClass('mobileexpand');
  }
  // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
  else {

    $('nav').addClass('mobileexpand');
  }

});






// Our work js starts

var slideWrapper = $(".main-slider"),
  iframes = slideWrapper.find(".embed-player"),
  lazyImages = slideWrapper.find(".slide-image"),
  lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control) {
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find(".slick-current");
  video = currentSlide.find("video").get(0);
  console.log(video)
  switch (control) {
    case "play": video.play(); break;
    case "pause": video.pause(); break;
  }

  /* slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start"); */
  /* video = currentSlide.children("video").get(0);
 
  video.pause(); */
  /* if (slideType === "vimeo") {
    switch (control) {
      case "play":
        if (
          startTime != null &&
          startTime > 0 &&
          !currentSlide.hasClass("started")
        ) {
          currentSlide.addClass("started");
          postMessageToPlayer(player, {
            method: "setCurrentTime",
            value: startTime
          });
        }
        postMessageToPlayer(player, {
          method: "play",
          value: 1
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          method: "pause",
          value: 1
        });
        break;
    }
  } else if (slideType === "youtube") {
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          event: "command",
          func: "mute"
        });
        postMessageToPlayer(player, {
          event: "command",
          func: "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          event: "command",
          func: "pauseVideo"
        });
        break;
    }
  } else if (slideType === "video") {
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play") {
        video.play();
      } else {
        video.pause();
      }
    }
  } */
}

// Resize player
/* function resizePlayer(iframes, ratio) {
  if (!iframes[0]) return;
  var win = $(".main-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16/9;

  iframes.each(function(){
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current.width(playerWidth).height(height).css({
        left: (width - playerWidth) / 2,
         top: 0
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current.width(width).height(playerHeight).css({
        left: 0,
        top: (height - playerHeight) / 2
      });
    }
  });
}
*/


// DOM Ready
$(function () {
  // Initialize
  slideWrapper.on("init", function (slick) {
    slick = $(slick.currentTarget);
    setTimeout(function () {
      playPauseVideo(slick, "play");
    }, 1000);
    //resizePlayer(iframes, 16/9);
  });
  slideWrapper.on("beforeChange", function (event, slick) {
    slick = $(slick.$slider);
    console.log("beforeChange")
    playPauseVideo(slick, "pause");
  });
  slideWrapper.on("afterChange", function (event, slick) {
    slick = $(slick.$slider);
    console.log("afterChange")
    playPauseVideo(slick, "play");
  });
  slideWrapper.on("lazyLoaded", function (event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length) {
      lazyImages.addClass("show");
      slideWrapper.slick("slickPlay");
    }
  });

  //start the slider
  slideWrapper.slick({
    // fade:true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 10000,
    autoplay: false,
    centerMode: true,
    variableWidth: true,
    touchMove: true,
    lazyLoad: "progressive",
    speed: 400,
    arrows: false,
    dots: true,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)"
  });
});

// Resize event
/* $(window).on("resize.slickVideoPlayer", function(){  
  resizePlayer(iframes, 16/9);
});
*/

// Our work js ends here




// Usecase slider JS starts here
// vars
// 'use strict'
// var	testim = document.getElementById("testim"),
// 		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
//     testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
//     testimLeftArrow = document.getElementById("left-arrow"),
//     testimRightArrow = document.getElementById("right-arrow"),
//     testimSpeed = 4500,
//     currentSlide = 0,
//     currentActive = 0,
//     testimTimer,
// 		touchStartPos,
// 		touchEndPos,
// 		touchPosDiff,
// 		ignoreTouch = 30;
// ;

// window.onload = function() {

//     // Testim Script
//     function playSlide(slide) {
//         for (var k = 0; k < testimDots.length; k++) {
//             testimContent[k].classList.remove("active");
//             testimContent[k].classList.remove("inactive");
//             testimDots[k].classList.remove("active");
//         }

//         if (slide < 0) {
//             slide = currentSlide = testimContent.length-1;
//         }

//         if (slide > testimContent.length - 1) {
//             slide = currentSlide = 0;
//         }

//         if (currentActive != currentSlide) {
//             testimContent[currentActive].classList.add("inactive");            
//         }
//         testimContent[slide].classList.add("active");
//         testimDots[slide].classList.add("active");

//         currentActive = currentSlide;

//         clearTimeout(testimTimer);
//         testimTimer = setTimeout(function() {
//             playSlide(currentSlide += 1);
//         }, testimSpeed)
//     }

//     testimLeftArrow.addEventListener("click", function() {
//         playSlide(currentSlide -= 1);
//     })

//     testimRightArrow.addEventListener("click", function() {
//         playSlide(currentSlide += 1);
//     })    

//     for (var l = 0; l < testimDots.length; l++) {
//         testimDots[l].addEventListener("click", function() {
//             playSlide(currentSlide = testimDots.indexOf(this));
//         })
//     }

//     playSlide(currentSlide);

//     // keyboard shortcuts
//     document.addEventListener("keyup", function(e) {
//         switch (e.keyCode) {
//             case 37:
//                 testimLeftArrow.click();
//                 break;

//             case 39:
//                 testimRightArrow.click();
//                 break;

//             case 39:
//                 testimRightArrow.click();
//                 break;

//             default:
//                 break;
//         }
//     })

// 		testim.addEventListener("touchstart", function(e) {
// 				touchStartPos = e.changedTouches[0].clientX;
// 		})

// 		testim.addEventListener("touchend", function(e) {
// 				touchEndPos = e.changedTouches[0].clientX;

// 				touchPosDiff = touchStartPos - touchEndPos;

// 				console.log(touchPosDiff);
// 				console.log(touchStartPos);	
// 				console.log(touchEndPos);	


// 				if (touchPosDiff > 0 + ignoreTouch) {
// 						testimLeftArrow.click();
// 				} else if (touchPosDiff < 0 - ignoreTouch) {
// 						testimRightArrow.click();
// 				} else {
// 					return;
// 				}

// 		})
// }


$(document).ready(function () {
  var boolscroll = false;
  document.querySelector('.nav-toggle1').addEventListener(
    'click',
    function (e) {
      if (boolscroll) {
        boolscroll = false
      } else {
        boolscroll = true
      }

      if (boolscroll) {

        document.querySelector("#preloader").style.overflow = "hidden"
        document.querySelector("body").style.overflowY = "hidden"
      } else {
        document.querySelector("#preloader").style.overflow = "visible"
        document.querySelector("body").style.overflowY = "visible"
      }
    })

});





$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});




$(() => {

  $('.form-group').each((i, e) => {
    $('.form-control', e).
      focus(function () {
        e.classList.add('not-empty');
      }).
      blur(function () {
        this.value === '' ? e.classList.remove('not-empty') : null;
      });

  });

});






const accordionBtns = document.querySelectorAll(".item-header");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("active");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});


// contact form
$(document).ready(function () {
  $("#submitt").click(function () {

    var name = $("#form_name").val();
    var email = $("#form_email").val();
    var mobile = $("#form_phone").val();
    var company = $("#form_Company").val();
    var designation = $("#form_designation").val();
    var country = $("#form_country").val();
    var city = $("#form_city").val();
    var interestedin = $("#form_interested").val();
    var approxbudget = $("#form_budget").val();
    var message = $("#form_message").val();


    if (name == '' || email == '' || mobile == '', company == '', designation = '', country == '', city == '', interestedin == '', approxbudget == '', message == '') {
      alert("Please fill all the fields");
    }
    else {
      $.ajax({
        type: "POST",
        url: "process.php",
        data: { name: name, email: email, mobile: mobile, company: company, designation: designation, country: country, city: city, interestedin: interestedin, approxbudget: approxbudget, message: message },
        cache: false,
        success: function (result) {
          alert(result);
          $("#contact-formm")[0].reset();
        }
      });
    }


  });


});










$(document).ready(function () {
         
    //             $(".hhhh").removeClass("h2890");
    //  $(".tttt").removeClass("text980");
    //  $(".bbbb").removeClass("brand980");
    //  $(".aaaa").removeClass("agenci980");
    
  $(".brand1").click(function () {
    $(".logossec2").hide();
    $(".logossec1").show();
    $(".brand1").addClass("active");
    $(".agenci1").removeClass("active");
    
    //    $(".hhhh").removeClass("h2890");
    //  $(".tttt").removeClass("text980");
    //  $(".bbbb").removeClass("brand980");
    //  $(".aaaa").removeClass("agenci980");
  
         
  });
  $(".agenci1").click(function () {
    $(".logossec1").hide();
    $(".logossec2").show();
    $(".agenci1").addClass("active");
     $(".agenci1").addClass("active");
    $(".brand1").removeClass("active");
    

         
         
         
    //             $(".hhhh").addClass("h2890");
    //  $(".tttt").addClass("text980");
    //  $(".bbbb").addClass("brand980");
    //  $(".aaaa").addClass("agenci980");

     


  });


  var htt = false;

  document.getElementById("imagechangeclk").onclick = function() {
    if (htt) {
      htt = false
    } else {
      htt = true
    }

    if (htt){
      $(".colicon1").fadeOut(500, function() { 
        $(".colicon1").attr('src',"Assets/images1/clientimg/Hp.png");
        $(".colicon1").fadeIn(500);
       });
       $(".colicon2").fadeOut(500, function() { 
        $(".colicon2").attr('src',"Assets/images1/clientimg/Little-Mix.png");
        $(".colicon2").fadeIn(500);
       });
       $(".colicon3").fadeOut(500, function() { 
        $(".colicon3").attr('src',"Assets/images1/clientimg/Full-time.png");
        $(".colicon3").fadeIn(500);
       });
       $(".colicon4").fadeOut(500, function() { 
        $(".colicon4").attr('src',"Assets/images1/clientimg/Stimrol.png");
        $(".colicon4").fadeIn(500);
       });
       $(".colicon5").fadeOut(500, function() { 
        $(".colicon5").attr('src',"Assets/images1/clientimg/PS1.png");
        $(".colicon5").fadeIn(500);
       });
       $(".colicon6").fadeOut(500, function() { 
        $(".colicon6").attr('src',"Assets/images1/clientimg/HouseOfDragon.png");
        $(".colicon6").fadeIn(500);
       });
       $(".colicon7").fadeOut(500, function() { 
        $(".colicon7").attr('src',"Assets/images1/clientimg/Volvo.png");
        $(".colicon7").fadeIn(500);
       });
    
      }else{
        $(".colicon1").fadeOut(500, function() { 
          $(".colicon1").attr('src',"Assets/images1/clientimg/Zara.png");
          $(".colicon1").fadeIn(500);
         });
         $(".colicon2").fadeOut(500, function() { 
          $(".colicon2").attr('src',"Assets/images1/clientimg/Old-spice.png");
          $(".colicon2").fadeIn(500);
         });
         $(".colicon3").fadeOut(500, function() { 
          $(".colicon3").attr('src',"Assets/images1/clientimg/Snap.png");
          $(".colicon3").fadeIn(500);
         });
         $(".colicon4").fadeOut(500, function() { 
          $(".colicon4").attr('src',"Assets/images1/clientimg/Meta.png");
          $(".colicon4").fadeIn(500);
         });
         $(".colicon5").fadeOut(500, function() { 
          $(".colicon5").attr('src',"Assets/images1/clientimg/Universal.png");
          $(".colicon5").fadeIn(500);
         });
         $(".colicon6").fadeOut(500, function() { 
          $(".colicon6").attr('src',"Assets/images1/clientimg/Benfit.png");
          $(".colicon6").fadeIn(500);
         });
         $(".colicon7").fadeOut(500, function() { 
          $(".colicon7").attr('src',"Assets/images1/clientimg/Tesco.png");
          $(".colicon7").fadeIn(500);
         });
        }
   }
















});