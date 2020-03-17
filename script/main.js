const openNav = document.querySelector("#openNav");
const closeNav = document.querySelector("#closeNav");
const GSignIn = document.querySelector("#GSignIn");

var firebaseConfig = {
    apiKey: "AIzaSyBm_uWn_TlojRuzuSzW9PREp5bjWmSOW-A",
    authDomain: "personal-webst.firebaseapp.com",
    databaseURL: "https://personal-webst.firebaseio.com",
    projectId: "personal-webst",
    storageBucket: "personal-webst.appspot.com",
    messagingSenderId: "222343428376",
    appId: "1:222343428376:web:5f92d20c8ef1e8a5afc66d",
    measurementId: "G-GDZ6GNV45N"
  };
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
//
// window.onscroll = function() {myFunction()};

// var header = document.getElementById("toggler");
// var sticky = header.offsetTop;

// function myFunction() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }
//
console.log(window.location.pathname);
if (window.location.pathname!="/index.html"||window.location.pathname!="/"){

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("nav").style.width = "0";
   document.getElementById("main").style.marginLeft = "0";
});
}
if(openNav){
openNav.addEventListener("click",(e) => {

    document.getElementById("nav").style.width = "15rem";
    document.getElementById("nav").style.backgroundColor = "rgb(109, 19, 94,0.8)";

    document.getElementById("main").style.marginLeft = "15rem";

});
}
if(closeNav){
closeNav.addEventListener("click",(e) => {
    e.preventDefault();

    document.getElementById("nav").style.width = "0rem";
    document.getElementById("main").style.marginLeft = "0rem";
    

});
}
if(GSignIn){
    GSignIn.addEventListener("click",(e) => {

    login();
        
    
    });
    }

///////////////////////Chart///////////////////////
if (window.location.pathname=="/about.html"){
window.onload = function() {
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    // ChartType = 'horizontalBar',
    data: {
        labels: ['Python', 'SQL', 'TS/JS', 'Angular 8', 'Django'],
        datasets: [{
            data: [65, 59, 80, 81, 56], label: 'Confidence Level',
            backgroundColor: [
                // 'rgb(218,165,32,0.7)',
                // 'rgb(218,165,32,0.7)',
                // 'rgb(218,165,32,0.7)',
                // 'rgb(218,165,32,0.7)',
                // 'rgb(218,165,32,0.7)',
                "rgb(109, 19, 94,1)",
                "rgb(109, 19, 94,1)",
                "rgb(109, 19, 94,1)",
                "rgb(109, 19, 94,1)",
                "rgb(109, 19, 94,1)",





 

            ],
            borderColor: [
                // 'rgb(218,165,32)',
                // 'rgb(218,165,32)',
                // 'rgb(218,165,32)',
                // 'rgb(218,165,32)',
                // 'rgb(218,165,32)',
                // 'rgb(218,165,32)',


                
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            labels: {
                // This more specific font property overrides the global property
    fontFamily :'Montserrat',
    fontStyle: 'bold',
            }
        },
        scales: {
            xAxes: [{display: true,scaleLabel:{display: true,labelString:'Percentage',fontStyle: 'bold',
            fontFamily :'Montserrat',

            // fontColor:'#FF66C4',

        },ticks: {

                beginAtZero : true,
                display: false,
                // fontColor:'rgb(218, 62, 158)',
          
                min: 0,
                max: 100
              }}], yAxes: [{display: true,scaleLabel:{display: true,},ticks: {
                fontStyle: 'bold',
                fontFamily :'Montserrat',

                beginAtZero: true,
                min: 0,
                max: 100
                // fontColor:'rgb(218, 62, 158)',
          
              }}] 
        }
    }
});}
}
///////////////////////////////////////////////////
if (window.location.pathname!="/index.html"||window.location.pathname!="/"){

var menuItems = ["HOME", "ABOUT","INTERESTS","CONTACT"]
var str = '<ul>'
menuItems.forEach(function(menuItem) {
  str += '<li><h2><a class=\"sidenav-list\" href=\"'+ menuItem.toLowerCase() + '.html\">'+menuItem+'</a><h2></li>';
}); 
str += '</ul>';
document.getElementById("menuList").innerHTML = str;
}
///////////////////////////////////////////////////



signOut=()=>{
    console.log("Signout");

    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Signout success");
      location.replace("/")

  }).catch(function(error) {
    console.log("Signout error");
    // An error happened.
  });
};

///////////////////////////////////////////////////
function login(){
    function newLoginHappened(user){
      if (user){
          //user is signed in
          app(user);
          
      }
      else{
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider);

      }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);



};
  function app(user){
    location.replace("./home.html")

      console.log(user)

  console.log(user.displayName);
};