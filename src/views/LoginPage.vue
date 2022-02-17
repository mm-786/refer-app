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
          Login
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <div style="margin: 30px; margin-top: 80px">
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Username</ion-label
          >
          <ion-input type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label style="font-size: small" position="floating"
            >Password</ion-label
          >
          <ion-input type="Password"></ion-input>
          <i class="fa fa-eye" style="
              position: absolute;
              right: 0px;
              margin-top: 20px;
              z-index: 100;
              color: gray;
            " aria-hidden="true"></i>
        </ion-item>

        <ion-button shape="round" style="width: 100%; --background:black; margin-top: 50px">
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
            <a style="color:black; font-weight:bold" @click="$router.push('/sign-up')"> Sign up</a></span
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
  import {IonContent,IonPage,  IonItem, IonInput } from '@ionic/vue';
export default {
  components: {
    IonContent, 
     
    IonItem, 
    IonPage,
    IonInput
}
}
</script>

<style>
</style>