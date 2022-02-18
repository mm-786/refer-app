<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from "axios";
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  mounted(){
    const user = JSON.parse(window.localStorage.getItem('a22user'))
    if(user!=null){
      axios.get('https://ra22.deta.dev/user/'+user.key).then(d=>{
        window.localStorage.setItem('a22user',JSON.stringify(d.data))
      })
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