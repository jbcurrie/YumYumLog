// are you requiring our models on the client side or is this psuedocode? need to do ajax calls instead (it's an api)
// var db = require("../models");

function sideBar_Open() {
  document.getElementById("sidebar").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function sideBar_Close() {
  document.getElementById("sidebar").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

function carousel(){
  var slideIndex = 0;
  var i;
  var x = document.getElementByClassName("mySlides");
  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if(slideIndex > x.length){
    slideIndex = 1
  }

  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 4000);
}


//below functions need to make sure the page loads first prior to running
window.onload = function(){

  carousel();


/*
  progress_Bar function displays a progress bar on our user dashboard. It
  compares values from two models: UserTrack and Goal, both of which belongTo
  the User model.  Set the width equal to the User.count property; if no goal
  exists, the element is cleared.  If not, we increment the width
*/
    //i think the db.User count and goal is pseudo code. will replace later

//AJAX GOES HERE

  function progress_Bar(){
    var elem = document.getElementById("curr_prog");
    var width = db.User.count; // TODO: check status of assignment here
    var goal = db.User.goal // TODO: check status of assignment here
    var id = setInterval(frame, 10);
    function frame() {
      if(!goal){
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }

/*
  check_Star function simply checks the goal vs the foodLog count and determines
  if the goal has been met.  If so, create an img element and assign it the star.png
  source and append to the div
*/
//   function check_Star(){
//     if (db.User.count >= db.User.goal) {
//       var elem = document.createElement("img");
//       elem.src = ("./assets/images/star.png")
//       document.getElementById("star_complete").appendChild(elem);
//     }
//   } // end check_Star function
} // end onload listener
