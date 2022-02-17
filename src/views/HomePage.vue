<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border" style="height: 150px; --background: black;">
      
      <ion-toolbar style="height: 150px; --background: black;">
        <ion-buttons slot="end" style="position: absolute; top:5px; right: 5px;">
          <ion-button style="--color: ghostwhite; font-size: large;" >
           <i class="fa fa-question-circle" aria-hidden="true"></i>
          </ion-button>
        </ion-buttons>
        <ion-title style="--color:white; margin-top: 25px; font-size: x-large; letter-spacing: 2px; height: 60px;"> Good Moring, <br><span style="font-size: xx-large;">Murtaza</span></ion-title>
      </ion-toolbar>
    </ion-header>
 
    <ion-fab vertical="bottom" horizontal="end" slot="fixed" style="margin-right: 10px;">
      <ion-fab-button style="--background:black;">
        <i class="fa fa-plus-circle" style="font-size: xx-large;" aria-hidden="true"></i>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button style="--background:rgb(245, 154, 154);">
          <i class="fa fa-power-off" style="font-weight: bold; color: red;" aria-hidden="true"></i>
        </ion-fab-button>
       
        <ion-fab-button style="--background:rgb(250, 239, 178); ">
          <i class="fa fa-key" style="font-weight: bold; color: goldenrod;" aria-hidden="true"></i>
        </ion-fab-button>
        <ion-fab-button style="--background:rgb(192, 188, 188);">
          <i class="fa fa-user" style="font-weight: bold; color: black;" aria-hidden="true"></i>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content :fullscreen="true" style="--background: black; --color:white;">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" style="color:white">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <div slot="top">
          <label>Your Credits</label>
          <div class="inner-container-shade">
            <h1>2000</h1>
          </div>
        </div>
        <hr style="background-color: gainsboro;">
        <div>
          <label>Offers</label>
          <div class="offer-container">
            
          </div>
        </div>
        <hr style="background-color: gainsboro;">
        <div>
          <label>Your Refers</label>

          <div style="background-color: rgba(0, 0, 0,0.6); border-radius: 20px 5px 20px 5px; margin-top: 10px; padding: 0px 20px; justify-content: space-between; display: flex;">
                <h4 style="color: white;">code</h4>
              
                  <h4 style="background-color: white; padding: 8px; border-radius: 50px;" class="fa fa-clipboard" aria-hidden="true"></h4>
  
          </div>
          <div class="inner-container">
            <ol>
              <li>Murtaza</li>
              <li>Jay</li>
            </ol>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HomePage',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar
    }
  });
</script>

<style scoped>
  .container {
    background-color: white;
    height: max-content;
    padding: 15px;
    color: black;
    text-align: center;
    padding-top: 20px;
    border-radius: 30px 30px 0px 0px;
    margin: 0px 10px;
  }

  .container label {
    font-size: large;
    color: black;
    text-align: center;
  }

  .inner-container-shade {
    background-color: rgba(220, 220, 220, 0.2);
    padding: 15px;
    margin-top: 10px;
    margin-bottom: 25px;
    border-radius: 25px;
  }

  .inner-container {
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 25px;
    border-radius: 25px;
  }

  .offer-container {
    padding: 5px;
    height: 250px;
    overflow: scroll;
    text-align: justify;
    word-spacing: 1px;
    margin-top: 10px;
    margin-bottom: 25px;
    border-radius: 15px;
  }

  .inner-container ol li {
    margin: 5px 0px;
    text-align: left;
  }
</style>