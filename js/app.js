var config = {
    apiKey: "AIzaSyCHQeMujFJHPOgAq1bK-OXXtz9oArzOJx8",
    authDomain: "tourist-guide-system.firebaseapp.com",
    databaseURL: "https://tourist-guide-system.firebaseio.com",
    projectId: "tourist-guide-system",
    storageBucket: "tourist-guide-system.appspot.com",
    messagingSenderId: "750967317816"
};
firebase.initializeApp(config);

var firebaseDb = firebase.database()


// saving add data in database

function submit() {
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
        personName: p_name,
        number: number,
        address: address,
        city: city,
        brandName: b_name,
        title: title,
        model: model,
        price: price,
        description: description,
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
}


// retreiving data from database


function check() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.replace("pages/createAdd.html")
        } else {
            swal({
                icon: "warning",
                text: "Please Login",
                closeOnClickOutside: false,
                timer: 5000,
            });
        }
    });
}


let ads = []
function load() {

    let db = firebase.database();
    db.ref('Ads-data').on('value', function (data) {
        let r_ads = data.val();
        console.log('adfs', r_ads);
        for (categ in r_ads) {
            for (key in r_ads[categ]) {
                ads.push(r_ads[categ][key]);
            }
        }
        console.log("key", key)
        console.log('serialized adds', ads);
        display_ads(ads);
        console.log('serialized random adds', r_ads)
    })

}
function display_ads(ads_data) {

    let str = `<div class="row mb-4">`

    ads_data.forEach((a, i) => {
        if (i % 3 === 0 && i !== 0) {
            console.log("check for 3rd entry", i)
        }
        str += `<div class="col-md-4 mb-4">
                <!-- Card -->
                <div class="card">
  
                  <!-- Card image -->
                  <div class="view overlay">
                    <img class="card-img-top img-fluid" style="width:400px; height:200px;" src="${a.image}"
                      alt="Card image cap">
                    <a href="#!">
                      <div class="mask rgba-white-slight"></div>
                    </a>
                  </div>
  
                  <!-- Card content -->
                  <div class="card-body">
  
                    <!-- Title -->
                    <h4 class="card-title">${a.title}</h4>
                    <!-- Text -->
                    <p class="card-text">${a.price}</p>
                    <p class="card-text">${a.description}</p>
                    <!-- Button -->
                    
                      <button class="btn btn-primary text-center" data-toggle="modal" data-target="#addDetail" onclick="fetch_add('${a.title}')">info</button>
                    
  
                  </div>
  
                </div>
                <!-- Card -->
              </div>
  `;
    });
    str += `</div>`
    document.getElementById('ads_div').innerHTML = str;

}

load();

function fetch_add(k) {
    ads.forEach((a) => {
        if (a.title === k) {
            let md_data = `
                  <!--Header-->
      <div class="modal-header">
        <p class="heading lead">Product Information</p>
  
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="white-text">&times;</span>
        </button>
      </div>
  
      <!--Body-->
      <div class="modal-body">
        <div class="text-center">
          <h2>${a.brandName}</h2>
          <img class="img-fluid" src="${a.image}" alt="Product Image" />
             
        </div>
  
        <div>
        <h3>${a.title}  <span class="p float-right">Price: ${a.price}</span></h3>
        <p>Person Name: ${a.personName}</p>
        <p>Number: ${a.number}</p>  
        <p>Category: ${a.select}</p>
        <p>Model: ${a.model}</p>  
        <p>Address: ${a.address}</p>  
        <p>City: ${a.city}</p>  
        <p>Number: ${a.number}</p>
        <p>Description: ${a.description}</p>  
  
        </div>
      </div>
  
      <!--Footer-->
      <div class="modal-footer justify-content-center">
        <a type="button" class="btn btn-success" onclick="msgDirect()">Send Message <i class="fas fa-envelope ml-1 text-white"></i></a>
        <a type="button" class="btn btn-outline-success waves-effect" data-dismiss="modal">No, thanks</a>
      </div>
        `;
            document.getElementById('add-modal').innerHTML = md_data;
        }
    });

}

function msgDirect(){
    window.location.assign("../pages/chats.html")
}
function filter(input) {
    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        if (a.title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1 ||
            a.select.toLowerCase().indexOf(input.value.toLowerCase()) !== -1) {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}

function car() {

    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        // alert(a.select);

        if (
            a.select == "cars") {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}

function phone() {

    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        // alert(a.select);

        if (
            a.select == "phones") {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}

function property() {

    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        // alert(a.select);

        if (
            a.select == "property") {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}

function bikes() {

    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        // alert(a.select);

        if (
            a.select == "bikes") {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}

function laptop() {

    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        // alert(a.select);

        if (
            a.select == "laptop") {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}

function electronics() {

    // alert(input.value)
    let ads_to_show = [];
    ads.forEach((a) => {
        // alert(a.select);

        if (
            a.select == "electronics") {
            ads_to_show.push(a);
        }
    });
    display_ads(ads_to_show);
}
