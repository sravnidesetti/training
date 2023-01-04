let main=document.querySelector(".main");


async function table(){
    console.log("hellooo");
    let getdata=await fetch('http://localhost:3000/services');
     data=await getdata.json();
     console.log(data)
    for(let i=0;i<data.length;i++){
       if(`${data[i].Status}`=="active"){
        main.innerHTML+=`<div id="service-div">
                            <div id="total_images">
                                <div id="serviceimg-div">
                                    <img src="${data[i].Img_url}">
                                </div>
                                <div id="si-div">
                                    <h1>${i+1}</h1>
                                </div>
                            </div>
                                    <h4 id="title">${data[i].Title}</h4>
                                    <h7>${data[i].Tag}</h7>
                                    <h6>${data[i].Description}</h6>
                        </div>`
       }   
    }
}
table();
