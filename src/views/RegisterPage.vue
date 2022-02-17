<template>
    <ion-page>
        <ion-header class="ion-no-border" :translucent="true">
            <ion-toolbar style="background-color: white; box-shadow: none">
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <i class="fa fa-caret-left" aria-hidden="true"></i>
                    </ion-button>
                </ion-buttons>
                <ion-title>
                    Register
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <div style="display: flex; justify-content: center; margin-top: 10px"></div>
            <div style="margin: 30px; margin-top: 50px">
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Name</ion-label>
                    <ion-input v-model="form.name"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Username</ion-label>
                    <ion-input v-model="form.username"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Mobile</ion-label>
                    <ion-input v-model="form.mobile" type="text" inputmode="numeric"></ion-input>
                </ion-item>
                <ion-item>
                    <div class="">{{ validation.firstError('form.email') }}</div>
                    <ion-label style="font-size: small" position="floating">E-mail</ion-label>
                    <ion-input v-model="form.email"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Gender</ion-label>
                    <ion-select v-model="form.gender">
                        <ion-select-option value="male">Male</ion-select-option>
                        <ion-select-option value="female">Female</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Date Of Birth</ion-label>
                    <ion-input v-model="form.dob" type="date"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Password</ion-label>
                    <ion-input v-model="form.t_password" type="password"></ion-input>
                    <i class="fa fa-eye" style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
              color: gray;
            " aria-hidden="true"></i>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small" position="floating">Confirm Password</ion-label>
                    <ion-input v-model="form.password" type="password"></ion-input>
                    <i class="fa fa-eye" style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
              color: gray;
            " aria-hidden="true"></i>
                </ion-item>

                <ion-item>
                    <ion-label style="font-size: small" position="floating">Refer Code</ion-label>
                    <ion-input v-model="form.refer_by"></ion-input>
                </ion-item>

                <ion-item lines="none">
                    <span style="margin-left: 5px">
                        By register you agree our <a style="color:black; font-weight:bold; text-decoration: none;"
                            href="#"> Privacy and Term</a>
                    </span>
                </ion-item>

                <ion-button shape="round" @click="submit" style="width: 100%; --background:black; margin-top: 30px">
                    Register
                </ion-button>

                <div style="text-align: center; margin: 25px">
                    <hr style="background-color: rgb(161, 152, 152); height: 1px" />
                    <span style="
              margin-top: -22px;
              margin-left: -13px;
              position: absolute;
              background-color: white;
              padding: 5px;
            ">OR</span>
                </div>
                <div style="text-align: center; margin: 25px">
                    <span>Already have account?
                        <a style="color:black; font-weight:bold" @click="$router.push('/login')"> Login to your
                            account</a></span>
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
            }
        },
        validators: {
            'form.email': function (value) {
                return Validator.value(value).required().email();
            }
        },
        methods: {
            submit() {
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
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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