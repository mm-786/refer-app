<template>
  <ion-page>
    <ion-header class="ion-no-border" :translucent="true">
      <ion-toolbar style="background-color: white; box-shadow: none">
        <ion-buttons slot="start">
          <ion-button @click="$router.go(-1)">
            <i class="fa fa-caret-left" aria-hidden="true"></i>
          </ion-button>
        </ion-buttons>
        <ion-title> Register </ion-title>
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
          <ion-label style="font-size: small" position="floating"
            >Name</ion-label
          >
          <ion-input v-model="form.name"></ion-input>
          <div class="err">{{ validation.firstError("form.name") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Username</ion-label
          >
          <ion-input v-model="form.username"></ion-input>
          <div class="err">{{ validation.firstError("form.username") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Mobile</ion-label
          >
          <ion-input
            v-model="form.mobile"
            type="text"
            inputmode="numeric"
          ></ion-input>
          <div class="err">{{ validation.firstError("form.mobile") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >E-mail</ion-label
          >
          <ion-input v-model="form.email"></ion-input>
          <div class="err">{{ validation.firstError("form.email") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Gender</ion-label
          >
          <ion-select v-model="form.gender">
            <ion-select-option value="male">Male</ion-select-option>
            <ion-select-option value="female">Female</ion-select-option>
          </ion-select>
          <div class="err">{{ validation.firstError("form.gender") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Date Of Birth</ion-label
          >
          <ion-input v-model="form.dob" type="date"></ion-input>
          <div class="err">{{ validation.firstError("form.dob") }}</div>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
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
          <ion-label style="font-size: small" position="floating"
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
          <ion-label style="font-size: small" position="floating"
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
          shape="round"
          @click="submit"
          style="width: 100%; --background: black; margin-top: 30px"
        >
          Register
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
    import { IonContent, IonItem, IonInput, IonPage, IonSelect, IonSelectOption } from "@ionic/vue";
    import axios from 'axios';
    import SimpleVueValidation from 'simple-vue-validator';
    const Validator = SimpleVueValidation.Validator;


    export default {
        components: {
            IonContent,
            IonSelect, IonSelectOption,
            IonPage,
            IonItem,
            IonInput,
        },
        data() {
            return {
                form: {
                    name: "", username: "", dob: "", gender: "", mobile: "", email: "", password: "", refer_by: "", t_password: ""
                },
                shwPass1:false,
                shwPass2:false,
            }
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
                if(valid){
                var config = {
                    method: 'post',
                    url: 'https://ra22.deta.dev/user/register',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.form
                };

                axios(config)
                    .then(function (response) {
                        console.log(response);
                        this.$router.replace('/login')
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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