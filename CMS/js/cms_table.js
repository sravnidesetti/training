let tbody=document.querySelector(".tbody");


async function table(){
    console.log("hellooo");
    let getdata=await fetch('http://localhost:3000/services');
     data=await getdata.json();
     console.log(data)
    for(let i=0;i<data.length;i++){
       if(`${data[i].Status}`=="active"){
        tbody.innerHTML+=`<tr>
        <td>${i+1}</td>
        <td>${data[i].Title}</td>
        <td>${data[i].Tag}</td>
        <td><img src="${data[i].Img_url}"></td>
        <td id="description">${data[i].Description}</td>
        <td>${data[i].Status}</td>
        </tr>`
       }   
    }
}
table();


