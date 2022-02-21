<template>
  <ion-page>
    <ion-header class="ion-no-border" :translucent="true">
      <ion-toolbar style="background-color: white; box-shadow: none">
        <ion-buttons slot="start">
          <ion-button @click="$router.go(-1)">
            <i
              class="fa fa-times"
              style="color: black; font-size: medium"
              aria-hidden="true"
            ></i>
          </ion-button>
        </ion-buttons>
        <ion-title class="text2"> Change Password </ion-title>
        <div slot="end">
                    <img src="../../public/assets/black.svg" width="40"
                      style="float: right; margin-right: 15px; opacity: 0.5;" />
                  </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <div
        style="display: flex; justify-content: center; margin-top: 10px"
      ></div>
      <div style="margin: 30px; margin-top: 50px">
        <ion-item>
          <ion-label style="font-size: small; color: black;" position="floating"
            >Old Password</ion-label
          >
          <ion-input
            v-model="form.old"
            :type="shwPass0 ? 'text' : 'password'"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.old") }}</div>
          <i
            :class="shwPass0 ? 'fa fa-eye-slash' : 'fa fa-eye'"
            @click="shwPass0 = !shwPass0"
            style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
            "
            aria-hidden="true"
          ></i>
        </ion-item>

        <ion-item>
          <ion-label style="font-size: small; color: black;" position="floating"
            >Password</ion-label
          >
          <ion-input
            v-model="form.t_password"
            :type="shwPass1 ? 'text' : 'password'"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.t_password") }}</div>
          <i
            :class="shwPass1 ? 'fa fa-eye-slash' : 'fa fa-eye'"
            @click="shwPass1 = !shwPass1"
            style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
            "
            aria-hidden="true"
          ></i>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black;" position="floating"
            >Confirm Password</ion-label
          >
          <ion-input
            v-model="form.password"
            :type="shwPass2 ? 'text' : 'password'"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.password") }}</div>
          <i
            :class="shwPass2 ? 'fa fa-eye-slash' : 'fa fa-eye'"
            @click="shwPass2 = !shwPass2"
            style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
            "
            aria-hidden="true"
          ></i>
        </ion-item>

        <ion-button
          v-if="!load"
          shape="round"
          @click="submit"
          style="width: 100%; --background: black; margin-top: 30px"
        >
          change Password
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
  </ion-page>
</template>

<script lang="js">
    import { IonContent, IonItem, IonInput, IonPage,IonButton,IonLabel} from "@ionic/vue";
    import axios from 'axios';
    import SimpleVueValidation from 'simple-vue-validator';
    import md5 from "md5"; 
    const Validator = SimpleVueValidation.Validator;


    export default {
        components: {
            IonContent,
            IonPage,
            IonItem,
            IonLabel,
            IonButton,
            IonInput,
        },
        data() {
            return {
                form: {
                    old:'',
                    t_password:'',
                    password:''
                },
                load:false,
                user:'',
                shwPass1:false,
                shwPass2:false,
                shwPass0:false,
            }
        },
        validators: {
            'form.old':function (value) {
                value = md5(value)
                return Validator.value(value).required().match(this.user.password);
            },
            'form.t_password': function (value) {
                return Validator.value(value).required().minLength(6);
            },
            "form.password,form.t_password": function (value1, value2) {
                return Validator.value(value1).required().match(value2);
            },
        },
        mounted(){ 
            const t = window.localStorage.getItem('a22user')
            this.user=JSON.parse(t) 
        },
        methods: {
            async submit(){
                  const valid = await this.$validate();
                  if(valid){
                    this.load=true;
                      this.form.password = md5(this.form.password)
                axios.put('https://ra22.deta.dev/change-password/'+this.user.key, this.form).then(()=>{
                  axios.get('https://ra22.deta.dev/user/'+this.user.key).then(d=>{
                           window.localStorage.setItem('a22user',JSON.stringify(d.data))})
                           this.load=false;
                    this.$router.replace('/home')
                }).catch(()=>{
                  this.load=false;
                })
                  }
            }
        }
    };
</script>

<style>
ion-input {
  text-align: center;

  color: black;
}

ion-item {
  --highlight-color-focused: black;
}

ion-lable {
  color: black;
}
</style>