const btn_previous=document.querySelector("#btn-previous");
const btn_next=document.querySelector("#btn-next");
const searchbutton=document.querySelector("#searchbutton");
const search=document.querySelector("#searchbar");
const publisher=document.querySelector("#recipe_change");
const coocking_time=document.querySelector("#time_change");
const no_of_servings=document.querySelector("#person_change");
const plus=document.querySelector("#plus");
const minus=document.querySelector("#minus");
const display_img=document.querySelector("#display_img");
const textlogo1=document.querySelector("#textlogo1");
const main_left=document.querySelector(".main_left");
const ingredients_list=document.querySelector("#ingredients_list");
const BASE_URL='https://forkify-api.herokuapp.com/api/v2/recipes';
let array1=[];



//to dispaly items in the menu bar
async function getdata(){
    main_left.innerHTML="";
    let keyword =search.value;
    const ITEM_URL=`${BASE_URL}?search=${keyword}`;
    console.log(keyword);
    console.log(ITEM_URL)
    let fetch_data= await fetch(ITEM_URL);
    let data1= await fetch_data.json();
    for(let i=0;i<10;i++) {
        main_left.innerHTML += `<li>
                        <div class="item"  onclick="selectedItem('${data1.data.recipes[i].id}')">
                                <img src="${data1.data.recipes[i].image_url}" class="item_logo">
                                <span class="head1"> ${data1.data.recipes[i].title}</span><br>
                                <span class="head2"> ${data1.data.recipes[i].publisher}</span>
                        </div>
                    </li>`
                    console.log(`${data1.data.recipes[i].id}`)
                    console.log(typeof`${data1.data.recipes[i].id}`);      
    }
}


//to display the details of a selected item
 async function selectedItem (k){
        array1=[];
        ingredients_list.innerHTML="";
        console.log(k);
        const USER_URL=`${BASE_URL}/`+k;             
        let fetch_data=await fetch(USER_URL);
        let data1= await fetch_data.json();
        display_img.src=`${data1.data.recipe.image_url}`;
        coocking_time.innerHTML=`${data1.data.recipe.cooking_time}`;
        no_of_servings.value
        textlogo1.textContent=`${data1.data.recipe.title}`;
        console.log(`${data1.data.recipe.servings}`)
        publisher.innerHTML=`<a id="recipe_change" href=${data1.data.recipe.source_url}>${data1.data.recipe.publisher}<a>`;
        data1.data.recipe.ingredients.forEach(element => {
            array1.push({quantity:`${element.quantity}`,unit:`${element.unit}`,description:`${element.description}`,serving:`${data1.data.recipe.servings}`}) 
        });             
        console.log(array1);
        array1.forEach(element=>{
        ingredients_list.innerHTML +=`<li>${element.quantity}  ${element.unit}  ${element.description}</li>`
     })
}


//button call the getdata function
searchbutton.addEventListener("click",getdata);



