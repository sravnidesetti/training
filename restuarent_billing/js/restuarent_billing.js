const ulList=document.querySelector("#ulList");
const itemdiv=document.querySelector("#itemdiv");
const tbody=document.querySelector(".tbody");
const clear=document.querySelector("#clear");
const total=document.querySelector("#total");
const check=document.querySelector("#check");
const tax=document.querySelector("#tax");
const customer=document.querySelector("#customer");
const pay=document.querySelector("#pay");
const totalOrders=document.querySelector("#totalOrders");
const tbody1=document.querySelector(".tbody1");
const orderspage=document.querySelector("#orderspage");
const curerntpage=document.querySelector("#curerntpage");
const main1=document.querySelector(".main1");
const main=document.querySelector(".main");
const summeryTable=document.querySelector("#summeryTable");
const itemsdisplay=document.querySelector("#itemsdisplay");
const quantity=document.querySelector("#quantity");
var cart=[];var data;
let totalprice=0,taxamount=0,paybleamount=0,itemprice=0;

noOfOrders();
getItems();



//to display the menu items
async function getItems(){
    let itemsdata= await fetch('http://localhost:3000/items/');
     data=await itemsdata.json();
    data.forEach(element => {
        ulList.innerHTML +=`<li>
                            <div id="itemdiv" onclick=billing(${element.id})>
                                <p >${element.itemName}</p>
                                <p >${element.price}</p>                 
                            </div>
                     </li>`     
    });
}


// to add selected items into the billing
 function billing(elementid){
   
    cart.push({"Name":data[elementid-1].itemName,
        "quantity":1,  
        "cost":data[elementid-1].price});  

    tbody.innerHTML="";
   for(let i=0;i<cart.length;i++){
   tbody.innerHTML +=`<tr>
                      <td>${cart[i].Name}</td>
                      <td><input type="text"  id="quantity${i}"  value=${cart[i].quantity}  onchange="quantityChange(${i})"></td>
                      <td id="price${i}">${cart[i].cost}</td>
                    </tr>`
  } 
}




//to change the prices based on the quantity
function quantityChange(j){
    let Quantity  = document.querySelector(`#quantity${j}`);
    let Price=document.querySelector(`#price${j}`);
    let temp=`${cart[j].cost/cart[j].quantity}`
    cart[j].quantity=Quantity.value;
    cart[j].cost=(`${Quantity.value*temp}`);
    Price.innerHTML=(`${Quantity.value*temp}`);
  }





//to check the total bill
function totalcount(){
    totalprice=0;
   for(i=0;i<cart.length;i++){
    totalprice+=parseInt(cart[i].cost);
   }
   taxamount=totalprice*0.04;
   paybleamount=totalprice+taxamount
   tax.innerHTML=taxamount;
   total.innerHTML=paybleamount;
}



//clearing the cart
function cleardata(){
    tbody.innerHTML="";
    customer.value="";
    cart=[];
    tax.innerHTML=0;
    total.innerHTML=0;
}



//paying the bill
async function payment(){
    await fetch('http://localhost:3000/orders',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            customerName:customer.value,
            totalamount:totalprice,
            billamount:paybleamount,
            taxes:taxamount,
            orderitems:cart
       })        
        })
        cleardata();
        noOfOrders();
    }


    //to display the no of orders
function noOfOrders(){
    fetch('http://localhost:3000/orders')
    .then(x=>{return x.json()})
    .then(y=>{ 
           totalOrders.innerHTML=y.length;   
       }) 
       jsontable();  
   }
   
   
   //to print the previous orders in the table
   function jsontable(){
       tbody1.innerHTML ="";
       fetch('http://localhost:3000/orders/')
       .then(x=>{return x.json()})
    .then(y=>{ 
       y.forEach(element =>{
           tbody1.innerHTML +=`<tr>
                                   <td>${element.customerName}</td>
                                   <td>${element.totalamount}</td>
                                   <td>${element.taxes}</td>
                                   <td>${element.billamount}</td>
                                   <td><button onclick="ordersummery(${element.id})">ITEMS</button></td>
                             <tr>`         
           });  
       })   
   }
   
   
   
   //previous orders table orders summery
    function ordersummery(i){
        summeryTable.style.display="block";
       summeryTable.innerHTML="";
     fetch('http://localhost:3000/orders/'+i)
    .then(x=>{return x.json()})
    .then(y=>{ 
   
       summeryTable.innerHTML +=`<tr>
                                    <td><h3>***ORDER SUMMERY***</h3> </td>
                                    <td><span id="cancel" onclick="disappear()">&times</span></td>
                                </tr><br>
                                <tr> <h4>Customer :</h4>${y.customerName}</tr>`
       for(let j=0;j<y.orderitems.length;j++){
       summeryTable.innerHTML += `
                                   <tr>
                                       <td>${y.orderitems[j].Name}</td>
                                       <td>${y.orderitems[j].quantity} * ${(y.orderitems[j].cost)/(y.orderitems[j].quantity)} =<td>
                                       <td>${y.orderitems[j].cost}</td>
                                       </tr>`
       }                                    
       summeryTable.innerHTML +=` <tr id="itemsdisplay"></tr><br>
                                <tr><h4>total = </h4>${y.totalamount}<tr><br>
                                <tr><h4>Tax = </h4>${y.taxes}  (4% of total)</tr><br>
                                <tr> <h4>paid amount =  </h4>${y.billamount}(${y.totalamount} + ${y.taxes})</tr>`
   }) 
   }


   //to make order summery display none 
   function disappear(){
    summeryTable.style.display="none";
   }



 //to clear the data in the billing  
clear.addEventListener("click",cleardata);


// to count the total and discount and taxes
check.addEventListener("click",totalcount);


// to confirm order and make payment
pay.addEventListener("click",()=>{
    if( ((tbody.value==="")&&(customer.value===""))||(tbody.value==="")){
        alert("please select the items you want to order");
    }
    else if(customer.value===""){
        alert("please select the items you want to order");
    }
    else{
        payment();
    }

});



//for previous orders page
orderspage.addEventListener("click",()=>{
       main1.style.display="block";
       main.style.display="none";
}
);



//for the menu and billing page 
curerntpage.addEventListener("click",()=>{
    main1.style.display="none";
    main.style.display="block";
    disappear();
});

