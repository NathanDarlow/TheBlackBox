<template>
  <div>
    <v-container class="hidden-sm-and-down">
      <DetailVertical />
    </v-container>
    <v-container class="hidden-md-and-up">
        <DetailHorizontal />
    </v-container>
  </div>
  
</template>


<script>
import DetailVertical from './jobs/DetailVertical'
import DetailHorizontal from './jobs/DetailHorizontal'
export default {
  components: {
    DetailVertical,
    DetailHorizontal,
  },
}
</script>

<style scoped>

</style>