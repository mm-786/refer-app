<template>
  <ion-page>
    
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
     <div style="justify-content: space-around; display: flex; margin-top: 15px;">
      <img src="../../public/assets/btxtlogo.svg" width="120" style=" float: right; margin-right: 15px;"/>
     </div>
     <h1 class="text" style="color:black; text-transform: capitalize; margin-left: 25px;">LOGIN</h1>
      <div style="margin: 30px; " v-if="!fp">
        
        <h6 v-if="err" style="color:red; text-transform: capitalize; text-align: center;">{{err}}</h6>
        <ion-item>
          <ion-label style="font-size: small; color: black;" position="floating"
            >Username</ion-label
          >
          <ion-input type="text" v-model="form.username"></ion-input>
          <div class="err">{{ validation.firstError("form.username") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black;" position="floating"
            >Password</ion-label
          >
          <ion-input :type="shwPass?'text':'password'" v-model="form.password"></ion-input>
          <div class="err">{{ validation.firstError("form.password") }}</div>
          <i
            :class="shwPass?'fa fa-eye-slash':'fa fa-eye'"
            @click="shwPass=!shwPass"
            style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
            "
            aria-hidden="true"
          ></i>
        </ion-item>

        <a @click="fp=true" style="color: black; font-weight: bold; margin-top: 5px; float: right;">Forget Password?</a>
        <ion-button
          shape="round"
          @click="err=null; login();"
          style="width: 100%; --background: black; margin-top: 50px"
        >
          LOGIN
        </ion-button>

        <div style="text-align: center; margin: 25px">
          <hr style="background-color: rgb(161, 152, 152); height: 1px" />
          <span
            style="
              margin-top: -22px;
              margin-left: -13px;
              position: absolute;
              background-color: white;
              padding: 5px;
            "
            >OR</span
          >
        </div>
        <div style="text-align: center; margin: 25px">
          <span
            >Don't have an account?
            <a
              style="color: black; font-weight: bold"
              @click="$router.replace('/register')"
            >
              Sign up</a
            ></span
          >
        </div>
      </div>
      <div style="margin: 30px; margin-top: 120px" v-if="fp">
        <i class="fa fa-times" aria-hidden="true" style="float: right;" @click="fp=false"></i>
        <span style="text-align: center; color: green;">{{msg}}</span>
        <span style="text-align: center; color: red;">{{Err}}</span>
  
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Username</ion-label
          >
          <ion-input type="text" v-model="form.username"></ion-input>
        </ion-item>
        <ion-button
        :disabled="form.username==''"
        shape="round"
        @click="SendMail();"
        style="width: 100%; --background: black; margin-top: 50px"
      >
        send mail
      </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
  import {IonContent,IonPage,  IonItem, IonInput,IonButton } from '@ionic/vue';
   import axios from 'axios';
   import md5 from "md5";
    import SimpleVueValidation from 'simple-vue-validator';
    const Validator = SimpleVueValidation.Validator;

export default {
  components: {
    IonContent, 
    IonButton,
    IonItem, 
    IonPage,
    IonInput
},
data(){
  return{
    form:{
      username:'',
      password:''
    },
    shwPass:false,
    err:false,
    fp:false,
    msg:'',
    Err:''
  }
},
validators: {
            'form.password': function (value) {
                return Validator.value(value).required();
            },
            'form.username': function (value) {
                return Validator.value(value).required();
            },
},
methods:{
  async SendMail(){
      axios.post('https://ra22.deta.dev/forget-password',{
        username:this.form.username
      }).then((d)=>{

        this.msg=d.data.message + "\n If not in inbox, please check 'SPAM'"
        setTimeout(() => {
          this.msg="";
          this.fp=false
        }, 3000);
        // this.fp=fase
      }).catch(()=>{
        this.Err = "Not Found!"
        setTimeout(() => {
          this.Err="";
          this.fp=false
        }, 3000);
      })
  },
  async login(){
     const valid = await this.$validate();
                if(valid){
                  this.form.password = md5(this.form.password.toString())
                  axios.post('https://ra22.deta.dev/user/login',this.form).then(d=>{
                    console.log(d.data);
                    window.localStorage.setItem('a22user',JSON.stringify(d.data))
                    this.$router.replace('/home')
                  }).catch(()=>{
                      this.err="invalid Credentials"
                  })
                }
  }
}
}
</script>

<style>
</style>