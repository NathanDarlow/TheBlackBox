/* eslint-disable eol-last */
<template>
    <nav class="hidden-sm-and-down mb-12">
        <v-app-bar fixed color="white" hide-on-scroll>
          <router-link to="/">
            <v-toolbar-title class="text-uppercase heading grey--text">
              <span class="font-weight-light">Black</span>
              <span class="font-weight-bold">Box</span>
            </v-toolbar-title>
          </router-link>
          <v-spacer></v-spacer>

            <!-- View JobSeeker Profile -->

  <div class="text-center mx-5" v-if="$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-chip
          v-on="on">
          <h3 class="grey--text">Profile</h3>
          <v-icon class="pl-2">person</v-icon>
        </v-chip>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
               <v-img
                aspect-ratio="1"
                :src="this.$store.state.currentJobSeeker.photo" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title><h3 class="grey--text">{{$store.state.jobseeker.firstName}} {{$store.state.jobseeker.lastName}}</h3></v-list-item-title>
              <v-list-item-subtitle>{{$store.state.jobseeker.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-chip @click="navigateTo('view.jobseeker.profile', {jobseekerId: $store.state.jobseeker.id})">
                <h3 class="grey--text">Go To My Profile</h3>
                <v-icon class="pl-2">exit_to_app</v-icon>
              </v-chip>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-chip>
                <h3 class="grey--text">Lorem Ipsum</h3>
                <v-icon class="pl-2">exit_to_app</v-icon>
              </v-chip>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
  <!-- View Employer Profile -->
  <div class="text-center mx-5" v-if="$store.state.isEmployerLoggedIn && !$store.state.isJobseekerLoggedIn">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x>
      <template v-slot:activator="{ on }">
        <v-chip
          v-on="on">
          <h3 class="grey--text">Account</h3>
          <v-icon class="pl-2">person</v-icon>
        </v-chip>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><h3 class="">{{$store.state.employer.representative}}</h3></v-list-item-title>
              <v-list-item-subtitle><h4 class="grey--text">{{$store.state.employer.email}}</h4></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-chip @click="navigateTo('view.employer.profile', {employerId: $store.state.employer.id})">
                <h3 class="grey--text">Go To Company Page</h3>
                <v-icon class="pl-2">exit_to_app</v-icon>
              </v-chip>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-chip @click="navigateTo('employer.post.job', {employerId: $store.state.employer.id})">
                <h3 class="grey--text">Post A Job</h3>
                <v-icon class="pl-2">add</v-icon>
              </v-chip>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-chip @click="navigateTo('view.job.applicants', {employerId: $store.state.employer.id})">
                <h3 class="grey--text">View Applicants</h3>
                <v-icon class="pl-2">search</v-icon>
              </v-chip>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
  <!-- Links -->
  <div class="text-center mx-5" v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x>
            <template v-slot:activator="{ on }">
              <v-chip
                v-on="on">
                <h3 class="grey--text">Log In / Sign Up</h3>
                <v-icon class="pl-2">vpn_key</v-icon>
              </v-chip>
            </template>
            <v-card>
            <v-list class="d-flex align-center">
              <v-list-item>
                <v-col>
                  <v-flex>
                    <v-chip class="mx-auto" @click="navigateTo('jobseeker.login')" v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
                      <h3>JobSeeker Login</h3>
                      <p>&nbsp;</p>
                      <v-icon>exit_to_app</v-icon>
                    </v-chip>
                  </v-flex>
                </v-col>
              </v-list-item>

              <v-list-item>
                <v-col class="d-flex align-center">
                  <v-flex>
                    <v-chip class="mx-auto"  @click="navigateTo('employer.login')" v-if="!$store.state.isJobseekerLoggedIn">
                  <h3>Employer Login</h3>
                  <p>&nbsp;</p>
                  <v-icon>exit_to_app</v-icon>
                </v-chip>
              </v-flex>
            </v-col>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-col><p class="text-center">Dont Have an account? <a href="javascript:void(0)" @click="navigateTo('jobseeker.registration')" v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">Sign Up Here!</a></p></v-col>
      </v-card>
    </v-menu>
  </div>
  <!-- Sign Out -->
  <v-chip class="mx-auto" 
  v-if="$store.state.isEmployerLoggedIn || $store.state.isJobseekerLoggedIn" 
  @click="logout($store.state.isEmployerLoggedIn, $store.state.isJobseekerLoggedIn)">
    <h3 class="grey--text">Sign Out</h3>
    <v-icon class="pl-2">power_settings_new</v-icon>
  </v-chip>
  </v-app-bar>
</nav>
</template>

<script>
export default {
  data: () => {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  methods: {
    navigateTo(route, param){
      if (param) {
        this.$router.push({ name: route, params: param });
      } else {
         this.$router.push({name: route});
      }
    },

    logout(employer, jobseeker) {
      if (employer) {
        this.$store.dispatch('setEmployerLogOutAction');
        this.$router.push('/')
      }
      if (jobseeker) {
        this.$store.dispatch('setJobseekerLogOutAction');
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none
}
</style>
