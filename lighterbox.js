//By: Richard Lee - Transcendent Design - tdesignonline.com
var closeimagelink="/lighterbox/closebutton2.gif"//closebutton image
var loaderimagelink="/lighterbox/loader3.gif"//loader image
var IE6=(navigator.userAgent.indexOf("MSIE 6")>=0)
var IE7=(navigator.userAgent.indexOf("MSIE 7")>=0)
var IE8=(navigator.userAgent.indexOf("MSIE 8")>=0)
var opera=(navigator.userAgent.indexOf("Opera")>=0)
var thebody=document.getElementsByTagName('body')
var lbox=document.createElement("div")
lbox.setAttribute('id','lighterbox')
thebody[0].appendChild(lbox)
thebody[0].insertBefore(lbox,thebody[0].firstChild)
var lighterboxwrapper=document.createElement("div")
lighterboxwrapper.setAttribute('id','lighterboxwrapper')
lbox.appendChild(lighterboxwrapper)
var labox=document.createElement("div")
labox.setAttribute('id','lighterboxcontent')
lighterboxwrapper.appendChild(labox)
var portimage=document.createElement('img')
portimage.setAttribute('src','none')
portimage.setAttribute('id','portimage')
labox.appendChild(portimage)
var lboxlink=document.createElement('a')
lboxlink.setAttribute('id','closebutton')
labox.appendChild(lboxlink)
var closeimg=document.createElement('img')
closeimg.setAttribute('src',closeimagelink)
closeimg.setAttribute('id','lightercloseimage')
lboxlink.appendChild(closeimg)
lbox.onclick=function(){
document.getElementById('portimage').setAttribute('src','none')
lighterbox.setAttribute('class','hide')
lighterbox.style.display="none"}
var piclinks=document.getElementsByTagName('a')
var lighterbox=document.getElementById('lighterbox')
var bigpic=lighterbox.getElementsByTagName('img')
var thepage=document.getElementById('page')
var z
for(z=0;z<piclinks.length;z++){
if(piclinks[z].getAttribute('rel')=='lighterbox'){
piclinks[z].onclick=function(){
return setpic(this)}}
else{}}
var closebutton=document.getElementById('closebutton')
closebutton.onclick=function(){
lighterbox.setAttribute('class','hide')
lighterbox.style.display="none"
document.getElementById('portimage').setAttribute('src','none')}
function setpic(thispic){
var source=thispic.getAttribute("href")
var placeholder=document.getElementById("placeholder")
var description=document.getElementById("lighterbox")
if(thispic.getAttribute('rel')=='lighterbox'){
function setdim(){
var imgdim=document.getElementById('portimage')
var wrapper=document.getElementById('lighterboxwrapper')
imgdim.onload=function(){
var bwidth3=document.documentElement.clientWidth
var imgdimh=document.getElementById('portimage').height
var imgdimw=document.getElementById('portimage').width
wrapper.style.left=((bwidth3-imgdimw)/2)+"px"
wrapper.style.width=imgdimw+"px"
wrapper.style.height=imgdimh+"px"
document.getElementById('lighterbox').style.width=bwidth3+"px"
document.getElementById('loadingimg').setAttribute('class','hide')
document.getElementById('loadingimg').style.display="none"
setTimeout("lighterbox.setAttribute('class','show')",75)
setTimeout("lighterbox.style.display='block'",75)}}
if(document.getElementById('loadingimg')==null){
var bwidth2=document.documentElement.clientWidth
var loadingimg=document.createElement('img')
loadingimg.setAttribute('src',loaderimagelink)
loadingimg.setAttribute('id','loadingimg')
thebody[0].appendChild(loadingimg)
document.getElementById('loadingimg').style.left=(bwidth2/2)+"px"
document.getElementById('loadingimg').setAttribute('class','hide')
document.getElementById('loadingimg').style.display="none"}
else{
var bwidth=document.documentElement.clientWidth
document.getElementById('loadingimg').setAttribute('class','show')
document.getElementById('loadingimg').style.display="block"
var loadwidth=document.getElementById('loadingimg').width
document.getElementById('loadingimg').style.left=(bwidth-loadwidth)/2+"px"}
bigpic[0].setAttribute('src',source)
setdim()
return false}}
function timedCount(){
var bwidth4=document.documentElement.clientWidth
var bheight4=document.documentElement.clientHeight
var imgdimh4=document.getElementById('portimage').height
var imgdimw4=document.getElementById('portimage').width
var wrapper4=document.getElementById('lighterboxwrapper')
lighterbox.style.minHeight="700px"
wrapper4.style.left=((bwidth4-imgdimw4)/2)+"px"
wrapper4.style.position="absolute"
thebody[0].style.minHeight="800px"
if(IE6){
wrapper4.style.top=(((bheight4-imgdimh4)/2)+document.documentElement.scrollTop)+"px";}
else if(opera){wrapper4.style.top=((bheight4-imgdimh4-150)/2)+"px";}
else{wrapper4.style.top=((bheight4-imgdimh4)/2)+"px";}
if(IE7 || IE8){wrapper4.style.top=((bheight4-imgdimh4)/2)+"px";}

setTimeout("timedCount()",1)}
timedCount()