var span = document.getElementsByClassName('close')[0]
function display(){
    document.getElementById('modal-content').style.display = "block";

}

span.onclick = function(){
    document.getElementById('modal-content').style.display = "none";
}
window.onclick = function(){
    if(event.target == modal) {
        document.getElementById('modal-content').style.display = "none";
    }
}

