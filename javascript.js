var database = [
    {
    name: "Russian Ringbread",
    id: 10,
    category: "starter",
    related: 60,
    price: 29,
    soldOut: false,
    discount: 10,
    shortDescription: "Russisk ringbrød af Karapatisk mel",
    longDescription: "Russisk ringbrød efter en klassisk opskrift fra Karapatien. Dejen blandes koldhæver 30 dage, inde brødet bages over bål. Meget sprødt, godt med Karapatisk bjerggedsmør.",
    region: "Karapatien",
    vegetarian: true,
    allergens: "laktose",
    alcohol: false,
    image: "ringbroed-druer",
    stars: 1
    }
]

let myLink = "http://kea-alt-del.dk/t5/api/productlist";

function loadData(link){

fetch(link).then(e=>e.json()).then(data=>show(data));

}

function show(data) {

    const template = document.querySelector("#template1").content;
    const templateModal = document.querySelector("#template2").content;

data.forEach(functionName);

function functionName(elementTable) {

     const parentElem = document.getElementById("flexboxGrid" + elementTable.category);

    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = elementTable.name;
    clone.querySelector("#description").textContent = elementTable.shortdescription;
    clone.querySelector("img").setAttribute('src', ("imgs/large/" + elementTable.image + ".jpg"));
    clone.querySelector("#number").textContent = elementTable.stars;
    console.log(elementTable.image);
    clone.querySelector("#region").textContent = elementTable.region;
    clone.querySelector(".price").textContent = elementTable.price + " dkk";

    if(elementTable.vegetarian) {
            clone.querySelector(".veg").setAttribute('src',"imgs/vegLogo@0,25x.png");

    }

    if(elementTable.discount) {
         clone.querySelector(".price").classList.add("discount");
        clone.querySelector(".newText").textContent = elementTable.discount + "dkk";

    }

   if(elementTable.soldout) {
       clone.querySelector(".price").classList.add("soldOut");
        clone.querySelector(".newText").textContent = "Sold Out";

   }

    if(elementTable.alcohol) {

    clone.querySelector("#alcohol").textContent = "Alcohol: " + elementTable.alcohol + "%";

    }

    if(elementTable.allergens) {

        clone.querySelector("#allergens").textContent = "Allergens: " + elementTable.allergens;
    }

    if(elementTable.alcohol && elementTable.allergens) {
        clone.querySelector("#allergens").style.marginTop = "-10px";
    }

    const cloneModal = templateModal.cloneNode(true);
    cloneModal.querySelector("#longDescrip").textContent = elementTable.longDescription;

    parentElem.appendChild(clone);

    parentElem.appendChild(cloneModal);

}

    const genInfo = document.getElementById("generalInfo");
    const cloneGenInfo = genInfo.cloneNode(true);
    const modalCont = document.getElementById("modalContent");
    modalCont.appendChild(cloneGenInfo);

}

loadData(myLink);

var numberStars = document.querySelectorAll("#number");
var arrayLength = numberStars.length;

for (var i = 0; i < arrayLength; i++) {
    console.log(numberStars[i]);
    var a = numberStars[i].innerText;
    var b = parseInt(a);
    var c = "";

    for(let j = 0; j < b; j++) {
    c = c + "<i class=\"fas fa-star\"></i>";
    }

    numberStars[i].innerHTML = c;

}

var modalElem = document.getElementById("modalTemplate");
var openButton = document.querySelector("button.openButton");
var closeButton = document.querySelector("button.closeButton");

openButton.onclick = function() {
    modalElem.style.display = "block";
}

closeButton.onclick = function() {
    modalElem.style.display = "none";
}
