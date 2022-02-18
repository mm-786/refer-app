<template>
    <ion-page>
        <ion-header class="ion-no-border" :translucent="true">
            <ion-toolbar style="background-color: white; box-shadow: none">
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <i class="fa fa-caret-left" aria-hidden="true"></i>
                    </ion-button>
                </ion-buttons>
                <ion-title> Your Profile </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <div style="display: flex; justify-content: center; margin-top: 10px"></div>
            <h1 style="text-align: center">{{userData.username}}</h1>
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
                        <ion-col class="data">
                            {{userData.email}}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-card>
            <div style="margin: 30px; margin-top: 40px">

                <div style="text-align:center;  margin:30px; border: 1px solid gainsboro; padding: 20px; ">
                    <h5>Your Credits</h5>
                    <div class="inner-container-shade">
                        <h1>{{userData.credit}}</h1>

                        <ion-input type="text" style="--background:rgb(190, 190, 190); margin: 10px 0px;"
                            inputmode="numeric"></ion-input>
                        <ion-button style="--color:black; --background: transpent; border: 1px solid black;"> withdraw
                            request </ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="js">
    import { IonContent, IonInput, IonPage } from "@ionic/vue";
    export default {
        components: {
            IonContent,

            IonPage,

            IonInput,
        },
        data() {
            return {
                userData: {}
            }
        },
        mounted() {
            this.userData = JSON.parse(window.localStorage.getItem('a22user'))
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
        text-transform: uppercase;
        opacity: 0.8;
        font-weight: bold;
    }

    .data {
        padding: 20px;
        padding-left: 0px;
        text-transform: capitalize;
    }
</style>