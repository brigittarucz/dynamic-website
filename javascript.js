let productList = "http://kea-alt-del.dk/t5/api/productlist";
let categoriesList = "http://kea-alt-del.dk/t5/api/categories"
let specificItemList = "http://kea-alt-del.dk/t5/api/product?id=";

let promise = fetch(categoriesList)
.then(e=>e.json())
.then(categ=>showCateg(categ));

let gridSys = document.getElementById("gridSystem");
let ulNavig = document.querySelector("ul");
let modalsLand = document.getElementById("modalsLand");

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
        a.addEventListener("click", ()=>showCategory(category));
        a.style.textTransform = "capitalize";


        li.appendChild(a);
        ulNavig.appendChild(li);
        gridSys.appendChild(h2);
        gridSys.appendChild(divEl);

function showCategory(category) {

  let divsSelected = document.querySelectorAll("[id^='flexboxGrid']");
                divsSelected.forEach(div => {
                    if (div.id == "flexboxGrid" + category) {
                        div.style.display = "flex";
                    } else {
                        div.style.display = "none";
                    }
                });
            };
    }

let allSelect = document.querySelector(".all");
let divsSelected = document.querySelectorAll("[id^='flexboxGrid']");
allSelect.addEventListener("click", showAll);

function showAll() {
    divsSelected.forEach(element=> {
    element.style.display = "flex";
    });
};

}

function loadData(productList) {

fetch(productList).then(e=>e.json()).then(data=>show(data));

}

function show(data) {

    const template = document.querySelector("#template1").content;

data.forEach(functionName);

function functionName(elementTable) {

     const parentElem = document.getElementById("flexboxGrid" + elementTable.category);

    const clone = template.cloneNode(true);


function fetchById() {

     let modal = clone.querySelector(".modalContent");
     let parentModal = clone.querySelector("#modalTemplate");
fetch(specificItemList + elementTable.id)
.then(e=>e.json())
.then(info=>{
    /* Create here the modals and add an id */
    /* Add to each openButton class an id */
    /* You create a function to unhide by searching for id the specific modal */
    modal.querySelector("h3").textContent = info.name;
    modal.querySelector("p").textContent = info.longdescription;
    modal.querySelector("img").setAttribute('src', ("imgs/large/" + info.image + ".jpg"));


    let c = "";
    for (let j=0; j<info.stars; j++) {
        c = c + "<i class=\"fas fa-star\"></i>";
    };

    modal.querySelector("#number").innerHTML = c;


    modal.querySelector("#region").textContent = info.region;
    modal.querySelector(".price").textContent = info.price + " dkk";

    if(info.vegetarian) {
            modal.querySelector(".veg").setAttribute('src',"imgs/vegLogo@0,25x.png");

    }

    if(info.discount) {
         modal.querySelector(".price").classList.add("discount");
        modal.querySelector(".newText").textContent = info.discount + "dkk";

    }

   if(info.soldout) {
       modal.querySelector(".price").classList.add("soldOut");
        modal.querySelector(".newText").textContent = "Sold Out";

   }

    if(info.alcohol) {

    modal.querySelector("#alcohol").textContent = "Alcohol: " + info.alcohol + "%";

    }

    if(info.allergens) {

        modal.querySelector("#allergens").textContent = "Allergens: " + info.allergens;
    }

    parentModal.setAttribute("class", "modal"+info.id);
    parentModal.classList.add("hide");
    modalsLand.appendChild(parentModal);

})
    };
    fetchById();

    let button = clone.querySelector(".openButton");
    let modalTempl = clone.getElementById("#modalTemplate");

    button.setAttribute("class", elementTable.id);
    button.classList.add("openButton");

    button.addEventListener("click", clickFunction);


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

function clickFunction(e) {
    var elem = e.target.classList;
    console.log(document.querySelector("main"));
    console.log(elem[0]);
    var modal = document.querySelector("article.modal"+elem[0]);
    modal.classList.add("modal");
    modal.classList.remove("hide");

    modal.querySelector(".closeButton").addEventListener("click",insertHide);
    function insertHide() {
        modal.classList.add("hide");
    }
}

loadData(productList);
