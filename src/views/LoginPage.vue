<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <i
        class="fa fa-question-circle"
        @click="$router.push('/help')"
        style="color: black; float: right; margin: 5px"
        aria-hidden="true"
      ></i>
      <div
        style="justify-content: space-around; display: flex; margin-top: 15px"
      >
        <img
          src="../../public/assets/btxtlogo.svg"
          width="120"
          style="float: right; margin-right: 15px"
        />
      </div>
      <h1
        class="text2"
        style="color: black; text-transform: capitalize; margin-left: 25px"
      >
        {{ fp ? "forget password" : "login" }}
      </h1>
      <div style="margin: 30px" v-if="!fp">
        <h6
          v-if="err"
          style="color: red; text-transform: capitalize; text-align: center"
        >
          {{ err }}
        </h6>
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Username</ion-label
          >
          <ion-input type="text" v-model="form.username"></ion-input>
          <div class="err">{{ validation.firstError("form.username") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Password</ion-label
          >
          <ion-input
            :type="shwPass ? 'text' : 'password'"
            v-model="form.password"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.password") }}</div>
          <i
            :class="shwPass ? 'fa fa-eye-slash' : 'fa fa-eye'"
            @click="shwPass = !shwPass"
            style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
            "
            aria-hidden="true"
          ></i>
        </ion-item>

        <a
          @click="fp = true"
          class="text0"
          style="color: black; font-weight: bold; margin-top: 5px; float: right"
          >Forget Password?</a
        >
        <ion-button
          v-if="!load"
          shape="round"
          @click="
            err = null;
            login();
          "
          style="width: 100%; --background: black; margin-top: 50px"
        >
          LOGIN
        </ion-button>
        <ion-button
          v-if="load"
          disabled
          shape="round"
          style="width: 100%; --background: black; margin-top: 30px"
        >
          Loading...
        </ion-button>

        <div class="text0" style="text-align: center; margin: 25px">
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
        <div class="text0" style="text-align: center; margin: 25px">
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
      <div style="margin: 30px" v-if="fp">
        <i
          class="fa fa-times"
          aria-hidden="true"
          style="float: right"
          @click="fp = false"
        ></i>
        <span style="text-align: center; color: green">{{ msg }}</span>
        <span style="text-align: center; color: red">{{ Err }}</span>

        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Username</ion-label
          >
          <ion-input type="text" v-model="form.username"></ion-input>
        </ion-item>
        <ion-button
          v-if="!load"
          :disabled="form.username == ''"
          shape="round"
          @click="SendMail()"
          style="width: 100%; --background: black; margin-top: 50px"
        >
          send mail
        </ion-button>
        <ion-button
          v-if="load"
          disabled
          shape="round"
          style="width: 100%; --background: black; margin-top: 30px"
        >
          Loading...
        </ion-button>
      </div>
    </ion-content>
    <div
      style="
        font-size: x-small;
        padding-top: 4px;
        background-color: gainsboro;
        font-weight: bold;
        color: gray;
        text-align: center;
      "
    >
      This app is developed by
      <a
        style="text-decoration: none; color: black"
        href="https://wa.me/+919737728472"
        >Murtaza Mundrawala</a
      >
    </div>
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
    load:false,
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
    this.load=true;
      axios.post('https://ra22.deta.dev/forget-password',{
        username:this.form.username
      }).then((d)=>{

        this.msg=d.data.message + "\n If not in inbox, please check 'SPAM'"
        setTimeout(() => {
          this.msg="";
          this.fp=false
        }, 3000);
        this.load=false;
        // this.fp=fase
      }).catch(()=>{
        this.Err = "Not Found!"
        this.load=false;
        setTimeout(() => {
          this.Err="";
          this.fp=false
        }, 3000);
      })
  },
  async login(){
     const valid = await this.$validate();
                if(valid){
                  // this.load=true;
                  this.form.password = md5(this.form.password.toString())
                  axios.post('https://ra22.deta.dev/user/login',this.form).then(d=>{
                   
                    window.localStorage.setItem('a22user',JSON.stringify(d.data))
                   axios.get('https://ra22.deta.dev/claim-now/'+d.data.key).then(dd=>{
                      this.$store.commit('claim',dd.data.msg)
                   })
                    this.load=false;
                    this.$router.replace('/home')
                  }).catch(()=>{
                    this.load=false;
                      this.err="invalid Credentials"
                  })
                }
  }
}
}
</script>

<style>
</style>