
//Advanced Email Check credit-
//By JavaScript Kit (http://www.javascriptkit.com)
//Over 200+ free scripts here!

var testresults
function checkemail(){
var str=document.validation.emailcheck.value
var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
if (filter.test(str))
testresults=true
else{
alert("Please input a valid email address!")
testresults=false
}
return (testresults)
}

function checkbae(){
if (document.layers||document.getElementById||document.all)
return checkemail()
else
return true
}


