<template >
    <div>
        <div class="pulse-container">
    <img src="../../assets/img/logo_mobile.png" alt="" class="pulse-image">
</div>



    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="css" scoped>

.pulse-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}

.pulse-image {
  width: 100px; 
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.2);
    opacity: 1;
  }
}


    
</style>