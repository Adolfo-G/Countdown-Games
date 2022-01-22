var easyEl=document.querySelector("#easy")
var normEl=document.querySelector("#normal")
var hardEl=document.querySelector("#hard")
var playEl=document.querySelector("#play")
easyEl.addEventListener("click",selected)
normEl.addEventListener("click",selected)
hardEl.addEventListener("click",selected)
playEl.addEventListener("click",startGame)
function selected(){
    easyEl.value=""
    normEl.value=""
    hardEl.value=""
    this.value=this.innerHTML
}
function startGame(){
    function modeCheck(){
        var mode=""
        if(easyEl.value!==""){mode=easyEl.value}
        else if(normEl.value!==""){mode=normEl.value}
        else if(hardEl.value!==""){mode=hardEl.value}
        else{mode=""}
        return mode   
    }
    if(modeCheck()!==""){
        var newPage=`triviaQ.html?terms=${modeCheck()}`
        document.location.replace(newPage)
    }
}
