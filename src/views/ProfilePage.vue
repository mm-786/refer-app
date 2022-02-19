<template>
    <ion-page>
        <ion-header class="ion-no-border" :translucent="true">
            <ion-toolbar style="background-color: white; box-shadow: none">
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <i class="fa fa-times" style="color: black; font-size: medium;" aria-hidden="true"></i>
                    </ion-button>
                </ion-buttons>
                <ion-title> Your Profile </ion-title>
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
            <div style="display: flex; justify-content: center; margin-top: 10px"></div>
            
            <ion-card style="border-radius: 10px; box-shadow: none; background-color: rgba(220, 220, 220,0.3);">
                <ion-grid>
                    <ion-row>
                        <ion-col size="4" class="heading">
                            NAME
                        </ion-col>
                        <ion-col class="data">
                            {{userData.name}}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4" class="heading">
                            Username
                        </ion-col>
                        <ion-col class="data" style="text-transform: lowercase;">
                            {{userData.username}}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4" class="heading">
                            gender
                        </ion-col>
                        <ion-col class="data">
                            {{userData.gender}}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4" class="heading">
                            Date of birth
                        </ion-col>
                        <ion-col class="data">
                            {{userData.dob}}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4" class="heading">
                            Mobile
                        </ion-col>
                        <ion-col class="data">
                            {{userData.mobile}}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4" class="heading">
                            E-mail
                        </ion-col>
                        <ion-col class="data" style="text-transform: lowercase;">
                            {{userData.email}}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card>
            <div style="margin: 30px; margin-top: 40px">

                <div style="text-align:center;  margin:30px; border: 1px solid gainsboro; padding: 20px; ">
                    <h5>Your Credits</h5>
                    <div class="inner-container-shade">
                        <strong class="text" style="font-size: xx-large; margin-bottom: 10px;">{{userData.credit}}</strong>

                        <div v-if="userData.credit >= limit && userData.w_req==''">
                            <ion-input type="text" v-model="credit"
                                style="--background:rgb(190, 190, 190); margin: 10px 0px;" inputmode="numeric">
                            </ion-input>
                            <div class="err">{{ validation.firstError("credit") }}</div>
                            <ion-button @click="makeReq()"
                                style="--color:black; --background: transpent; border: 1px solid black;"> withdraw
                                request </ion-button>
                        </div>
                        <div v-else style="opacity: 0.5; margin-top: 10px; font-size: small;">
                            You don't have enough ({{limit}}) credit to make withdraw request or You have already make
                            one request which one is not compeleted
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="js">
    import { IonContent, IonInput, IonPage,IonButton, IonGrid,IonRow,IonCol } from "@ionic/vue";
    import SimpleVueValidation from 'simple-vue-validator';
    const Validator = SimpleVueValidation.Validator;
    import axios from 'axios';

    export default {
        components: {
            IonContent,
            IonButton,
            IonPage,
            IonGrid,IonRow,IonCol,
            IonInput,
        },
        data() {
            return {
                userData: {},
                limit: window.localStorage.getItem('limit'),
                credit: ''
            }
        },
        validators: {
            credit: function (value) {
                return Validator.value(value).required().greaterThanOrEqualTo(this.limit)
            }
        },
        mounted() {
            this.userData = JSON.parse(window.localStorage.getItem('a22user'));
            axios.get('https://ra22.deta.dev/user/' + this.userData.key).then(d => {
                window.localStorage.setItem('a22user', JSON.stringify(d.data))
                this.userData = d.data;
            })
        },
        methods: {
           async makeReq() {
                const valid = await this.$validate();
                if (valid) {
                    const data = {
                        "userKey": this.userData.key,
                        "credit": parseInt(this.credit),
                        "name": this.userData.name,
                        "mobile": this.userData.mobile,
                        "email": this.userData.email
                    }
                    axios.post('https://ra22.deta.dev/req', data).then((d) => {
                        console.log(d.data);
                        this.$router.replace('/home')
                    })
                }
            }
        }
    };
</script>

<style>
    ion-input {
        text-align: center;
    }

    ion-lable {
        --color: black;
    }

    ion-input:disabled {
        opacity: 0;
    }

    .heading {
        padding: 20px;
        padding-left: 10px;
        border-radius: 5px;
        background-color: rgba(220, 220, 220,0.3);
        margin: 5px;
        text-transform: uppercase;
        opacity: 0.8;
        font-weight: bold;
    }

    .data {
        padding: 20px;
        padding-left: 10px;
        border-radius: 5px;
        margin: 5px;
        background-color: rgba(220, 220, 220,0.3);
        text-transform: capitalize;
    }
</style>