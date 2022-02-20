<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
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
        class="text"
        style="color: black; text-transform: uppercase; margin-left: 25px"
      >
        Register
      </h1>
      <div
        style="display: flex; justify-content: center; margin-top: 10px"
      ></div>
      <div style="margin: 30px">
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Name</ion-label
          >
          <ion-input v-model="form.name"></ion-input>
          <div class="err">{{ validation.firstError("form.name") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Username</ion-label
          >
          <ion-input
            v-model="form.username"
            @keydown.space.prevent
            @change="checkUsername(form.username); form.username =  form.username.replace(/\s/g, ' ')"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.username") }}</div>
          <div class="err">{{ usernameErr }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Mobile</ion-label
          >
          <ion-input
            v-model="form.mobile"
            type="text"
            inputmode="numeric"
            maxlength="10"
            @change="checkMobile(form.mobile)"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.mobile") }}</div>
          <div class="err">{{ mobileErr }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >E-mail</ion-label
          >
          <ion-input
            v-model="form.email"
            @change="checkEmail(form.email)"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.email") }}</div>
          <div class="err">{{ emailErr }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black">Gender</ion-label>
          <ion-radio-group v-model="form.gender" style="display: flex">
            <ion-item lines="none">
              <ion-label>Male</ion-label>
              <ion-radio
                style="--color-checked: black"
                slot="start"
                value="Male"
              ></ion-radio>
            </ion-item>

            <ion-item lines="none">
              <ion-label>Female</ion-label>
              <ion-radio
                style="--color-checked: black"
                slot="start"
                value="Female"
              ></ion-radio>
            </ion-item>
          </ion-radio-group>
          <div class="err">{{ validation.firstError("form.gender") }}</div>
        </ion-item>

        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Date Of Birth</ion-label
          >
          <ion-input v-model="form.dob" :max="maxDate" type="date"></ion-input>
          <div class="err">{{ validation.firstError("form.dob") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
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
          <ion-label style="font-size: small; color: black" position="floating"
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

        <ion-item>
          <ion-label style="font-size: small; color: black" position="floating"
            >Refer Code</ion-label
          >
          <ion-input v-model="form.refer_by"></ion-input>
          <div class="err">{{ validation.firstError("form.refer_by") }}</div>
        </ion-item>

        <ion-item lines="none">
          <span style="margin-left: 5px">
            By register you agree our
            <a
              style="color: black; font-weight: bold; text-decoration: none"
              href="#"
            >
              Privacy and Term</a
            >
          </span>
        </ion-item>

        <ion-button
          v-if="!load"
          shape="round"
          @click="submit"
          style="width: 100%; --background: black; margin-top: 30px"
        >
          Register
        </ion-button>
        <ion-button
          v-if="load"
          disabled
          shape="round"
          style="width: 100%; --background: black; margin-top: 30px"
        >
          Loading...
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
            >Already have account?
            <a
              style="color: black; font-weight: bold"
              @click="$router.replace('/login')"
            >
              Login to your account</a
            ></span
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
  import {
    IonContent, IonItem, IonInput, IonPage, IonButton, IonRadioGroup, IonRadio
  } from "@ionic/vue";
  import axios from 'axios';
  import SimpleVueValidation from 'simple-vue-validator';
  import md5 from "md5";
  const Validator = SimpleVueValidation.Validator;


  export default {
    components: {
      IonContent,
      IonPage,
      IonButton,
      IonItem,
      IonInput,
      IonRadioGroup, IonRadio
    },
    data() {
      return {
        form: {
          name: "", username: "", dob: "", gender: "", mobile: "", email: "", password: "", refer_by: "", t_password: ""
        },
        shwPass1: false,
        shwPass2: false,
        emailErr: "",
        usernameErr: "",
        mobileErr: "",
        load:false,
        maxDate: ''
      }
    },
    mounted() {
      const date = new Date();
      let day = (date.getDate() - 1).toString();
      let month = (date.getMonth() + 1).toString();
      const year = date.getFullYear()
      if (day.length == 1) {
        day = '0' + day
      }
      if (month.length == 1) {
        month = '0' + month
      }
      this.maxDate = year.toString() + "-" + month.toString() + "-" + day.toString();
    },
    validators: {
      'form.name': function (value) {
        return Validator.value(value).required()
      },
      'form.username': function (value) {
        return Validator.value(value).required().minLength(8);
      },
      'form.dob': function (value) {
        return Validator.value(value).required();
      },
      'form.gender': function (value) {
        return Validator.value(value).required();
      },
      'form.email': function (value) {
        return Validator.value(value).required().email();
      },
      'form.mobile': function (value) {
        return Validator.value(value).required().length(10);
      },
      'form.refer_by': function (value) {
        return Validator.value(value).length(12);
      },
      'form.t_password': function (value) {
        return Validator.value(value).required().minLength(6);
      },
      "form.password,form.t_password": function (value1, value2) {
        return Validator.value(value1).required().match(value2);
      },
    },
    methods: {
      async submit() {
        const valid = await this.$validate();
        if (valid && this.usernameErr == "" && this.mobileErr == "" && this.emailErr == "") {
          this.load=true;
          this.form.password = md5(this.form.password.toString())
          this.form.t_password = md5(this.form.t_password.toString())
          var config = {
            method: 'post',
            url: 'https://ra22.deta.dev/user/register',
            headers: { 'Content-Type': 'application/json' }, data: this.form
          };
          axios(config)
            .then(() => {
              this.load=false;
              this.$router.replace('/login')
            })
        }
      },
      checkEmail(x) {
        if (this.validation.firstError("form.email") == null) {
          axios.get('https://ra22.deta.dev/user/email-available/' + x).then(d => {
            if (!d.data.result) {
              this.emailErr = "Email is Already Register"
            }
            else {
              this.emailErr = ""
            }
          })
        }
      },
      checkMobile(x) {
        if (this.validation.firstError("form.mobile") == null) {
          axios.get('https://ra22.deta.dev/user/mobile-available/' + x).then(d => {
            if (!d.data.result) {
              this.mobileErr = "Mobile is Already Register"
            }
            else {
              this.mobileErr = ""
            }
          })
        }
      },
      checkUsername(x) {
        if (this.validation.firstError("form.username") == null) {
          axios.get('https://ra22.deta.dev/user/username-available/' + x).then(d => {
            if (!d.data.result) {
              this.usernameErr = "Username is Already Register"
            }
            else {
              this.usernameErr = ""
            }
          })
        }
      },
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