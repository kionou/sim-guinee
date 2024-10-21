<template >
    <div>
       <div class="loadergeneral">
        <div class="loading-circle">
  <div class="circle-segment segment-1"></div>
  <div class="circle-segment segment-2"></div>
  <div class="circle-segment segment-3"></div>
  <div class="circle-segment segment-4"></div>
  <div class="circle-segment segment-5"></div>
  <div class="circle-segment segment-6"></div>
  <div class="circle-segment segment-7"></div>
  <div class="circle-segment segment-8"></div> 
  <div class="circle-segment segment-9"></div>
  <div class="circle-segment segment-10"></div>
  <div class="circle-segment segment-11"></div>
  <div class="circle-segment segment-12"></div>   
</div>
       </div>
           
  
   
</div>
</template>
<script>
export default {
    
}
</script>
<style lang="css" scoped>

.loadergeneral{

  width: 100%;
  height: 50vh;
  background-color: rgb(254, 254, 254);
  display: flex;
  align-items: center;
  justify-content: center;

  
}


.loading-circle {
  margin: 100px auto;
  width: 4rem;
  height: 4rem;
  position: relative;
}
.loading-circle .circle-segment {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.loading-circle .circle-segment:before {
  content: "";
  display: block;
  margin: 0 auto;
  width: 17.3%;
  height: 10%;
  background-color: #006FB4;
  border-radius: 0.25rem;
  -webkit-animation: segmentFadeDelay 1.2s infinite ease-in-out both;
  animation: segmentFadeDelay 1.2s infinite ease-in-out both;
}
.loading-circle .circle-segment.segment-2 {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
.loading-circle .circle-segment.segment-2:before {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.loading-circle .circle-segment.segment-3 {
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}
.loading-circle .circle-segment.segment-3:before {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.loading-circle .circle-segment.segment-4 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.loading-circle .circle-segment.segment-4:before {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.loading-circle .circle-segment.segment-5 {
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}
.loading-circle .circle-segment.segment-5:before {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.loading-circle .circle-segment.segment-6 {
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}
.loading-circle .circle-segment.segment-6:before {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
.loading-circle .circle-segment.segment-7 {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.loading-circle .circle-segment.segment-7:before {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.loading-circle .circle-segment.segment-8 {
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}
.loading-circle .circle-segment.segment-8:before {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.loading-circle .circle-segment.segment-9 {
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}
.loading-circle .circle-segment.segment-9:before {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.loading-circle .circle-segment.segment-10 {
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.loading-circle .circle-segment.segment-10:before {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.loading-circle .circle-segment.segment-11 {
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}
.loading-circle .circle-segment.segment-11:before {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.loading-circle .circle-segment.segment-12 {
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}
.loading-circle .circle-segment.segment-12:before {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes segmentFadeDelay {
  0%, 2%, 100% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
}
@keyframes segmentFadeDelay {
  0%, 2%, 100% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
}
    
</style>