<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
    
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  mounted(){
    const user = JSON.parse(window.localStorage.getItem('a22user'))
    if(user!=null){
      this.$router.replace('/home')
    }
  }
});
</script>
<style>
  ion-input{
    color: black;
  }
  ion-item{
    --highlight-color-focused:black;
  }
  ion-lable{
    color: black;
  }
  .err{
    color: red;
    font-size: x-small;
  }
</style>