<template>
  <div>
    <v-container>
          <h2 class="company-header-container my-3"><router-link :to="{name: 'home'}" class="heading grey--text"> Back to Job List</router-link></h2>
          <v-parallax :src="employer.coverphoto"></v-parallax>
            <v-avatar size="62" class="mx-auto mb-3" style="display:block">
              <img :src="employer.logo">
            </v-avatar>
          
          <h2 class="display-2 grey--text text-center mb-5"><span v-if="company">{{company.company}}'s</span> Company Profile</h2>
          <v-divider></v-divider>
        <v-row>
          <v-col
          :cols="12"
          sm="12"
          xs="12"
          md="4"
          class="">
            <v-flex>
              <div  class="my-5">
                <v-flex class="mx-auto">
                  <v-icon size="30" class="grey--text my-5 mx-auto text-center" style="display:block;">home</v-icon>
                </v-flex>
                <v-flex>
                  <h3 v-if="job" class="text-center">{{employer.address}}</h3>
                </v-flex>
              </div>
            </v-flex>
          </v-col>
           <v-col
          :cols="12"
          sm="12"
          xs="12"
          md="4"
          class="">
            <v-flex>
              <div  class="my-5">
                <v-flex class="mx-auto">
                  <v-icon size="30" class="grey--text my-5 mx-auto text-center" style="display:block;">phone</v-icon>
                </v-flex>
                <v-flex>
                  <h3 v-if="job" class="text-center">{{employer.phone}}</h3>
                </v-flex>
              </div>
            </v-flex>
          </v-col>
           <v-col
          :cols="12"
          sm="12"
          xs="12"
          md="4"
          class="">
            <v-flex>
              <div  class="my-5">
                <v-flex class="mx-auto">
                  <v-icon size="30" class="grey--text my-5 mx-auto text-center" style="display:block;">language</v-icon>
                </v-flex>
                <v-flex>
                  <h3 v-if="job" class="text-center">{{employer.website}}</h3>
                </v-flex>
              </div>
            </v-flex>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="12" sm="6" class="mx-auto">
            <v-flex>
               <div class="company-header-container">
                 <h2 class="grey--text"> Company Description: </h2>
                  <p>{{employer.description}}</p>
              </div>
            </v-flex>
          </v-col>
        </v-row>
        <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <div style="padding: 1em;">
                <h2 class="grey--text my-5">Active Jobs</h2>
                  <div>
                  <v-data-table
                    :headers="tableHeaders"
                    :items=" company.Jobs"
                    hide-actions
                    :pagination.sync="pagination"
                    class="elevation-1">
                    <template v-slot:items="props">
                      <td>{{ props.item.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                      <td>{{ props.item.location }}</td>
                      <td>{{ props.item.createdAt | formateDate }}</td>
                      <td><router-link :to="{name:'view.job.detail', params:{jobId: props.item.id}}" target='_blank'><v-btn small>View job</v-btn></router-link></td>
                    </template>
                  </v-data-table>
                </div>
             </div>
            </v-flex>
          </v-layout>
    </v-container>
  </div>
</template>
<script>
import JobService from '../../services/JobService'
import ProfileService from '../../services/ProfileService';
import moment from 'moment'
export default {
  created(){
    this.getCompanyInfo(this.$store.state.route.params.employerId);
  },
  mounted(){

  },
  data(){
    return {
      job: {},
      company: {},
      employer: {},
      pagination: {
        pages: 1
      },
      tableHeaders: [
        {text: 'Position/Type', value: 'type'},
        {text: 'Location', value: 'location'},
        {text: 'Date Posted', value: 'createdAt'},
      ]
    }
  },
  methods: {
    async getCompanyInfo(employerID){
      this.company = {}
      let company = (await JobService.employerJob(employerID)).data.data
      let employer = (await ProfileService.getEmployerProfile(employerID)).data.data
      this.company = company;
      this.employer = employer;
    }
  },
  computed: {
        pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
  },
  filters: {
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  }

}
</script>
<style>

</style>
