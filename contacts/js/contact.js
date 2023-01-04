 let tbody=document.querySelector(".tbody");
 let input_name=document.querySelector("#input_name");
 let input_number=document.querySelector("#input_number");
 let input_email=document.querySelector("#input_email");
 let input_dob=document.querySelector("#input_dob");
 let btn_submit=document.querySelector("#btn_submit");
 let btn_modify=document.querySelector("#btn_modify");
 let base_url='http://localhost:3000/contacts/';
let user_id;
getdata();

//fetching all data display table
function getdata(){
        input_name.value="";
        input_number.value="";
        input_email.value="";
        input_dob.value="";
        tbody.innerHTML ="";
        fetch(base_url)
        .then(x=>{return x.json()})
        .then(y=>{
            y.forEach(element => {
                tbody.innerHTML += `<tr>
                                <td>${element.Name}</td>
                                <td>${element.number}</td>
                                <td>${element.email}</td>
                                <td>${element.date0fBirth}</td>
                                <td><button onclick="view(${element.id})">edit</td>
                                <td><button onclick="delete_data(${element.id})">delete</td>
                                <tr>`
            })
        })
        }

//adding new data using post method
async function newdata(){
    await fetch(base_url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            Name:input_name.value,
            number:input_number.value,
            email:input_email.value,
            date0fBirth:input_dob.value
       })        
        })
        getdata();     
 }

 //for deleting a single data
 function delete_data(serialNumber){
       fetch(`http://localhost:3000/contacts/${serialNumber}`,{
        method:"delete",
        headers:{"Content-Type":"application/json"},
 })
     getdata(); 
}

//for updating the existing data
 async function edit(){         
 await fetch(`http://localhost:3000/contacts/${user_id}`,{
        method:"put",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            Name:input_name.value,
            number:input_number.value,
            email:input_email.value,
            date0fBirth:input_dob.value,
       })        
        })
        getdata();  
        
 }
 btn_submit.addEventListener('click',newdata);
 


 //to view the existing data in the input fields while updating
async function view(serial){
   let data= await fetch(`http://localhost:3000/contacts/${serial}`);
   let dataC= await data.json();
   
   input_name.value=dataC.Name;
   input_number.value=dataC.number;
   input_email.value=dataC.email;
   input_dob.value=dataC.date0fBirth;
   user_id=serial;
   btn_modify.addEventListener('click',edit);
   
} 
