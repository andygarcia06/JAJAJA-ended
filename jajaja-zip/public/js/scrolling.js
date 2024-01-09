function scrollToTop(page){
    if ((window.innerHeight + window.pageYOffset) == window.innerHeight) {
        window.location.href = '../../recipe3.html';
        console.log('top')}


}

function scrollElem1(page){
if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
    window.location.href = "../../recipe2.html";
    console.log('bottom');
}
}



// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) == document.body.offsetHeight) window.location = "recipe2.html";
// };

window.addEventListener("scroll", scrollElem1);
window.addEventListener("scroll",scrollToTop);
