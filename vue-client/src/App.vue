<template>
  <div id="app">
    <v-app style="background: #f9f9f9">
      <v-content style="height: 100%; overflow-y: hidden; overflow-x: hidden;">
        <app-header></app-header>
        <router-view/>
        <Appbar />
      </v-content>
      <app-footer></app-footer>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Appbar from './components/Appbar'
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer,
    Appbar
  },
  data: () => {
    return {

    }
  }

}
</script>

<style>
</style>
