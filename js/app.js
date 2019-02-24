var config = {
    apiKey: "AIzaSyCHQeMujFJHPOgAq1bK-OXXtz9oArzOJx8",
    authDomain: "tourist-guide-system.firebaseapp.com",
    databaseURL: "https://tourist-guide-system.firebaseio.com",
    projectId: "tourist-guide-system",
    storageBucket: "tourist-guide-system.appspot.com",
    messagingSenderId: "750967317816"
};
firebase.initializeApp(config);

// saving add data in database

var firebaseDb = firebase.database()
var submit = document.getElementById("submit")
submit.addEventListener("click", e => {
    var p_name = document.getElementById("name").value;
    var number = document.getElementById("num").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var b_name = document.getElementById("b_name").value;
    var select = document.getElementById("category").value;
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value
    var price = document.getElementById("price").value;
    var model = document.getElementById("model").value;
    let image = document.getElementById("img").files[0];
    console.log(name)
    const userId = firebase.auth().currentUser.uid;
    console.log(userId)

    var adsData = {
        personName:p_name,
        number:number,
        address:address,
        city:city,
        brandName: b_name,
        title: title,
        model: model,
        price: price,
        description:description,
        userId,
        createTime: firebase.database.ServerValue.TIMESTAMP,
        select: select
    }
    let storageRef = firebase.storage().ref().child(`adsimages/${image.name}`)
    storageRef.put(image)
        .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((sanpUrl) => {
                adsData.image = sanpUrl
                console.log(adsData)
                if (select === "phones") {
                    firebaseDb.ref("Ads-data/phones/").push(adsData)
                    console.log(select)
                    swal({
                        title: "Upload Successful!",
                        text: "COngradulation your phone add is posted",
                        icon: "success",
                        button: "Done",
                    });
                }
                else if (select === "property") {
                    firebaseDb.ref("Ads-data/property/").push(adsData)
                    console.log(select)
                    swal({
                        title: "Upload Successful!",
                        text: "COngradulation your Property add is posted",
                        icon: "success",
                        button: "Done",
                    });
                }
                else if (select === "cars") {
                    firebaseDb.ref("Ads-data/cars/").push(adsData)
                    console.log(select)
                    swal({
                        title: "Upload Successful!",
                        text: "COngradulation your Car add is posted",
                        icon: "success",
                        button: "Done",
                    });
                }
                else if (select === "bikes") {
                    firebaseDb.ref("Ads-data/bikes/").push(adsData)
                    console.log(select)
                    swal({
                        title: "Upload Successful!",
                        text: "COngradulation your Bike add is posted",
                        icon: "success",
                        button: "Done",
                    });
                }
                else if (select === "laptop") {
                    firebaseDb.ref("Ads-data/laptop/").push(adsData)
                    console.log(select)
                    swal({
                        title: "Upload Successful!",
                        text: "COngradulation your Laptop add is posted",
                        icon: "success",
                        button: "Done",
                    });
                }
                else {
                    firebaseDb.ref("Ads-data/electronics/").push(adsData)
                    console.log(select)
                    swal({
                        title: "Upload Successful!",
                        text: "COngradulation your Electronic add is posted",
                        icon: "success",
                        button: "Done",
                    });
                }

            })
        })
}) 

// retreiving data from database

firebaseDb.ref("Ads-data").on("value", function(dataSnapShot){
    let addsData = dataSnapShot.val()
    console.log(addsData);
})

function check(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.replace("pages/createAdd.html")
        } else {
            window.location.replace("pages/login/signin.html")
        }
      });
}