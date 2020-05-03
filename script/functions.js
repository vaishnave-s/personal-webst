export class PersonalWebsite {
    //////////////////FUNCTIONS/////////////////////////////////
    //Fetching data from firebase and storing in session
    static getData() {
        firebase.database().ref().once('value').then(function (snapshot) {
            //If userId doesn't exists in database
            if (Object.keys(snapshot.val().users).indexOf(sessionStorage.getItem("userId")) == -1) {

                firebase.database().ref().child('users').child(sessionStorage.getItem('userId')).set({
                    name: sessionStorage.getItem('userName'),
                    email: sessionStorage.getItem('userEmail'),
                    photoURL: sessionStorage.getItem('userPhoto'),
                    phoneNumber: sessionStorage.getItem('userNumber'),
                    creationTime: sessionStorage.getItem('userCreationTime')
                });

            }
            //If comment under userId doesn't exist in database
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

    //Login
    static login() {
        function app(user) {

            location.replace("./home.html");
        };

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



    //Calculates time in IST
    static calcTime(dateInput, offset) {

        // create Date object for current location
        var d = new Date(dateInput);

        // convert to msec
        // add local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000 * offset));
        // return time as a string
        return "" + nd;

    }


    //Object containing comment information
    static commentObject() {
        var today = new Date();

        return {
            name: sessionStorage.getItem('userName'),
            email: sessionStorage.getItem('userEmail'),
            commentMessage: document.getElementById("contactmessage").value,
            commentCreationTime: PersonalWebsite.calcTime(today, '+5.5'),
            commentType: "" + document.getElementById("commentType").value

        }
    }
    //Alert message and page reload to refresh user comment count
    static onPostComment() {

        alert("Thank you for connecting with me!");
        location.reload(true);
    }

}