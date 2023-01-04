
var number=Math.ceil(Math.random()*20);
var highscore=0;
var SCORE=20;
var guess,valid;

document.querySelector(".message").innerHTML="Start guessing......";
document.querySelector(".score").innerHTML="Score:"+SCORE;
function check()
{
	guess=document.querySelector(".input").value;
	if(guess=="")
	{
		document.querySelector(".message").style.color="red";
		document.querySelector(".message").innerHTML="Input can't be empty";
    }
	else if(isNaN(guess))
	{
		document.querySelector(".message").style.color="red";
	    document.querySelector(".message").innerHTML="enter numbers only";
	}
	else if(guess<1|| guess>20)
	{
		document.querySelector(".message").style.color="red";
	    document.querySelector(".message").innerHTML="enter a number between 1 to 20";
    }
	else if(guess<number)
	{
		
		document.querySelector(".message").innerHTML="Too low";
		document.querySelector(".message").style.color="white";
		SCORE=SCORE-1;
		document.querySelector(".score").innerHTML="Score:"+SCORE;
	}
	else if(guess>number)
	{
		document.querySelector(".message").innerHTML="Too high";
		document.querySelector(".message").style.color="white";
	    SCORE=SCORE-1;
		document.querySelector(".score").innerHTML="Score:"+SCORE;
	}		
	else if(number==guess)
	{
		document.querySelector(".colour").style.backgroundColor ="green";
		document.querySelector(".message").innerHTML="Hurray! you win";
		document.querySelector(".qs").innerHTML=+guess;
		if(highscore<SCORE)
		{
			highscore=SCORE;
		    document.querySelector(".hscore").innerHTML="&#127941;Highscore:"+highscore;	
		}
		else
		{
			highscore=highscore;
			document.querySelector(".hscore").innerHTML="&#127941;Highscore:"+highscore;	
		}
		document.querySelector(".check").disabled=true;
	}
} 
	function again()
	{
		clear();
	 	number=Math.ceil(Math.random()*20);
		guess=document.querySelector(".input").value;
		document.querySelector(".check").disabled=false;
		document.querySelector(".qs").innerHTML="?";
		document.querySelector(".colour").style.backgroundColor ="black";
		document.querySelector(".hscore").innerHTML="&#127941;Highscore:"+highscore;	
		document.querySelector(".score").innerHTML="&#128175;Score:"+20;		
	}
	function clear()
	{	
		document.querySelector(".input").value="";
	}	