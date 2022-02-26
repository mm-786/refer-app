<template>
    <ion-page>
        <ion-header class="ion-no-border" :translucent="true">
            <ion-toolbar style="background-color: white; box-shadow: none">
                <ion-buttons slot="start">
                    <ion-button @click="$router.go(-1)">
                        <i class="fa fa-times" style="color: black; font-size: medium;" aria-hidden="true"></i>
                    </ion-button>
                </ion-buttons>
                <ion-title class="text2" > How To Use? </ion-title>
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
          
          <div class="text2">
            <ol>
                <li><b>Register</b> your self With someone <b>Refer code</b> (if any). With refer code get {{credit.r_sign_up}} shib and without refer code get {{credit.sign_up}} shib</li>
                <li><b>Login</b> with your credentials</li>
                <li><b>Share</b> your refer code with your friends and get {{credit.r}} shib</li>
                <li>click on <b>Claim Now</b> button and claim {{credit.per_day}} shib daily</li>
            </ol>
          </div>

            
        </ion-content>
    </ion-page>
</template>

<script lang="js">
    import { IonContent, IonPage, IonButton } from "@ionic/vue";
    import axios from "axios";

    export default {
        components: {
            IonContent,
            IonButton,
            IonPage,
        },
        data(){
            return{
                credit:{}
            }
        },
        mounted(){
             axios.get('https://ra22.deta.dev/credit').then(d=>{
             this.credit= d.data
      })
        }
       
    };
</script>

<style scoped>
    li{
        padding: 10px 0px;
        font-size: 25px;
    }
</style>