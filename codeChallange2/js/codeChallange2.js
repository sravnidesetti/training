
 const acccountholder=["Sravani","Ramya"]
 const usernames=["12","34"];
 const userpasswords=["3","5"];
 const balances=[10000,15000];
 let transaction_list=[[],[]];
 let transaction_display="";
 var index;
 var uname=document.getElementById("uname");
 var upassword=document.getElementById("upassword");
 
 
 function  details(){
       document.querySelector(".container").style.display="block";
       document.querySelector(".log").style.display="none";
       document.querySelector(".register").style.display="none";	  
 }

 function check_login(){
	 
	  
	   
           if(usernames.indexOf(uname.value)==-1) {	         
		document.querySelector("#lalert").style.display="block";
		document.querySelector("#lalert").style.backgroundColor="red";
		document.querySelector("#lmessage").textContent="Invalid account number";
            }
           else{ 
		if(usernames.indexOf(uname.value)==userpasswords.indexOf(upassword.value))
		{			
			index=usernames.indexOf(uname.value);
			document.querySelector("#lalert").style.display="none";
			document.querySelector(".container").style.display="none";
			document.querySelector(".body1").style.display="block";
			document.querySelector("#acccountholder").textContent=acccountholder[index];
			document.querySelector("#balance").textContent=balances[index];	 
	        }
	        else{
			document.querySelector("#lalert").style.display="block";
			document.querySelector("#lalert").style.backgroundColor="red";
			document.querySelector("#lmessage").textContent="Invalid details";
		    }
             }
			 uname.value="";
			 upassword.value="";
}
	

function withdraws(){	
	   document.querySelector(".body1").style.display="none";
	   document.querySelector(".withdraw_model").style.display="block";
		
}
	
	   
 function deposits(){
	   document.querySelector(".deposit_model").style.display="block";
	   document.querySelector(".body1").style.display="none";
	  
	}
	
	
 function transaction(types){ 
       document.querySelector(".transaction_model").style.display="block";
       document.querySelector(".body1").style.display="none";
       transaction_display="";        
       if(types=="Wt"){
	   for( var i=0;i< transaction_list[index].length;i++) {
	   		     
		  if(transaction_list[index][i].type=="withdraw"){
				 transaction_display +=`<tr style="background-color:red">
						        <td>${i+1}</td>
						        <td>${transaction_list[index][i].type}</td>
						        <td>${transaction_list[index][i].amount}</td>
						        <td>${transaction_list[index][i].bal}</td>
								<td>${transaction_list[index][i].time}</td>
						   </tr>`	  									  
         }			
	 }  
         }
	else if(types=="Dt"){
	
	   for( var i=0;i< transaction_list[index].length;i++) {
	   		     
	   	 if(transaction_list[index][i].type=="deposit"){
	   	 
		   transaction_display +=`<tr style="background-color:green">
					 <td>${i+1}</td>
					 <td>${transaction_list[index][i].type}</td>
				         <td>${transaction_list[index][i].amount}</td>
				         <td>${transaction_list[index][i].bal}</td>
						 <td>${transaction_list[index][i].time}</td>
													  </tr>`;   									  
		 }
				      
		}		         
		}
            else{	   
	       for(var i=0;i< transaction_list[index].length;i++)
	       {		     
		   let colour=(transaction_list[index][i].type=="withdraw")?"red":"green";
		    transaction_display +=`<tr style="background-color:${colour}">
					   <td>${i+1}</td>
					   <td>${transaction_list[index][i].type}</td>
					   <td>${transaction_list[index][i].amount}</td>
					   <td>${transaction_list[index][i].bal}</td>
					   <td>${transaction_list[index][i].time}</td>
													  </tr>`;
	       }
	       }
	     document.querySelector("#tablebody").innerHTML=transaction_display;	 
	}	
	
 function reset ()
	{
		  document.querySelector(".log").style.display="block";
	      document.querySelector(".register").style.display="block";
		  document.querySelector(".body1").style.display="none";		 
	}
 document.querySelector(".btn").addEventListener("click",check_login);

 document.querySelector("#cancel").addEventListener("click",function(){
	document.querySelector(".container").style.display="block";
	document.querySelector(".body1").style.display="none";
});

 document.querySelector("#cancel1").addEventListener("click",function(){
				document.querySelector(".withdraw_model").style.display="none";
			   document.querySelector(".body1").style.display="block";
			   document.querySelector("#walert").style.display="none";
	   });
	   
 document.querySelector("#wbtn").addEventListener("click",function(){
		   
					withdraw_funds =document.querySelector(".winput");
					parseInt(withdraw_funds.value);
					if(isNaN(withdraw_funds.value))
					{
						document.querySelector("#walert").style.display="block";
						document.querySelector("#walert").style.backgroundColor="red";
						document.querySelector("#wmessage").textContent="Please enter valid amount";
					}
					else if(balances[index]<withdraw_funds.value)
					{
						document.querySelector("#walert").style.display="block";
						document.querySelector("#walert").style.backgroundColor="red";
						document.querySelector("#wmessage").textContent="Insuffient funds";
					}
					else if(balances[index]>=withdraw_funds.value)
					{
						balances[index] -= withdraw_funds.value;
						transaction_list[index].push({type:"withdraw", amount:"-"+""+withdraw_funds.value,bal:balances[index],time:Date()});
						
						document.querySelector("#walert").style.display="block";
						document.querySelector("#walert").style.backgroundColor="green";
						document.querySelector("#wmessage").textContent=`${withdraw_funds.value} withdraw successfully completed`;
						document.querySelector("#balance").textContent=balances[index];
					}
					withdraw_funds.value="";
	   });
	   
  document.querySelector("#cancel2").addEventListener("click",function(){ 
	
	   document.querySelector(".deposit_model").style.display="none";
	   document.querySelector(".body1").style.display="block";
	   document.querySelector("#dalert").style.display="none";
	   });
	   
	   
  document.querySelector("#dbtn").addEventListener("click",function(){

		deposit_funds=parseInt(document.querySelector(".dinput").value);
		if(isNaN(deposit_funds))
		{
		document.querySelector("#dalert").style.display="block";
		document.querySelector("#dalert").style.backgroundColor="red";
		document.querySelector("#dmessage").textContent="Please enter valid amount";
		}
		else{
		balances[index] += deposit_funds;
		transaction_list[index].push({type:"deposit", amount:"+"+""+deposit_funds,bal:balances[index],time:Date()});
		document.querySelector("#balance").textContent=balances[index];
		document.querySelector("#dalert").style.display="block";
		document.querySelector("#dalert").style.backgroundColor="green";
		document.querySelector("#dmessage").textContent=`${deposit_funds} deposit successfully completed`;
		}
		deposit_funds="";
}); 

 document.querySelector("#cancel3").addEventListener("click",function(){
		   document.querySelector(".transaction_model").style.display="none";
		  document.querySelector(".body1").style.display="block";
});


