

var jsonData;
var jsonData1;
var x;
var initialvalue = "";
var nextvalue = 1;
var ten = 10;
var imgurl;
var iteams = document.querySelector(".items");
var previous = document.querySelector(".end_btn1");
var next = document.querySelector(".end_btn2");
var search = document.getElementById('buton');
var changeimg = document.querySelector(".idly1");
var imgs = document.querySelector('#img1');
var listIngradents = document.querySelector(".order");
var recipieIMg=document.querySelector(".right1");
var changeTime=document.querySelector(".svg3");
var textChange=document.querySelector(".title");
 
search.addEventListener('click', Display);
next.addEventListener("click", nextpage);
previous.addEventListener("click", prepage);
previous.style.display = "none";
 

async function Display() {
    iteams.innerHTML="";
    var key = document.getElementById('place').value;
    x = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${key}`)
        // console.log(x);
        .then(async function (y) {
            jsonData = await y.json();
            initial();
 
            console.log(jsonData);
            console.log(y);
        })
}
 
 
function initial() {
 
    for (let i = (nextvalue * ten) - ten; i < nextvalue * ten; i++) {
        iteams.innerHTML +=
            `<button class="idly1" onclick="clicks('${jsonData.recipes[i].recipe_id}')">
            <img src=${jsonData.recipes[i].image_url}  id="img1">
        <div class="content">
            <span class="head1">${jsonData.recipes[i].title}</span>
            <span class= "head2" >${jsonData.recipes[i].publisher} </span>
        </div>
             </button>    `
 
    }
 
}
 
 
function nextpage() {
    previous.style.display = "block";
    iteams.innerHTML = "";
 
    nextvalue++;
 
    console.log(nextvalue);
    if (nextvalue == 3) {
        next.style.display = "none";
 
        console.log("hyy");
    }
    initial();
}
 
 
function prepage() {
    iteams.innerHTML = "";
 
    nextvalue--;
    initial();
    if (nextvalue == -1) {
        previous.style.display = "none";
    }
 
}
 
//changeimg.addEventListener("click",clicks(recipis1));
async function clicks(recipis1) {
    console.log(recipis1);
    listIngradents.innerHTML ="";
    imgurl = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipis1}`)
 
        .then(async function (r) {
            jsonData1 = await r.json();
            //recipiesIngradentList(recipis1);
 
            console.log(jsonData1);
 
            for (let i = 0; i < jsonData1.recipe.ingredients.length; i++) {
                //listIngradents.innerHTML += `<li>${jsonData1.recipe.ingredients[i]} ${jsonData1.recipe.ingredientsdents[i]}
                // ${jsonData1.recipe[i].ingredients[i]}`;
                listIngradents.innerHTML +=`<li><img src="../images/checkicon (1).svg" id="ticks">${jsonData1.recipe.ingredients[i]}</li>`
                console.log(`${jsonData1.recipe.ingredients[i]}`);
                recipieIMg.style.backgroundImage=`url('${jsonData1.recipe.image_url}')`;
                    console.log(`${jsonData1.recipe.image_url}`);
                textChange.innerHTML=`<h2 id="verity1">'${jsonData1.recipe.title}'</h2>`
                console.log(`${jsonData1.recipe.title[i]}`);
                    //changeTime.innerHTML+= `${jsonData1.data.recipe.cooking_time[i]}`;
                    //console.log(`${jsonData1.data.recipe.cooking_time[i]}`);
            }
 
        })
}
 
//function recipiesIngradentList(recipis1) {
//}
 
//console.log(recipiesIngradentList());
    /*changeimg.addEventListener("click",clicking);
function  clicking()
{
console.log("hiiii");
}*/
 

