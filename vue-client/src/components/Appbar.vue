<template>
  <v-bottom-navigation
    v-model="bottomNav"
    shift
    fixed
    class="hidden-md-and-up"
  >
    <v-btn class="mr-10" @click="navigateTo('home')">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn @click="navigateTo('profile')">
      <span>Account</span>
      <v-icon>person</v-icon>
    </v-btn>
    
    <v-btn class="ml-10" @click="navigateTo('settings')">
      <span>Settings</span>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 3,
      }
    },
    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      },
      },
      methods: {
        navigateTo(route, param){
          if (param) {
            this.$router.push({ name: route, params: param });
          } else {
            this.$router.push({name: route});
          }
        },
      }
  }
</script>