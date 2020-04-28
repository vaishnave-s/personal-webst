const openNav = document.querySelector("#openNav");
const closeNav = document.querySelector("#closeNav");
const GSignIn = document.querySelector("#GSignIn");
const sendComment = document.querySelector("#sendComment");

function calcTime(dateInput, offset) {

    // create Date object for current location
    d = new Date(dateInput);

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000 * offset));
    // return time as a string
    return "" + nd;

}

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


///////////////////////////////////////////////////
var url = window.location.pathname;
var path = url.substring(url.lastIndexOf('/') + 1);
console.log(path);


///////////////////AUTH GUARD//////////////////
if (path != "") {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = './';

        }
        else {
            sessionStorage.setItem('userId', user.uid);
            sessionStorage.setItem('userName', user.displayName);
            sessionStorage.setItem('userEmail', user.email);
            sessionStorage.setItem('userNumber', user.phoneNumber);
            sessionStorage.setItem('userPhoto', user.photoURL);
            sessionStorage.setItem('userCreationTime', calcTime(user.metadata.creationTime, '+5.5'));
            getData();
            
            var name = sessionStorage.getItem('userName');
            document.getElementById("userName").innerHTML = "<p>Hi " + name.substring(0, name.lastIndexOf(" ")) + "</p>";





        }
    });
}
////////////////////////////////////////////////

function getData() {
    firebase.database().ref().once('value').then(function (snapshot) {
        if (Object.keys(snapshot.val().users).indexOf(sessionStorage.getItem("userId")) == -1) {

            firebase.database().ref().child('users').child(sessionStorage.getItem('userId')).set({
                name: sessionStorage.getItem('userName'),
                email: sessionStorage.getItem('userEmail'),
                photoURL: sessionStorage.getItem('userPhoto'),
                phoneNumber: sessionStorage.getItem('userNumber'),
                creationTime: sessionStorage.getItem('userCreationTime')
            });

        }
        if (Object.keys(snapshot.val().comments).indexOf(sessionStorage.getItem("userId")) == -1) {
            sessionStorage.setItem("commentsExist", 0);
        }
        else {
            sessionStorage.setItem("commentsExist", Object.keys(snapshot.val().comments[sessionStorage.getItem("userId")]).length);



        }


        sessionStorage.setItem('website', JSON.stringify(snapshot.val().personal));



    });

};
/////////////////////ALL PAGES///////////////////////////


if (path != "index.html" || path != "") {

    /////////////////////SIDENAV///////////////////////////
    window.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById("nav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    });

    /////////////////////MENU///////////////////////////
    var menuItems = ["Home", "About", "Interests", "Contact"]
    var str = '<ul>'
    menuItems.forEach(function (menuItem) {
        str += '<li><h2><a class=\"sidenav-list hoverline\" href=\"' + menuItem.toLowerCase() + '.html\">' + menuItem + '</a><h2></li>';
    });
    str += '</ul>';
    document.getElementById("menuList").innerHTML = str;
}
/////////////////////BUTTON CLICKS///////////////////////////

if (openNav) {
    openNav.addEventListener("click", (e) => {

        document.getElementById("nav").style.width = "15rem";
        // document.getElementById("nav").style.backgroundColor = "rgb(21, 109, 127,0.8)";
        // document.getElementById("nav").style.backgroundColor = "rgb(147, 189, 102,0.8)";
        document.getElementById("nav").style.backgroundImage= "linear-gradient(60deg, #98d358 0%,  #136170 100%)";

        document.getElementById("nav").style.opacity= "0.9";
        
        document.getElementById("main").style.marginLeft = "15rem";

    });
}
if (closeNav) {
    closeNav.addEventListener("click", (e) => {
        e.preventDefault();

        document.getElementById("nav").style.width = "0rem";
        document.getElementById("main").style.marginLeft = "0rem";


    });
}
if (GSignIn) {
    GSignIn.addEventListener("click", (e) => {

        login();


    });
}



///////////////////////ABOUT///////////////////////
if (path == "about.html") {
    ///////////////////////ABOUT ELEMENTS///////////////////////

    var aboutItems = ["EDUCATION", "INTERNSHIP", "EXPERIENCE"]
    var aboutButtons = ["Listen Now", "Reading List", "College Theatre"]

    var aboutImgLinks = ["images/about-img1.jpg","images/about-img2.png","images/about-img3.png"]
    var aboutContents = [JSON.parse(sessionStorage.getItem("website")).about.education,
    JSON.parse(sessionStorage.getItem("website")).about.internship,
    JSON.parse(sessionStorage.getItem("website")).about.experience]

    about_displaycard_str = ``;
    
    aboutItems.forEach((aboutItem, index) => {
    const aboutImgLink = aboutImgLinks[index];
    const aboutContent = aboutContents[index];
    const aboutButton = aboutButtons[index];



    about_displaycard_str += `<div class="about-displaycard">
    <div class="front">
      <h3 class="displaycardtitle">`+aboutItem+`
        
      </h3>
      <img class="blockcard-img" src="`+aboutImgLink+`" alt="" />
    </div>
`;
    about_displaycard_str += `    <div class="back" style=" display: flex;
    justify-content: center; 
    align-items: center; 

    ">
    
    <div class="blockcarddesc">`+aboutContent+`</div>
   
    </div>
  </div>`;

});
document.getElementById("about-blockcard-section").innerHTML = about_displaycard_str;

    ///////////////////////CHART///////////////////////
    window.onload = function () {
        var ctx = document.getElementById('myChart');
        
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Python', 'SQL', 'TS/JS', 'Angular 8', 'Django'],
                datasets: [{
                    data: [65, 59, 80, 81, 56], label: 'Skill Set',
                    backgroundColor: [
                        "rgb(21, 109, 127)",
                        "rgb(21, 109, 127)",
                        "rgb(21, 109, 127)",
                        "rgb(21, 109, 127)",
                        "rgb(21, 109, 127)",
                        "rgb(21, 109, 127)",

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,

                legend: {
                    labels: {
                        fontFamily: 'Montserrat',
                        fontStyle: 'bold',
                    }
                },
                scales: {
                    xAxes: [{
                        display: true, scaleLabel: {
                            display: true, labelString: 'Percentage', fontStyle: 'bold',
                            fontFamily: 'Montserrat',


                        }, ticks: {

                            beginAtZero: true,
                            display: false,

                            min: 0,
                            max: 100
                        }
                    }], yAxes: [{
                        barPercentage: 0.5,

                        display: true, scaleLabel: { display: true, }, ticks: {
                            fontStyle: 'bold',
                            fontFamily: 'Montserrat',

                            beginAtZero: true,
                            min: 0,
                            max: 100

                        }
                    }]
                }
            }
        });
    }
}
////////////////////SIGNOUT///////////////////////////////
function signOut() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("Signout success");
        sessionStorage.clear();
        location.replace("./")

    }).catch(function (error) {
        console.log("Signout error");
        // An error happened.
    });
};

//////////////////////LOGIN/////////////////////////////
function login() {
    function newLoginHappened(user) {
        if (user) {
            //user is signed in

            //   if (user.email){
            app(user);
            //   }
        }
        else {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
              });
            firebase.auth().signInWithPopup(provider);

        }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);



};
function app(user) {

    location.replace("./home.html");
};

//////////////////////CONTACT/////////////////////////////
if (path == "contact.html") {
    //////////////////////CONTACT ELEMENTS/////////////////////////////

    var name = sessionStorage.getItem('userName');
    document.getElementById("contact-heading").innerHTML = "Let's connect, " + name.substring(0, name.lastIndexOf(" ")) + ".";
    var today = new Date();
    //////////////////////SEND BUTTON CLICK/////////////////////////////

    if (sendComment) {
        sendComment.addEventListener("click", (e) => {
            if (document.getElementById("contactmessage").value != "") {

                if (sessionStorage.getItem("commentsExist") == 0) {
                    firebase.database().ref().child('comments').child(sessionStorage.getItem('userId')).set({
                        1: {
                            name: sessionStorage.getItem('userName'),
                            email: sessionStorage.getItem('userEmail'),
                            commentMessage: document.getElementById("contactmessage").value,
                            commentCreationTime: calcTime(today, '+5.5'),
                            commentType: "" + document.getElementById("commentType").value

                        }
                    });
                    alert("Thank you for connecting with me!");
                    location.reload(true);



                }
                else {
                    var nextIndexValue = parseInt(sessionStorage.getItem("commentsExist")) + 1;
                    firebase.database().ref().child('comments').child(sessionStorage.getItem('userId')).update({
                        [nextIndexValue]: {
                            name: sessionStorage.getItem('userName'),
                            email: sessionStorage.getItem('userEmail'),
                            commentMessage: document.getElementById("contactmessage").value,
                            commentCreationTime: calcTime(today, '+5.5'),
                            commentType: "" + document.getElementById("commentType").value

                        }
                    });
                    alert("Thank you for connecting with me!");
                    location.reload(true);



                }
            }
            else {
                alert(Message = "Please enter a message.");
            }

        });
    }

}




////////////////////////////INTERESTS///////////////////////
if (path == "interests.html") {

    ////////////////////////////INTERESTS ELEMENTS///////////////////////
    var interestsItems = ["MUSIC", "READING", "THEATRE", "GAMES"]
    var interestsButtons = ["Listen Now", "Reading List", "College Theatre", "SPORTS"]
    var interestsImgLinks = ["images/interests-img1.jpeg", "images/interests-img2.jpeg","images/interests-img3.jpeg","images/interests-img4.jpeg"];
    var interestsLinks = ["//www.soundcloud.com/just_nave", "//www.goodreads.com/just_nave", "//www.instagram.com/thestudio_sastra/", "SPORTS"]
    var interestsContents = [JSON.parse(sessionStorage.getItem("website")).interests.music,JSON.parse(sessionStorage.getItem("website")).interests.reading,JSON.parse(sessionStorage.getItem("website")).interests.theatre,JSON.parse(sessionStorage.getItem("website")).interests.sports]
    displaycard_str = ``;

    interestsItems.forEach((interestsItem, index) => {
    const interestsImgLink = interestsImgLinks[index];
    const interestsLink = interestsLinks[index];
    const interestsContent = interestsContents[index];
    const interestsButton = interestsButtons[index];

    displaycard_str += `<div class="displaycard">
    <div class="front">
      <h3 class="displaycardtitle">`+interestsItem+`
        
      </h3>
      <img class="blockcard-img" src="`+interestsImgLink+`" alt="" />
    </div>
`;
  if (interestsItem != "GAMES"){
    displaycard_str += `    <div class="back">
    
    <div class="blockcarddesc">`+interestsContent+`</div>
    <a target="_blank" href="`+interestsLink+`" class="displaycardbtn">`+interestsButton+`</a>
    </div>
  </div>`;
  }
  else{
    displaycard_str += `    <div class="back" style=" display: flex;
    justify-content: center; 
    align-items: center; 

    ">
    
    <div class="blockcarddesc">`+interestsContent+`
    </div>
  </div>`;
  }
});
document.getElementById("blockcard-section").innerHTML = displaycard_str;
}

///////////////////////////////////////////////////
if (path == "home.html") {


}
