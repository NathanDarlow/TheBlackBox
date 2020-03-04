<template>
    <div>
        <h2 class="grey--text text-center my-5">Settings</h2>
        <v-divider class="mx-10"></v-divider>
        <!-- If User Signed In -->
        <div v-if="$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
            <h2 class="grey--text text-center my-5">{{$store.state.jobseeker.firstName}} {{$store.state.jobseeker.lastName}}</h2>
            <h3 class="grey--text text-center">{{$store.state.jobseeker.email}}</h3>
            <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{this.$store.state.currentJobSeeker.address}}</p>
            <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{this.$store.state.currentJobSeeker.phone}}</p>
            <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{this.$store.state.currentJobSeeker.website}}</p>
            <v-layout justify-center>
                <v-btn @click="navigateTo('view.jobseeker.profile', {jobseekerId: $store.state.jobseeker.id})">
                    View More
                </v-btn>
            </v-layout>
            <v-divider class="mx-10 my-3"></v-divider>
            <v-layout justify-center>
                <v-chip class="mx-auto my-10" 
                v-if="$store.state.isEmployerLoggedIn || $store.state.isJobseekerLoggedIn" 
                @click="logout($store.state.isEmployerLoggedIn, $store.state.isJobseekerLoggedIn)">
                    <h3 class="grey--text">Sign Out</h3>
                    <v-icon class="pl-2">power_settings_new</v-icon>
                </v-chip>
            </v-layout>
        </div>

        <!-- If Employer Signed In -->
        <div v-if="!$store.state.isJobseekerLoggedIn && $store.state.isEmployerLoggedIn">
            <h2 class="grey--text text-center my-5">{{$store.state.employer.representative}}</h2>
            <h3 class="grey--text text-center">{{$store.state.employer.email}}</h3>
            <p v-if="this.$store.state.currentEmployer" style="padding: 1em;">{{this.$store.state.currentEmployer.address}}</p>
            <p v-if="this.$store.state.currentEmployer" style="padding: 1em;">{{this.$store.state.currentEmployer.phone}}</p>
            <p v-if="this.$store.state.currentEmployer" style="padding: 1em;">{{this.$store.state.currentEmployer.website}}</p>
            <v-layout justify-center>
                <v-btn @click="navigateTo('view.employer.profile', {employerId: $store.state.employer.id})">
                    View More
                </v-btn>
            </v-layout>
            <v-divider class="mx-10 my-3"></v-divider>
            <v-layout justify-center>
                <v-chip class="mx-auto my-10" 
                v-if="$store.state.isEmployerLoggedIn || $store.state.isJobseekerLoggedIn" 
                @click="logout($store.state.isEmployerLoggedIn, $store.state.isJobseekerLoggedIn)">
                    <h3 class="grey--text">Sign Out</h3>
                    <v-icon class="pl-2">power_settings_new</v-icon>
                </v-chip>
            </v-layout>
        </div>

        <!-- If User & Employer Signed Out -->
        <div v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
            <h3 class="grey--text text-center my-10">Jobseeker</h3>
        <v-layout justify-center>
        <v-btn class="mx-5" @click="navigateTo('jobseeker.login')" v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
            Log In
        </v-btn>
        <v-btn class="mx-5" @click="navigateTo('jobseeker.registration')" v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
            Sign Up
        </v-btn>
        </v-layout>
        <v-divider class="my-10 mx-10"></v-divider>
        <h3 class="grey--text text-center my-10">Employer</h3>
        <v-layout justify-center>
        <v-btn class="mx-5" @click="navigateTo('employer.login')" v-if="!$store.state.isJobseekerLoggedIn">
            Log In
        </v-btn>
        <v-btn class="mx-5" @click="navigateTo('employer.registration')" v-if="!$store.state.isJobseekerLoggedIn && !$store.state.isEmployerLoggedIn">
            Sign Up
        </v-btn>
        </v-layout>
        <v-divider class="my-10 mx-10"></v-divider>
        </div>
    </div>
</template>

<script>

export default {
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