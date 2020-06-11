var a=[1,2,3,4]
function rev(){
for(var i=0;i<a.length;i++)
{
console.log(a[a.length-1-i]);
}

}


numArr=[1,1,1,1,1]

function isUniform(numArr) {
  var first = numArr[0];
   for (var i = 1; i < numArr.length; i++) {
     if (numArr[i] !== first) {
       return false;
     }
  }
  return true;
}

val=[1,5,3]
val2=[10,3,5.9]
val3=[-5,100]

function sumArray(val)
{
var sum=0
for(var i=0;i<val.length;i++)
{
sum=sum+val[i]
}
console.log(sum)
}



function max(val)
{
var max=val[0]
for(var i=1;i<val.length;i++)
{
if(val[i]>max)
{
max=val[i]
}
}
console.log(max)
}

