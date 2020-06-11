var se=document.querySelector("#ss");
var mi=document.querySelector("#mm");
var hr=document.querySelector("#hh");
var startbutton=document.getElementById("start");
var sec=59;
var min=60;
var hrs=23;

   function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

startbutton.addEventListener("click",async function(){
while(sec>=00 && min >=00 && hrs>00){
if(sec>00)
{
	sec=Number(sec)-1;
	await sleep(60);
	se.textContent=sec;
}
if(sec==00)
{
	min=Number(min)-1;
	sec=60
	await sleep(60);
	mi.textContent=min;
}
if(min==00)
{
	hrs=Number(hrs)-1;
	min=60
	await sleep(60);
	hr.textContent=hrs
}
}});