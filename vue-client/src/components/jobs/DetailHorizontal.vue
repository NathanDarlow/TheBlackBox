<template>
    <v-container>
      <!-- Title -->
      <router-link to="/">
        <v-toolbar-title class="text-uppercase heading grey--text text-center">
          <h2 class="font-weight-light">Black <span class="font-weight-bold">Box</span></h2>
        </v-toolbar-title>
      </router-link>
      <v-divider></v-divider>
      <!-- Skeleton Loader -->
      
      <v-skeleton-loader
      v-if="firstLoad" 
      :loading="loading"
      class="mx-auto"
      type="card"
      max-width="1700"
    ></v-skeleton-loader>
          <!-- Card Carousel -->
          <v-container>
        <flickity ref="flickity" v-if="jobs && jobs.length > 0 && !firstLoad" :loading="loading" :options="flickityOptions">
            <v-container v-for="job in jobs" :key="job.id">
              <router-link v-bind:to="{name:'view.job.detail', params: {jobId: job.id}}" style="text-decoration: none;">
                <v-card class="mt-5" :elevation="12 - 2" style="height: 450px; border-radius: 15px;">
                    <v-layout justify-center>
                      <v-row>
                        <v-col cols="12" xs='12'>
                          <h2 class="grey--text text-center">{{ job.jobTitle}}</h2>
                          <h3 class="grey--text text-center">{{ job.location }}</h3>
                          <v-divider></v-divider>
                        </v-col>
                        
                        <v-col cols="12" xs='6'>
                          <h3 class="grey--text text-center">{{ job.salary }}</h3>
                          <v-divider class="my-5"></v-divider>
                        </v-col>
                        <v-col cols="12" xs='12' class="mx-auto">
                          <p class="grey--text text-center mx-2">{{job.description.substring(0, (job.description.length/24))}}...</p>
                          <v-divider></v-divider>
                        </v-col>
                        <v-col>
                          <p class="grey--text text-center">{{ job.type }}</p>
                          <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12" xs='12' class="mx-2">
                          
                          <v-chip x-small>
                            <div class="secondary--text">{{job.tagOne}}</div>
                          </v-chip>
                          <v-chip x-small>
                            <div class="secondary--text">{{job.tagTwo}}</div>
                          </v-chip>
                          <v-chip x-small>
                            <div class="secondary--text">{{job.tagThree}}</div>
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-layout>
                </v-card>
              </router-link>
            </v-container>
        </flickity>
        </v-container>
        </v-container>
</template>


<script>
import ProfileService from '../../services/ProfileService.js'
import Vue from 'vue'
import JobService from '../../services/JobService'
import LoadingOverlay from 'vue-loading-overlay'
import Flickity from 'vue-flickity';
import {mapState} from 'vuex'
Vue.use(LoadingOverlay)
export default {
  created () {
    this.getAllJobs();
  },
  mounted () {
  },
  computed: {
    ...mapState([
        'currentJobSeeker',
        'isJobseekerLoggedIn',
        'isEmployerLoggedIn',
      ])
  },
  data: function () {
    return {
      isLoading: true,
      fullPage: false,
      loading: true,
      firstLoad: true,
      jobs: [],
      joBSeeker: {},
      card_text: 'Sample Text',
      currentFilter: 'ALL',
      flickityOptions: {
                initialIndex: 3,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true,
                lazyLoad: true
                // any options from Flickity can be used
            }
    }
  },
  computed: {
    ...mapState([
        'currentJobSeeker',
        'isJobseekerLoggedIn',
        'isEmployerLoggedIn',
      ]),
      
      
  },
  components: {
    Flickity
  },
  methods: {
    async getAllJobs(){
          this.loading = false;
          this.jobs = [];
          this.jobs = (await JobService.viewAllJobs()).data.data;
          setTimeout(() => {
          if (this.firstLoad) this.firstLoad = false
          console.log('data is loaded');
          this.loading = false;
          resolve({
            jobs,
          });
        }, 500);
    },
    
    async getProfileInfo() {
       this.joBSeeker = {};
       const seekerId = this.jobseeker.id;
       let seeker = (await ProfileService.getJobseekerProfile(seekerId)).data.jobseeker;
       if (seeker === null) {
         this.joBSeeker = {};
       } else {
        this.joBSeeker = seeker;
       }
       this.$store.dispatch('setCurrentJobseekerAction', this.joBSeeker)
       this.updateProgressStatus(this.joBSeeker);
    },

    setFilter: function(filter) {
          this.currentFilter = filter;
    },

    getRabbitHole: function() {
      const rabbit = [this.currentJobSeeker.keySkillFour, this.currentJobSeeker.keySkillFive, this.currentJobSeeker.keySkillSix,];
      const randomSkill = rabbit[Math.floor(Math.random() * rabbit.length)];
      return randomSkill
    },
    next() {
            this.$refs.flickity.next();
        },
        previous() {
            this.$refs.flickity.previous();
        }
  },
}
</script>

<style scoped>
a {
  text-decoration: none
}
</style>