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
        if(d.data.password != user.password){
          window.localStorage.clear();
          this.$router.replace('/login')
        }
      })
      axios.get('https://ra22.deta.dev/credit').then(d=>{
        window.localStorage.setItem('limit',d.data.w_limit)
      })
      this.$router.replace('/home')
    }
  }
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Shizuru&display=swap');
.text{
  font-family: 'Shizuru', cursive;
}

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