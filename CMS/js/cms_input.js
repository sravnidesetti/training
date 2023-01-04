let submit=document.querySelector("#add");
let base_url='http://localhost:3000/services';


async function newdata(){
let title=document.querySelector("#title");
let tag=document.querySelector("#tag");
let img=document.querySelector("#image");
let description=document.querySelector("#description");
let selection=document.querySelector("#selection");


        console.log(title.value);
        console.log(img.value);

        let data = {
            Title:title.value,
            Tag:tag.value,
            Img_url:img.value,
            Description:description.value,
            Status:selection.value
       }

    await fetch(base_url,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"}     
    })  
 }
 submit.addEventListener("click",newdata);