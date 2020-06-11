function iseven(num){
if(num>0)
{
if(num%2==0)
{
return "True";
}
else
{
return "False";
}
}
else if(num==0)
{
return "Zero";
}
}

function fact(num){
var g=1;
for(var i=1;i<=num;i++)
{
g=g*i;
}
return g;
}

function kts(str){
if(str.match("-"))
{
return str.replace("-","_");
}
else
{
return str;
}
}