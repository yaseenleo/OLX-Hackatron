// signup function sigup.html

function signUp() {
    let fName = document.getElementById("f_name").value;
    let lName = document.getElementById("l_name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let displayName = fName + " " + lName


    // var key = firebase.database().ref().child(`users`).push().key;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((success) => {
            let userUid = firebase.auth().currentUser.uid
            console.log(userUid);
            let userObj = {
                first_name: fName,
                last_name: lName,
                displayName,
                email: email,
                password: pass,
                // key: key,
                uid: userUid,
                createTime: firebase.database.ServerValue.TIMESTAMP
            }


            firebase.database().ref('users/' + userUid)
                .set(userObj)

                .then((success) => {
                    swal("Good job!", "You signup successfully!", "success")
                        .then(() => {
                            window.location.replace("../createAdd.html")
                        })

                })
                .catch((error) => {
                    swal("Sorry!", "Something went wrong", "error");
                    first_name.value = '';
                    last_name.value = '';
                    email.value = '';
                    password.value = '';
                })
        })
}


//signin function signin.html
function signIn() {

    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(email, pass).then((success) => {
        //userId = success.uid;
        swal({
            title: "Login Successful!",
            text: "You entered correct email or password",
            icon: "success",
            button: "Done",
        });
        console.log(success);
        window.location = '../createAdd.html'
    })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({

                title: "Login Unsuccessful!",
                text: "You entered wrong email or password",
                icon: "warning",
                button: "Done",
            });

            email.value = '';
            pass.value = '';
            // ...
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...

        console.log(displayName);
        console.log(email);
        console.log(emailVerified);
        console.log(photoURL);
        console.log(isAnonymous);
        console.log(uid);
        console.log(providerData);

    } else {
        console.log("user is not log in")
        // User is signed out.
        // ...
    }
});

function logout() {
    console.log("you clicked");
    firebase.auth().signOut()
        .then(() => {
            console.log("log out success");
            window.location.assign("../index.html");
            // Sign-out successful.
        }).catch((error) => {
            let message = error.message;
            console.log(message)
            // An error happened.
        });
}



// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
console.log(messaging)

messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
})
    .then(function () {
        messaging.getToken()
    })
    .then(function(token){
        console.log(JSON.stringify(token))
    })
    .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
        swal({
            icon: "warning",
            text: "You have rejected the permission of notification",
            closeOnClickOutside: false,
            timer: 5000,
        });
    });


var usersarr = []

// function getEmail() {
    let db = firebase.database();
    db.ref('users/').on('value', function (data) {
        let users = data.val();
        console.log('user', users);
        for (user1 in users) {
            for (key in users[user1]) {
                usersarr.push(users[user1][key]);
            }
        }
        console.log("key", key)
        console.log('serialized users', users);
        // display_ads(ads);
        // console.log('serialized random adds', r_ads)
    })

    console.log("array users",usersarr)

    usersarr.forEach((u,i) =>{
        var username = u.displayName;
        console.log("username for msg", username);
    })
// }

// let username = firebase.auth().currentUser.displayName;
// console.log(username)