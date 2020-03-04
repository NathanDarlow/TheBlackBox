<template>
  <div>
    <v-container>
      <v-flex lg3 md3 xs12  class="section-container mx-auto">
        <h2 class="display-2 grey--text text-center my-10">Edit Profile</h2>
      <file-upload
         upload_header="Upload Company Logo"
         file_type="image"
         upload_label="Choose Logo"
         upload_name="company_logo"
         profileType="employer"
          allowedTypes=".jpeg .jpg .png .gif"
         :profileID="this.$store.state.route.params.employerId"
         >
      </file-upload>
    </v-flex>
          <v-divider></v-divider>
        <v-row>
          <v-col
          :cols="12"
          sm="12"
          xs="12"
          md="6"
          class="">
          <v-row>
            <v-flex>
            <form action="" class="form">
            <v-text-field label="Address" outline v-model="employer.address"  @change="inputChange(employer.address)"></v-text-field>
            <v-text-field label="Phone" outline v-model="employer.phone" @change="inputChange(employer.phone)"></v-text-field>
             <v-text-field label="Website" outline v-model="employer.website" @change="inputChange(employer.website)"></v-text-field>
               <v-textarea
                  outline
                  textarea
                  label="Description"
                  v-model="employer.description"
                  @change="inputChange(employer.description)"
               ></v-textarea>
              <v-flex 12>
                <v-row></v-row>
                
             </v-flex>
          </form>
            </v-flex>
          </v-row>
          </v-col>
           <v-col
          :cols="12"
          sm="12"
          xs="12"
          md="6"
          class="">
            <v-row>
        <v-flex lg4 md4 xs12>
            <h2 class="grey--text">About your company</h2>
            <v-divider></v-divider>
             <div  class="my-5">
              <v-flex><span class="title grey--text my-5">Address: </span><span class="title" v-if="this.$store.state.currentEmployer">{{this.$store.state.currentEmployer.address}}</span></v-flex>
              </div>
              <v-divider></v-divider>
              <div  class="my-5">
              <v-flex><span class="title grey--text my-5">Phone: </span><span class="title"  v-if="this.$store.state.currentEmployer && this.$store.state.currentEmployer.phone !== null">{{this.$store.state.currentEmployer.phone}}</span></v-flex>
              </div>
              <v-divider></v-divider>
              <div  class="my-5">
              <v-flex><span class="title grey--text my-5">Website: </span><span class="title" v-if="this.$store.state.currentEmployer && this.$store.state.currentEmployer.website !== null">{{this.$store.state.currentEmployer.website}}</span></v-flex>
              </div>
              <v-divider></v-divider>
              <div  class="my-5">
              <v-flex><span class="title grey--text my-5">Company Description:</span><p>{{employer.description}}</p>
            </v-flex>
              </div>
              <v-divider></v-divider>
        </v-flex>
            </v-row>
          </v-col>
           <v-col
          :cols="12"
          sm="12"
          xs="12"
          md="12"
          class="">
          <v-layout row wrap>
            <v-flex lg6 xs12 v-if="employersJobs" class="mx-auto">
            <div style="padding: 1em;">
                 <h2 class="grey--text">Active Jobs</h2>
                   <div>
                  <v-flex v-for="job in employersJobs" :key="job.id">
                      <v-row>
                        <v-col>
                          <p>{{ job.jobTitle }}</p>
                      
                        </v-col>
                        <v-col>
                          <p>{{ job.type }}</p>
                        </v-col>
                        <v-col>
                          <p>{{ job.location }}</p>
                      
                        </v-col>
                        <v-col>
                          <p>{{ job.createdAt | formateDate }}</p>
                      
                        </v-col>
                        <v-col>
                          <p><router-link :to="{name:'edit.employer.job', params:{jobId: job.id} }"><v-btn>Edit</v-btn></router-link></p>
                      
                        </v-col>
                        <v-col>
                          <p><v-btn small @click="removeJob(job.id)">Remove</v-btn></p>
                        </v-col>
                      </v-row>
                      <v-divider></v-divider>
                  </v-flex>
                </div>
             </div>
         </v-flex>
          </v-layout>
            
      <v-layout row wrap>
        <v-flex lg6 xs12  class="mx-auto">
            <div style="padding: 1em;">
                 <h2 class="grey--text">Inactive Jobs</h2>
                   <div>
                  <v-flex v-for="job in employersInactiveJobs" :key="job.id" class="my-1">
                      <v-row>
                        <v-col>
                          <p>{{ job.jobTitle }}</p>
                      
                        </v-col>
                        <v-col>
                          <p>{{ job.type }}</p>
                        </v-col>
                        <v-col>
                          <p>{{ job.location }}</p>
                      
                        </v-col>
                        <v-col>
                          <p>{{ job.createdAt | formateDate }}</p>
                      
                        </v-col>
                      </v-row>
                  </v-flex>
                </div>
           </div>
        </v-flex>
      </v-layout>
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>
<script>
import EmployerService from '../../../services/EmployerService'
import ProfileService from '../../../services/ProfileService';
import FileUpload from '../../fileupload/FileUpload'
import EventBus from '../../../main'
import moment from 'moment'
export default {
  components: {
    'file-upload': FileUpload
  },
  created(){
    this.getProfileInfo();
    this.getEmployerJobs(this.$store.state.route.params.employerId);
    this.getInactiveEmployerJobs(this.$store.state.route.params.employerId)
  },
  mounted(){
     let $this = this;
     EventBus.$on('update-employer-progress', function(){
      $this.getProfileInfo();
    })
  },
  data: function(){
    return {
      tableHeaders: [
                {
                    text: 'Title',
                    value: 'title'
                },
                {
                    text: 'Company',
                    value: 'company'
                }
            ],
            pagination: {
                sortBy: 'createdAt',
                decending: true
            },
      employer: {
        address: '',
        phone: '',
        website: '',
        slogan: '',
        description: '',
      },
      statuses: [
        'Live',
        'Draft'
      ],
      menu: false,
      alertSubmit: false,
      stepsToComplete: [],
      employersJobs: [],
      employersInactiveJobs: [],
    }
  },

  filters: {
    shortenString(string){
     if (string && string !== null) {
      if (string.length > 120) {
          return string.substring(0, (string.length / 2)) + '...'
        }
     } else {
        return string
     }
    },
    shortenURL(url){
      if (url && url !== null) {
       if (url.length > 75) {
          return url.substring(0, (url.length / 2)) + '...'
        } else {
          return url;
        }
      }
    },
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  },
  methods:{
        async removeJob(jobId){
      try {
      if (jobId) {
          let response = confirm('Are you sure you want to make this job inactive? This Cannot Be Undone.');
          if (response) {
                const deletedJob = (await EmployerService.deleteJob(jobId)).data;
                if (deletedJob.success) {
                    this.getEmployerJobs(this.$store.state.route.params.employerId);
                    this.getInactiveEmployerJobs(this.$store.state.route.params.employerId);
                } else {
                  confirm('There was an error with the request');
                }
          }
        }
      } catch (error) {
        // An error occoured
        confirm('There was an error with the request');
      }
    },
    inputChange: function(input){
      if (input && !this.alertSubmit) {
        this.alertSubmit = true;
      }
    },
    async getProfileInfo(){
        this.employer = {}
        let employerId = this.$store.state.route.params.employerId;
        // Make request to ProfileService sending employer :id
        let employer = (await ProfileService.getEmployerProfile(employerId)).data.data
        // Get response and check if employer object is returned and store that in the employer object if null is returned then empty employer object
        if (employer === null) {
            this.employer = {}
        } else {
            this.employer = employer;
            // Update the vuex store with the currentEmployer object
             this.$store.dispatch('setCurrentEmployerAction', this.employer)
            // Call a function that updates the progress status passing in the employer object
            // It will recalculate after every update
             this.updateProgressStatus(this.employer);
        }
    },
    async updateEmployerProfile(){
        // Declare empty object to store the employer information
        let emplObj = {};
        // Check if each required input has a value and store in the newly created object
         if (this.employer.address) emplObj.address = this.employer.address
         if (this.employer.phone) emplObj.phone = this.employer.phone
         if (this.employer.website) emplObj.website = this.employer.website
         if (this.employer.slogan) emplObj.slogan = this.employer.slogan
         if (this.employer.description) emplObj.description = this.employer.description
        // Make request to ProfileService sending the employer object
        const updatedEmployer = await ProfileService.updateEmployerProfile(emplObj)
        // Check response and if updated employer object is retured
        if (updatedEmployer) {
           // If updated employer object is returned then call getProfileInfo function to pull down updated info
            this.alertSubmit = false;
            this.getProfileInfo();
        } else {
          // Alert user there was no info returned
          confirm('There was an error handling your request')
        }
    },
    async getEmployerJobs(employerId){
      this.employersJobs = [];
      const employerJobs = (await EmployerService.getEmployerJobs(employerId)).data.data;
      this.employersJobs = employerJobs;
    },
    async getInactiveEmployerJobs(employerId){
      this.employersInactiveJob = [];
      const employerInactiveJobs = (await EmployerService.getInactiveEmployerJobs(employerId)).data.data;
      this.employersInactiveJobs = employerInactiveJobs;
    }
  }
}
</script>
<style>
.form{
  padding: 1em;
}
  .section-container{
    padding: 0.2em;
  }
  .content-item{
    padding: 1em;
    border-bottom: 1px solid #eee;
  }
@media screen and (max-width: 825px) {
.profile-header{
  font-size: 1em;
 }
.v-progress-circular{
   width: 78px !important;
   height: 78px !important;
 }
.v-datatable thead th{
    padding: 0 !important;
}
.v-datatable tbody p{
    padding: 0 !important;
}
}
</style>
