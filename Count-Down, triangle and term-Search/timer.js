var day=document.querySelector("#dd");
var hrs=document.querySelector("#hh");
var min=document.querySelector("#mm");
var sec=document.querySelector("#ss");
var startbtn=document.querySelector("#start");
var time=86415;
startbtn.addEventListener("click",function(){
	var timer=setInterval(()=>{
		if(time==0){
			clearInterval(timer);
		}
	if(time>=0)
	{
		var days= parseInt(time/86400);
		var hrss= parseInt((time/3600)%24);
		var mins= parseInt((time/60)%60);
		var secs= parseInt(time%60);
		day.textContent=days;
		hrs.textContent=hrss;
		min.textContent=mins;
		sec.textContent=secs;
		time--;
	}
	},1000);
});
