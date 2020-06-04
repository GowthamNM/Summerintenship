var num=-10;
console.log("1. All no. between -10 & 19")
while(num>=-10 && num<20)
{
console.log(num);
num++;
}

var num=10;
console.log("2. All even no. between 10 & 40")
while(num>=10 && num<=40)
{
if(num%2==0)
{
console.log(num);
}
num++;
}

var num=300;
console.log("3. All odd no. between 300 & 333")
while(num>=300 && num<=333)
{
if(num%2!=0)
{
console.log(num);
}
num++;
}

var num=5;
console.log("4. All no. /5 && 3  between 5 & 50")
while(num>=5 && num<=50)
{
if(num%5==0 && num%3==0)
{
console.log(num);
}
num++;
}


console.log("1. All no. between -10 & 19 (for loop)")
for(var num=-10;num<=19;num++)
{
console.log(num);
}

console.log("2. All even no. between 10 & 40 (for loop)")
for(var num=10;num<=40;num++)
{
console.log(num);
}

console.log("3. All odd no. between 300 & 333 (for loop)")
for(var num=300;num<=333;num++)
{
if(num%2!=0)
{
console.log(num);
}
}

console.log("4. All no. /5 && 3  between 5 & 50 (for loop)")
for(var num=5;num<=50;num++)
{
if(num%5==0 && num%3==0)
{
console.log(num);
}
}