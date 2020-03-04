<template>
    <div>
        <h2 class="grey--text text-center my-5">Settings</h2>
        <v-divider class="mx-10"></v-divider>
        <!-- PWA -->
        <p class="mt-5">TODO: PWA Support</p>

        <p class="mt-5">TODO: More Settings?</p>
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