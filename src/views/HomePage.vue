<template>
  <ion-page>
    <ion-header :translucent="true" class="ion-no-border" style="height: 150px; --background: black;">

      <ion-toolbar style="height: 150px; --background: black;">
        <ion-buttons slot="end" style="position: absolute; top:5px; right: 5px;">
          <ion-button style="--color: ghostwhite; font-size: large;">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
          </ion-button>
        </ion-buttons>
        <ion-title style="--color:white; margin-top: 25px; font-size: large; letter-spacing: 2px; height: 60px;">
          {{wish}}, <br><span class="text" style="font-size: xx-large; text-transform: capitalize;">{{userData.name}} </span>
        </ion-title>
        <div slot="end">
          <img src="../../public/assets/wtxtlogo.svg" width="100"
            style="margin-top: 25px; float: right; margin-right: 15px; opacity: 0.5;" />
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed" style="margin-right: 20px;">
      <ion-fab-button style="--background:black;">
        <img src="../../public/assets/white.svg" width="30" />
        <!-- <i class="fa fa-plus-circle" style="font-size: xx-large;" aria-hidden="true"></i> -->
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button style="--background:rgb(245, 154, 154);" @click="logout">
          <i class="fa fa-power-off" style="font-weight: bold; color: red;" aria-hidden="true"></i>
        </ion-fab-button>

        <ion-fab-button style="--background:rgb(250, 239, 178); " @click="$router.push('/change-password')">
          <i class="fa fa-key" style="font-weight: bold; color: goldenrod;" aria-hidden="true"></i>
        </ion-fab-button>
        <ion-fab-button style="--background:rgb(192, 188, 188);" @click="$router.push('/profile')">
          <i class="fa fa-user" style="font-weight: bold; color: black;" aria-hidden="true"></i>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content :fullscreen="true" style="--background: black; --color:white;">
      <ion-header collapse="condense">
        <ion-toolbar>

        </ion-toolbar>
      </ion-header>

      <div class="container">
        <div slot="top">
          <label>Your Credits</label>
          <div class="inner-container-shade">
            <strong class="text" style="font-size: 45px;">{{userData.credit}}</strong>
          </div>
        </div>
        <hr style="background-color: gainsboro;">
        <div>
          <!-- <label>Offers</label> -->
          <ion-slides :options="slideOpts">
            <ion-slide class="offer-container">
              <h1>Sign Up and get credit :)</h1>
            </ion-slide>
            <ion-slide class="offer-container">
              <h1>Refer your friend and get 500 credits:)</h1>
            </ion-slide>
            <ion-slide class="offer-container">
              <h1>Earn more credit :)</h1>
            </ion-slide>
          </ion-slides>
        </div>
        <hr style="background-color: gainsboro;">
        <div>
          <label>Your Refers</label>

          <div
            style="background-color: rgba(0, 0, 0,0.6); border-radius: 20px 5px 20px 5px; margin-top: 10px; padding: 0px 20px; justify-content: space-between; display: flex;">
            <h4 style="color: white;">{{userData.key}}</h4>

            <h4 @click="copy()" style="background-color: white; padding: 8px; border-radius: 50px;"
              class="fa fa-clipboard" aria-hidden="true"></h4>

          </div>

          <div class="inner-container" style="max-height: 100px; overflow: scroll;">
            <ol>
              <li v-for="i in userData.refer_to" :key="i">{{i}}</li>
            </ol>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
  import { IonContent, IonHeader, IonPage, IonSlides, IonSlide, IonTitle, IonToolbar, IonFab, IonFabButton, IonFabList } from '@ionic/vue';
  import { defineComponent } from 'vue';

  // import { Clipboard } from '@ionic-native/clipboard';
  export default defineComponent({
    name: 'HomePage',
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonFab, IonFabButton, IonFabList,
      IonSlides, IonSlide
    },
    data() {
      return {
        userData: {},
        wish: "",
        slideOpts: {
          autoplay: true
        }
      }
    },
    methods: {
      logout() {
        window.localStorage.clear();
        this.$router.replace('/login')
      },
      copy() {
        navigator.clipboard.writeText(this.userData.key);
      }
    },
    async mounted() {
      const day = new Date();
      const hr = day.getHours();
      if (hr >= 0 && hr < 12) {
        this.wish = "Good Morning!"
      } else if (hr == 12) {
        this.wish = "Good Noon!"
      } else if (hr >= 12 && hr <= 15) {
        this.wish = "Good Afternoon!"
      } else {
        this.wish = "Good Evening!"
      }
      this.userData = JSON.parse(window.localStorage.getItem('a22user'))

    }
  });
</script>

<style scoped>
  .container {
    background-color: white;
    height: 100%;
    padding: 25px;
    color: black;
    text-align: center;
    padding-top: 20px;
    border-radius: 30px 30px 0px 0px;
    margin: 0px 20px;
  }

  .container label {
    font-size: 25px;
    color: black;
    text-align: center;
  }

  .inner-container-shade {
    background-color: rgba(220, 220, 220, 0.2);
    padding: 15px;
    margin-top: 10px;
    margin-bottom: 25px;
    border-radius: 25px 10px;
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
    vertical-align: middle;
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