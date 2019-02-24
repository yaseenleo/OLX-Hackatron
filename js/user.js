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
        window.location = '../postAdd.html'
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
            window.location.assign("signin.html");
            // Sign-out successful.
        }).catch((error) => {
            let message = error.message;
            console.log(message)
            // An error happened.
        });
}
