var swiper = new Swiper(".popular-content",{
  slidesPerView: 1,
spaceBetween: 10,
autoplay: {
  delay: 755500,
  disableOnInteraction: false,
},
pagination: {
  el: ".swiper-pagination",
  clickable: true,
},
navigation: {
  nextEL: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
},

breakpoints:{
280:{
slidesPerView:1,
spaceBetween: 10,
},

320:{
slidesPerView:2,
spaceBetween: 10,
},

510:{
slidesPerView:2,
spaceBetween: 10,
},

758:{
slidesPerView:3,
spaceBetween: 15,
},

900:{
slidesPerView:4,
spaceBetween: 20,
},
},
 
});
 //Show Video
//1:00:55
let playButton = document.querySelector('.play-music');
let video = document.querySelector('.video-container');
let myvideo = document.querySelector('#myvideo');
let closebtn = document.querySelector('.close-video');

playButton.onclick=()=>{
video.classList.add('show-video');//1:01:58
//Auto Play when Clicked on 

myvideo.play();
}

closebtn.onclick=()=>{
video.classList.remove('');//1:01:58
//Pause on Close Video

myvideo.play();
}