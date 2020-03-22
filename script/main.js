const openNav = document.querySelector("#openNav");
const closeNav = document.querySelector("#closeNav");
const GSignIn = document.querySelector("#GSignIn");
const sendComment = document.querySelector("#sendComment");
const music = document.querySelector("#music");
const reading = document.querySelector("#reading");
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
function timedRefresh(time) {
    setTimeout("location.reload(true);", time);
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
        // sessionStorage.setItem('comments', JSON.stringify(snapshot.val().comments));



    });

};
getData();
////////////////////////////////////////////////

////////////////////////////////////////////////


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
////////////////////////////////////////////////


if (path != "index.html" || path != "") {

    window.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById("nav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
    });
}
if (openNav) {
    openNav.addEventListener("click", (e) => {

        document.getElementById("nav").style.width = "15rem";
        document.getElementById("nav").style.backgroundColor = "rgb(109, 19, 94,0.8)";

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
if (music) {
    music.addEventListener("click", (e) => {
        window.open("//www.soundcloud.com/just_nave", '_blank');



    });
}
if (reading) {
    reading.addEventListener("click", (e) => {
        window.open("//www.goodreads.com/just_nave", '_blank');



    });
}




///////////////////////Chart///////////////////////
if (path == "about.html") {
    var aboutObj = JSON.parse(sessionStorage.getItem("website")).about;
    document.getElementById("about-desc").innerHTML = aboutObj.description;

    window.onload = function () {
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
                responsive: true,

                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontFamily: 'Montserrat',
                        fontStyle: 'bold',
                    }
                },
                scales: {
                    xAxes: [{
                        display: true, scaleLabel: {
                            display: true, labelString: 'Percentage', fontStyle: 'bold',
                            fontFamily: 'Montserrat',

                            // fontColor:'#FF66C4',

                        }, ticks: {

                            beginAtZero: true,
                            display: false,
                            // fontColor:'rgb(218, 62, 158)',

                            min: 0,
                            max: 100
                        }
                    }], yAxes: [{
                        display: true, scaleLabel: { display: true, }, ticks: {
                            fontStyle: 'bold',
                            fontFamily: 'Montserrat',

                            beginAtZero: true,
                            min: 0,
                            max: 100
                            // fontColor:'rgb(218, 62, 158)',

                        }
                    }]
                }
            }
        });
    }
}
///////////////////////////////////////////////////
if (path != "index.html" || path != "") {

    var menuItems = ["HOME", "ABOUT", "INTERESTS", "CONTACT"]
    var str = '<ul>'
    menuItems.forEach(function (menuItem) {
        str += '<li><h2><a class=\"sidenav-list hoverline\" href=\"' + menuItem.toLowerCase() + '.html\">' + menuItem + '</a><h2></li>';
    });
    str += '</ul>';
    document.getElementById("menuList").innerHTML = str;
}
///////////////////////////////////////////////////



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

///////////////////////////////////////////////////
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
    var userEmail = user.email;
    // console.log(userEmail.substring(userEmail.lastIndexOf("@")+1));
    if (userEmail.substring(userEmail.lastIndexOf("@") + 1) != "psiog.com") {
        location.replace("./home.html");
    }
    else {
        signOut();

        alert(message = "This email is not acceptable. Please try another one.");


    }


};

///////////////////////////////////////////////////
if (path == "contact.html") {
    var name = sessionStorage.getItem('userName');

    document.getElementById("contact-heading").innerHTML = "Let's connect, " + name.substring(0, name.lastIndexOf(" ")) + ".";
    var today = new Date();

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
                    // var updateObj={}
                    // updateObj[nextIndexValue] = {
                    //     name: sessionStorage.getItem('userName'),
                    //     email: sessionStorage.getItem('userEmail'),
                    //     commentMessage: document.getElementById("contactmessage").value,
                    //     commentCreationTime: calcTime(today,'+5.5'),
                    //     commentType: ""+document.getElementById("commentType").value

                    // }
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

    // const displayComments = document.getElementById("displayComments").innerHTML=
    // `<div class="card-section" ><div class="card" style="margin-top: 2rem;">
    //                 <p><div class="comment-name">`++`</div>
    //                 <div class="comment-date">`++`</div></p> <br>   
    //                <p> <div class="comment-message">`++`</div></p>
    //             </div></div>`;


}




///////////////////////////////////////////////////
if (path == "interests.html") {
document.getElementById("interests-section").innerHTML = JSON.parse(sessionStorage.getItem("website")).interests.description



}

///////////////////////////////////////////////////
if (path == "home.html") {

document.getElementById("home-section").innerHTML = JSON.parse(sessionStorage.getItem("website")).home.description

}
