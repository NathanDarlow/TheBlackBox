/* eslint-disable */
<template>
  <div>
    <v-layout row>
      <v-row xs12>
        <div class="my-10 mx-auto">
          <v-chip class="filter mx-3" v-bind:class="{ active: currentFilter === 'ALL' }" v-on:click="setFilter('ALL')"><h3 class="subheading grey--text mx-5">ALL</h3></v-chip>
          <v-chip class="filter mx-3" v-if="!isEmployerLoggedIn && isJobseekerLoggedIn && currentJobSeeker.keySkillOne" v-bind:class="{ active: currentFilter === this.currentJobSeeker.keySkillOne }" v-on:click="setFilter(`${currentJobSeeker.keySkillOne}`)"><h3 class="subheading grey--text mx-5">{{this.currentJobSeeker.keySkillOne}}</h3></v-chip>
          <v-chip class="filter mx-3" v-if="!isEmployerLoggedIn && isJobseekerLoggedIn && currentJobSeeker.keySkillTwo" v-bind:class="{ active: currentFilter === this.currentJobSeeker.keySkillTwo }" v-on:click="setFilter(`${currentJobSeeker.keySkillTwo}`)"><h3 class="subheading grey--text mx-5">{{this.currentJobSeeker.keySkillTwo}}</h3></v-chip>
          <v-chip class="filter mx-3" v-if="!isEmployerLoggedIn && isJobseekerLoggedIn && currentJobSeeker.keySkillThree" v-bind:class="{ active: currentFilter === this.currentJobSeeker.keySkillThree  }" v-on:click="setFilter(`${currentJobSeeker.keySkillThree}`)"><h3 class="subheading grey--text mx-5">{{this.currentJobSeeker.keySkillThree}}</h3></v-chip>
        </div>
      </v-row>
    </v-layout>
    <v-skeleton-loader
      v-if="firstLoad" 
      :loading="loading"
      class="mx-auto"
      type="card"
      max-width="1700"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-if="firstLoad" 
      :loading="loading"
      class="mx-auto"
      type="card"
      max-width="1700"
    ></v-skeleton-loader>
    <v-skeleton-loader
      v-if="firstLoad" 
      :loading="loading"
      class="mx-auto"
      type="card"
      max-width="1700"
    ></v-skeleton-loader>
    <v-layout>
      <v-flex
      v-show="!firstLoad"
      :loading="loading">
        <v-data-iterator :items="jobs">
          <template v-slot:item="props">
          <v-container  xs12  class="job-container" id="jobs" 
          v-if="currentFilter === props.item.tagOne || currentFilter === props.item.tagTwo || currentFilter === props.item.tagThree || currentFilter === props.item.tagFour || currentFilter === props.item.tagFive || currentFilter === props.item.tagSix || currentFilter === 'ALL'">
            <router-link v-bind:to="{name:'view.job.detail', params: {jobId: props.item.id}}" style="text-decoration: none;">
              <v-hover v-slot:default="{ hover }">
                <v-card class="pa-3 mb-10" :elevation="hover ? 12 : 2">
                  <v-layout row wrap>
                    <v-flex xs3 sm3 md2 class="pl-3">
                      <div class="caption grey--text">Job Title</div>
                      <div class="secondary--text">{{ props.item.jobTitle}}</div>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                      <div class="caption grey--text">Company</div>
                      <div class="secondary--text">{{props.item.Employer.company}}</div>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                      <div class="caption grey--text">Location</div>
                      <div class="secondary--text">{{props.item.location}}</div>
                    </v-flex>
                    <v-flex xs3 sm3 md3>
                      <div class="caption grey--text">Type</div>
                      <div class="secondary--text">{{props.item.type}}</div>
                    </v-flex>
                    <v-flex xs3 sm3 md1>
                      <div class="caption grey--text">Annual Salary</div>
                      <div class="secondary--text">{{props.item.salary}}</div>
                    </v-flex>
                  </v-layout>
                  <v-divider class="my-2"></v-divider>
                  <v-layout>
                    <v-flex class="ma-3 pt-4 caption grey--text">
                      <div class="body-2">{{props.item.description.substring(0, (props.item.description.length/3))}}...</div>
                    </v-flex>
                  </v-layout>
                  <v-divider class="my-2"></v-divider>
                  <v-layout>
                    <v-flex xs3 sm3 md2>
                      <v-chip>
                        <div class="secondary--text">{{props.item.tagOne}}</div>
                      </v-chip>
                    </v-flex>
                    <v-flex xs3 sm3 md2>
                      <v-chip>
                        <div class="secondary--text">{{props.item.tagTwo}}</div>
                      </v-chip>
                    </v-flex>
                    <v-flex xs3 sm3 md2>
                      <v-chip>
                        <div class="secondary--text">{{props.item.tagThree}}</div>
                      </v-chip>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-hover>
            </router-link>
              </v-container><!-- end of job-container -->
            </template>
          </v-data-iterator>
          </v-flex>
          <!-- Rabbit Hole -->
          <div v-if="!isEmployerLoggedIn && isJobseekerLoggedIn && this.currentJobSeeker.keySkillFour && this.currentJobSeeker.keySkillFive && this.currentJobSeeker.keySkillSix">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
              class="filter"
              v-on:click="setFilter(getRabbitHole())"
              fixed
              v-on="on"
              dark
              x-large
              fab
              bottom
              right
              color="grey">
                <img src="https://img.icons8.com/android/24/000000/rabbit.png">
               </v-btn>
            </template>
            <span>Jump Down The Rabbit Hole</span>
          </v-tooltip>
          </div>
      </v-layout>
    </div>
</template>


<script>
import ProfileService from '../../services/ProfileService.js'
import Vue from 'vue'
import JobService from '../../services/JobService'
import LoadingOverlay from 'vue-loading-overlay'
import {mapState} from 'vuex'
Vue.use(LoadingOverlay)
export default {
  created () {
    this.getAllJobs();
  },
  mounted () {
  },
  data: function () {
    return {
      isLoading: true,
      fullPage: false,
      jobs: [],
      joBSeeker: {},
      currentFilter: 'ALL',
      loading: true,
      firstLoad: true,
    }
  },
  computed: {
    ...mapState([
        'currentJobSeeker',
        'isJobseekerLoggedIn',
        'isEmployerLoggedIn',
      ])
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
    setFilter: function(filter) {
          this.currentFilter = filter;
          console.log(filter)
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
    
    getRabbitHole: function() {
      const rabbit = [this.currentJobSeeker.keySkillFour, this.currentJobSeeker.keySkillFive, this.currentJobSeeker.keySkillSix,];
      const randomSkill = rabbit[Math.floor(Math.random() * rabbit.length)];
      return randomSkill
    }
  },
}
</script>

<style scoped>
.filter:active{
  background-color: #000;
}
</style>