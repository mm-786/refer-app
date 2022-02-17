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