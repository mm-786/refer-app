<template>
    <ion-page>
        <ion-header class="ion-no-border" :translucent="true">
            <ion-toolbar style="background-color: white; box-shadow: none">
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <i class="fa fa-times" style="color: black; font-size: medium;" aria-hidden="true"></i>
                    </ion-button>
                </ion-buttons>
                <ion-title class="text2" > Your Profile </ion-title>
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

            <div v-if="edit" style="margin: 30px">
                <div>
                <i @click="edit=false" style="font-size: xx-large; float: right;" class="fa fa-times"
                                aria-hidden="true"></i>
                            </div>
                <ion-item>
                    <ion-label style="font-size: small; color: black" position="floating">Mobile</ion-label>
                    <ion-input v-model="form.mobile" type="text" inputmode="numeric" maxlength="10"
                        @change="checkMobile(form.mobile)"></ion-input>
                    <div class="err">{{ validation.firstError("form.mobile") }}</div>
                    <div class="err">{{ mobileErr }}</div>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small; color: black" position="floating">E-mail</ion-label>
                    <ion-input v-model="form.email" @change="checkEmail(form.email)"></ion-input>
                    <div class="err">{{ validation.firstError("form.email") }}</div>
                    <div class="err">{{ emailErr }}</div>
                </ion-item>
                <ion-item>
                    <ion-label style="font-size: small; color: black">Gender</ion-label>
                    <ion-radio-group v-model="form.gender" style="display: flex">
                        <ion-item lines="none">
                            <ion-label>Male</ion-label>
                            <ion-radio style="--color-checked: black" slot="start" value="Male"></ion-radio>
                        </ion-item>

                        <ion-item lines="none">
                            <ion-label>Female</ion-label>
                            <ion-radio style="--color-checked: black" slot="start" value="Female"></ion-radio>
                        </ion-item>
                    </ion-radio-group>
                    <div class="err">{{ validation.firstError("form.gender") }}</div>
                </ion-item>

                <ion-item>
                    <ion-label style="font-size: small; color: black" position="floating">Date Of Birth</ion-label>
                    <ion-input v-model="form.dob" :max="maxDate" type="date"></ion-input>
                    <div class="err">{{ validation.firstError("form.dob") }}</div>
                </ion-item>





                <ion-button v-if="!load" shape="round" @click="update"
                    style="width: 100%; --background: black; margin-top: 30px">
                    Update
                </ion-button>
                <ion-button v-if="load" disabled shape="round"
                    style="width: 100%; --background: black; margin-top: 30px">
                    Loading...
                </ion-button>


            </div>

            <ion-card v-if="!edit" class="text0" style="border-radius: 10px; box-shadow: none; background-color: rgba(220, 220, 220,0.3);">
                <ion-grid>
                    <ion-row>
                        <ion-col size="11">

                        </ion-col>
                        <ion-col>
                            <i @click="edit=true" style="font-size: xx-large; float: right;" class="fa fa-pencil-square"
                                aria-hidden="true"></i>
                        </ion-col>
                    </ion-row>
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
                    <h5 class="text0">Your <span>SHIB</span></h5>
                    <div class="inner-container-shade">
                        <strong class="text"
                            style="font-size: xx-large; margin-bottom: 10px;">{{userData.credit}}</strong>

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
                            You don't have enough ({{limit}}) SHIB to make withdraw request or You have already make
                            one request which one is not compeleted
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="js">
    import { IonContent, IonInput, IonPage, IonButton, IonGrid, IonRow, IonCol, IonRadioGroup, IonRadio } from "@ionic/vue";
    import SimpleVueValidation from 'simple-vue-validator';
    const Validator = SimpleVueValidation.Validator;
    import axios from 'axios';

    export default {
        components: {
            IonContent,
            IonButton,
            IonPage,
            IonRadioGroup, IonRadio,
            IonGrid, IonRow, IonCol,
            IonInput,
        },
        data() {
            return {
                userData: {},
                form: {},
                limit: window.localStorage.getItem('limit'),
                emailErr: "",
                usernameErr: "",
                mobileErr: "",
                maxDate: '',
                load: false,
                edit: false
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
            this.userData = JSON.parse(window.localStorage.getItem('a22user'));
            axios.get('https://ra22.deta.dev/user/' + this.userData.key).then(d => {
                window.localStorage.setItem('a22user', JSON.stringify(d.data))
                this.userData = d.data;
                this.form = d.data;
            })
        },
        validators: {
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
        },
        methods: {
            async update() {
                const valid = await this.$validate();
                if (valid && this.usernameErr == "" && this.mobileErr == "" && this.emailErr == "") {
                    this.load = true;
                    axios.put('https://ra22.deta.dev/user-update', this.form).then(d => {
                       
                        this.userData = d.data;
                        this.form = d.data;
                        this.edit=false;
                        this.load = false;
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
                    axios.post('https://ra22.deta.dev/req', data).then(() => {
                    
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
        background-color: rgba(220, 220, 220, 0.3);
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
        background-color: rgba(220, 220, 220, 0.3);
        text-transform: capitalize;
    }
</style>