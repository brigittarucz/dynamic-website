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

let productList = "http://kea-alt-del.dk/t5/api/productlist";
let categoriesList = "http://kea-alt-del.dk/t5/api/categories"

let promise = fetch(categoriesList).then(e=>e.json()).then(categ=>showCateg(categ));

let gridSys = document.getElementById("gridSystem");
let ulNavig = document.querySelector("ul");

function showCateg(categ) {
    categ.forEach(createDivs);
    function createDivs(category) {
        const divEl = document.createElement("div");
        const h2 = document.createElement("h2");
        h2.style.textTransform = "capitalize";
        divEl.id = "flexboxGrid" + category;
        h2.textContent = category;

        /* Creating the nav filter */

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = category;
        a.href = "#";
        a.addEventListener("click", ()=>filterCateg(category));
        a.style.textTransform = "capitalize";

        li.appendChild(a);
        ulNavig.appendChild(li);
        gridSys.appendChild(h2);
        gridSys.appendChild(divEl);
    }
}

/* function filterCateg(category) {
    document.querySelectorAll("div #flexboxGrid"+category).forEach( div => {

    })
}
*/

function loadData(productList) {

fetch(productList).then(e=>e.json()).then(data=>show(data));

}

function show(data) {

    const template = document.querySelector("#template1").content;

data.forEach(functionName);

function functionName(elementTable) {

     const parentElem = document.getElementById("flexboxGrid" + elementTable.category);

    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = elementTable.name;
    clone.querySelector("#description").textContent = elementTable.shortdescription;
    clone.querySelector("img").setAttribute('src', ("imgs/large/" + elementTable.image + ".jpg"));
    clone.querySelector("#number").textContent = elementTable.stars;
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

    parentElem.appendChild(clone);

}

}

loadData(productList);

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

