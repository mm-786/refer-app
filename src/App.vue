<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet,useBackButton, useIonRouter } from '@ionic/vue';

import { App } from '@capacitor/app';
import { defineComponent } from 'vue';
import axios from "axios";

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
  data(){
    return{
      link:false
    }
  },
  mounted(){
    App.addListener('appUrlOpen',  async function (data) {
        const code = await data.url.split('?')
        this.link=true
      
        if(code[1]!=undefined){
          window.localStorage.clear();
            this.$router.replace('/register?'+code[1])
        }
    });

  if(!this.link){
    const user = JSON.parse(window.localStorage.getItem('a22user'))
    
    if(user!=null){
      axios.get('https://ra22.deta.dev/claim-now/'+user.key).then(dd=>{
          // console.log(dd.data.msg);
                      this.$store.commit('claim',dd.data.msg)
                   })
      axios.get('https://ra22.deta.dev/user/'+user.key).then(d=>{
        // console.log(d.data);
        window.localStorage.setItem('a22user',JSON.stringify(d.data))
        if(d.data.password != user.password){
          window.localStorage.clear();
          this.$router.replace('/login')
        }
      })
      this.$router.replace('/home')
    }
    // else{
    //   this.$router.replace('/login')
    // }
  }
       axios.get('https://ra22.deta.dev/credit').then(d=>{
        window.localStorage.setItem('limit',d.data.w_limit)
      })
       axios.get('https://ra22.deta.dev/offer').then(async (d)=>{
        await this.$store.commit('offer',d.data)
      })
  }
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Akaya+Telivigala&family=Dancing+Script:wght@600&family=Shizuru&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kufam&display=swap");
.text0 {
  font-family: "Kufam", sans-serif;
}
.text {
  font-family: "Shizuru", cursive;
}
.text1 {
  font-family: "Dancing Script", cursive;
}
.text2 {
  font-family: "Akaya Telivigala", cursive;
}
ion-input {
  color: black;
}
ion-item {
  --highlight-color-focused: black;
}
ion-lable {
  color: black;
}
.err {
  color: red;
  font-size: x-small;
}
</style>