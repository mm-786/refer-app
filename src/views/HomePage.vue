<template>
  <ion-page>
    <ion-header
      :translucent="true"
      class="ion-no-border"
      style="height: 150px; --background: black"
    >
      <ion-toolbar style="height: 150px; --background: black">
        <ion-buttons
          slot="end"
          style="position: absolute; top: 5px; right: 5px"
        >
          <ion-button
            @click="$router.push('/help')"
            style="--color: ghostwhite; font-size: large"
          >
            <i class="fa fa-question-circle" aria-hidden="true"></i>
          </ion-button>
        </ion-buttons>
        <ion-title
          class="text2"
          style="
            --color: white;
            margin-top: 25px;
            font-size: xx-large;
            letter-spacing: 2px;
            height: 60px;
          "
        >
          {{ getWish() }}, <br /><span
            class="text1"
            style="font-size: xx-large; text-transform: capitalize"
            >{{ userData.name }}
          </span>
        </ion-title>
        <div slot="end">
          <img
            src="../../public/assets/wtxtlogo.svg"
            width="100"
            style="
              margin-top: 25px;
              float: right;
              margin-right: 15px;
              opacity: 0.5;
            "
          />
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-fab
      vertical="bottom"
      horizontal="end"
      slot="fixed"
      style="margin-right: 15px"
    >
      <ion-fab-button style="--background: black">
        <img src="../../public/assets/white.svg" width="30" />
        <!-- <i class="fa fa-plus-circle" style="font-size: xx-large;" aria-hidden="true"></i> -->
      </ion-fab-button>
      <ion-fab-list side="start">
        <ion-fab-button
          style="--background: rgb(245, 154, 154)"
          @click="logout"
        >
          <i
            class="fa fa-power-off"
            style="font-weight: bold; color: red"
            aria-hidden="true"
          ></i>
        </ion-fab-button>

        <ion-fab-button
          style="--background: rgb(250, 239, 178)"
          @click="$router.push('/change-password')"
        >
          <i
            class="fa fa-key"
            style="font-weight: bold; color: goldenrod"
            aria-hidden="true"
          ></i>
        </ion-fab-button>
        <ion-fab-button
          style="--background: rgb(192, 188, 188)"
          @click="$router.push('/profile')"
        >
          <i
            class="fa fa-user"
            style="font-weight: bold; color: black"
            aria-hidden="true"
          ></i>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

    <ion-content :fullscreen="true" style="--background: black; --color: white">
      <ion-header collapse="condense">
        <ion-toolbar> </ion-toolbar>
      </ion-header>

      <div class="text0">
        <div slot="top" class="container">
          <label class="text2" style="font-size: 25px"
            >Your <strong>Shib</strong></label
          >
          <ion-grid>
            <ion-row>
              <ion-col size="8" style="padding: 25px 0px">
                <strong class="text" style="font-size: 30px">{{
                  userData.credit
                }}</strong>
              </ion-col>
              <ion-col size="2">
                <button
                  @click="claim()"
                  v-if="$store.state.claim"
                  class="text2"
                  style="
                    height: 100px;
                    font-size: x-large;
                    width: 100px;
                    border-radius: 50px;
                    border: 10px solid rgb(159, 150, 150);
                    background-color: black;
                    color: white;
                  "
                >
                  Claim Now
                </button>
                <button
                  v-if="!$store.state.claim"
                  class="text2"
                  style="
                    height: 100px;
                    margin-right: 10px;
                    font-size: x-large;
                    width: 100px;
                    border-radius: 50px;
                    border: 10px solid rgba(159, 150, 150, 0.5);
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                  "
                >
                  Claim Now
                </button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <div v-if="of_load" class="container">
          <!-- <label>Offers</label> -->

          <ion-slides :options="slideOpts">
            <ion-slide
              style="background-color: rgba(220, 220, 220, 0.6)"
              class="offer-container"
              v-for="offer in offers"
              :key="offer.key"
            >
              <div
                v-if="offer.content"
                style="content: fixed"
                v-html="offer.content"
              ></div>
            </ion-slide>
          </ion-slides>
        </div>

        <div class="container">
          <label class="text2">Your Refers</label>

          <div
            style="
              background-color: rgba(0, 0, 0, 0.6);
              border-radius: 20px 5px 20px 5px;
              margin-top: 10px;
              padding: 0px 20px;
              justify-content: space-between;
              display: flex;
            "
          >
            <h4 style="color: white">{{ userData.key }}</h4>

            <h4
              @click="
                copy();
                share();
              "
              style="background-color: white; padding: 8px; border-radius: 50px"
              class="fa fa-share-alt"
              aria-hidden="true"
            ></h4>
          </div>

          <div
            class="inner-container"
            style="max-height: 100px; overflow: scroll"
          >
            <ol>
              <li
                v-for="i in userData.refer_to"
                style="text-transform: capitalize"
                :key="i"
              >
                {{ i }}
              </li>
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
  import axios from 'axios';
  import { Plugins } from '@capacitor/core';
  const { Share } = Plugins;

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
        claimBtn:false,
        of_load: false,
        wish: "",
        offers: [],
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
      claim() {
        axios.post('https://ra22.deta.dev/claim/' + this.userData.key).then(d => {
          window.localStorage.setItem('a22user', JSON.stringify(d.data));
          this.$store.commit('claim',false);
          this.userData = d.data;
        })
      },
      getWish() {
        const day = new Date();
        const hr = day.getHours();
        if (hr >= 0 && hr < 12) {
          return "Good Morning!"
        } else if (hr == 12) {
          return "Good Noon!"
        } else if (hr >= 12 && hr <= 15) {
          return "Good Afternoon!"
        } else {
          return "Good Evening!"
        }
      },
      copy() {
        navigator.clipboard.writeText(this.userData.key);
      },
      async share() {
        await Share.share({
          title: 'Refer Anticks With Buddies',
          text: 'Sign Up with my code ' + this.userData.key + ", And get more Shib \n"+"I- Download app from this https://download.anticks.tk \n II- Sign up with this https://app.anticks.tk/register?"+this.userData.key,
          dialogTitle: 'Share with buddies',
        });
      }
    },
    mounted() {
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
      this.claimBtn = this.userData.claim

       axios.get('https://ra22.deta.dev/claim-now/'+this.userData.key).then(dd=>{
          // console.log(dd.data.msg);
                      this.$store.commit('claim',dd.data.msg)
                   })

      axios.get('https://ra22.deta.dev/credit').then(d => {
        window.localStorage.setItem('limit', d.data.w_limit)
      })

      axios.get('https://ra22.deta.dev/offer').then(async (d) => {
        this.offers = d.data
        await this.$store.commit('offer', d.data)
        this.of_load = true;
      })

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
  border-radius: 30px;
  margin: 10px 20px;
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