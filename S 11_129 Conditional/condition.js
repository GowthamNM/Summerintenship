var age=prompt("Enter your Age:");

if(age<1)
{
alert("invalid age");
}

else if(age==21)
{
console.log("Happy "+age+"st birthday!!");
}

else if(age%2!=0)
{
console.log("Your age is odd!");
}

else if(age==1*1 || age==2*2 || age==3*3 || age==4*4 || age==5*5 || age==6*6 || age==7*7 || age==8*8 || age==9*9 || age==10*10)
{
console.log("It's a perfect square!");
}