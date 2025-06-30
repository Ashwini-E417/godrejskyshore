const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click",toogleMenu);

function toogleMenu() {
    sidebar.classList.toggle("menuActive");
}

//hiding menu after clicking the link
[...document.getElementsByClassName("menu-item")].forEach(element => {
    element.addEventListener("click",toogleMenu);
});

// for smooth scrolling behaviour
document.querySelectorAll([".nav-item",".menu-item"]).forEach(element =>{
    element.addEventListener("click",function(e){
        e.preventDefault();
        const target = this.getAttribute("href").substring(1);
        let targetsection = document.getElementById(target);

        if (targetsection) {
            targetsection.scrollIntoView({
                behavior: "smooth",
            })
        }
    })
});

//incresing the overview para
document.querySelectorAll(".readMoreBtn").forEach((element,index) =>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        let clamp = document.getElementsByClassName("clamptext")[index];
        console.log(clamp.style.display);
        if (clamp.style.display!="block"){
            console.log("hi");
            clamp.style.display="block";
            element.innerHTML ="Read Less";
            clamp.style.webkitLineClamp = "unset";
        }
        else{
            clamp.style.display="-webkit-box";
            clamp.style.webkitLineClamp = 6;
            element.innerHTML="Read More";
            console.log("bye");
            clamp.scrollIntoView({
                behavior:'smooth',
            })
        }
    })

})

//amenities JS
let amenitiesCard = document.querySelectorAll(".amenities-card");
let amenitiesCarousel = document.getElementById("amenities-carousel");
var amenitiesCount;
let index = 0;

let amen_prevBtn = document.getElementById("amenities-prevBtn");
let amen_nextBtn = document.getElementById("amenities-nextBtn");

amen_prevBtn.addEventListener("click",function(){
    if (index==0) {index = amenitiesCard.length - 1;}
    else {index = index - 1;}
    hightlighActive();
})

amen_nextBtn.addEventListener("click",function(){
    addActiveIndex();
    hightlighActive();
})

function hightlighActive() {
    amenitiesCard.forEach((element,i) => {
        element.classList.remove("highlight");
        amenitiesCount[i].classList.remove("active");
    })
    amenitiesCard[index].classList.add("highlight");
    amenitiesCount[index].classList.add("active");
    let offset;
    if (window.innerWidth>"1024") {
        offset = 150;
    }
    else {
        offset = 100;
    }
    amenitiesCarousel.scrollTo({
        left: amenitiesCard[index].offsetLeft-offset,
        behavior:'smooth',
    });
}

window.addEventListener("load",function(){
    let carouselTotal = this.document.getElementById("cauroselTotal");

    for(let i=0;i<amenitiesCard.length;i++){
        const newdiv = document.createElement("div");
        newdiv.classList.add("carouselCount");
        carouselTotal.appendChild(newdiv);
    }
    amenitiesCount = document.querySelectorAll(".carouselCount");
    hightlighActive();
});

setInterval(function(){
    addActiveIndex();
    hightlighActive();
},3000)

function addActiveIndex(){
    if (index==(amenitiesCard.length - 1)) {index = 0;}
    else {index = index + 1;}
}

//onclick display image
let amenitiesImage = document.querySelectorAll(".amenities-card img");
let imageHolder = document.getElementById("image-holder");
let amenitiesPopup = document.getElementById("amenities-popupModal");
let activeIndex;

amenitiesImage.forEach((element,index) => {
    element.addEventListener("click",function() {
        console.log("hello");
        const path = element.src.substring();
        imageHolder.src = path;
        amenitiesPopup.style.display = "block";
        console.log(amenitiesPopup.style.display);
        activeIndex = index;
    })
})

//popupclose 

let amenitiesClose = document.querySelector("#amenities-popupclose");
amenitiesClose.addEventListener("click",function(){
    amenitiesPopup.style.display = "none";
})


//popup navigation menu
let amenpopprev = document.querySelector("#amenities-popupprev");
let amenpopnext = document.querySelector("#amenities-popupnext");

amenpopprev.addEventListener("click",()=>{
    if (activeIndex==0) {activeIndex = amenitiesImage.length - 1;}
    else {activeIndex = activeIndex - 1;}
    imageHolder.src = amenitiesImage[activeIndex].src;
})
amenpopnext.addEventListener("click",()=>{
    if (activeIndex==(amenitiesImage.length - 1)) {activeIndex = 0;}
    else {activeIndex = activeIndex + 1;}
    imageHolder.src = amenitiesImage[activeIndex].src;
})