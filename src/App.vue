<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet,useBackButton, useIonRouter } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import { defineComponent } from 'vue';
import axios from "axios";
const { App } = Plugins;
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
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
      this.$router.replace('/home')
    }
       axios.get('https://ra22.deta.dev/credit').then(d=>{
        window.localStorage.setItem('limit',d.data.w_limit)
      })
  }
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Akaya+Telivigala&family=Dancing+Script:wght@600&family=Shizuru&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kufam&display=swap');
.text0{
  font-family: 'Kufam', sans-serif;
}
.text{
  font-family: 'Shizuru', cursive;
}
.text1{
  font-family: 'Dancing Script', cursive;
}
.text2{
  font-family: 'Akaya Telivigala', cursive;

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