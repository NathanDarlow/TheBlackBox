/* eslint-disable */
<template>
    <v-form>
        <v-container>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-text-field
                    label="Title"
                    v-model="jobTitle"
                    required
                    :rules="[required]"
                    outline
                    shaped>
                </v-text-field>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-text-field
                    label="Location"
                    v-model="location"
                    required
                    :rules="[required]"
                    outline
                    shaped>
                </v-text-field>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-select
                outline
                label="Status"
                :items="statuses"
                v-model="status">
                </v-select>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-select
                label="Job Type"
                outline
                :items="jobTypes"
                required
                :rules="[required]"
                shaped
                item-text="DISTINCT"
                v-model="type">
                </v-select>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-text-field
                label="Annual Salary"
                outline
                required
                :rules="[required]"
                shaped
                v-model="salary">
                </v-text-field>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
              <h2>Primary Key Skills You Desire</h2>
                <v-flex>
                  <v-select
                  label="Tag 1"
                  outline
                  :items="tags"
                  required
                  :rules="[required]"
                  shaped
                  item-text="DISTINCT"
                  v-model="tagOne">
                  </v-select>
                </v-flex>
                <v-flex>
                  <v-select
                  label="Tag 2"
                  outline
                  :items="tags"
                  required
                  :rules="[required]"
                  shaped
                  item-text="DISTINCT"
                  v-model="tagTwo">
                  </v-select>
                </v-flex>
                <v-flex>
                  <v-select
                  label="Tag 3"
                  outline
                  :items="tags"
                  required
                  :rules="[required]"
                  shaped
                  item-text="DISTINCT"
                  v-model="tagThree">
                  </v-select>
                </v-flex>
                <h2>Secondary Skills Your Desire</h2>
                <v-flex>
                  <v-select
                  label="Tag 1"
                  outline
                  :items="tags"
                  required
                  :rules="[required]"
                  shaped
                  item-text="DISTINCT"
                  v-model="tagFour">
                  </v-select>
                </v-flex>
                <v-flex>
                  <v-select
                  label="Tag 2"
                  outline
                  :items="tags"
                  required
                  :rules="[required]"
                  shaped
                  item-text="DISTINCT"
                  v-model="tagFive">
                  </v-select>
                </v-flex>
                <v-flex>
                  <v-select
                  label="Tag 3"
                  outline
                  :items="tags"
                  required
                  :rules="[required]"
                  shaped
                  item-text="DISTINCT"
                  v-model="tagSix">
                  </v-select>
                </v-flex>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="apply_date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                     v-model="apply_date"
                     label="Last Date To Apply"
                     readonly
                     outline
                     v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="apply_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(apply_date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="12" class="mx-auto">
                <v-textarea
                label="Job Description"
                required
                :rules="[required]"
                outline
                shaped
                v-model="description">
                </v-textarea>
            </v-col>
        </v-container>
        <v-row>
            <v-btn
              class="ma-2 mx-auto mb-5"
              outlined color="secondary"
              @click="createJob">
              Post Job
            </v-btn>
        </v-row>
    </v-form>
</template>
<script>
import EmployerService from '../../services/EmployerService'
import moment from 'moment'
export default {
  created(){
    this.getEmployerJobs(this.$store.state.route.params.employerId);
  },
  data(){
    return {
      jobTypes: [
        'Full-time',
        'Part-time',
        'Remote'
      ],
      statuses: [
        'Live',
        'Draft'
      ],
      tags: [
        'Developer',
        'React',
        'Javascript',
        'Digital Marketing',
        'SEO',
        'PPC',
        'UX / UI Design',
        'Photoshop'
      ],
      apply_date: new Date().toISOString().substr(0, 10),
      menu: false,
      jobTitle: '',
      salary: '',
      location: '',
      type: '',
      status: '',
      tagOne: '',
      tagTwo: '',
      tagThree: '',
      tagFour: '',
      tagFive: '',
      tagSix: '',
      description: '',
      employersJobs: [],
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  filters: {
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  },
  methods: {
    async createJob(){
      // declare empty object to hold job values
         let jobObj = {};
        // Check for required values and store them in job object
        if (this.jobTitle) jobObj.jobTitle = this.jobTitle;
        if (this.location) jobObj.location = this.location;
        if (this.salary) jobObj.salary = this.salary;
        if (this.type)jobObj.type = this.type;
        if (this.tagOne) jobObj.tagOne = this.tagOne;
        if (this.tagTwo) jobObj.tagTwo = this.tagTwo;
        if (this.tagThree) jobObj.tagThree = this.tagThree;
        if (this.tagFour) jobObj.tagFour = this.tagFour;
        if (this.tagFive) jobObj.tagFive = this.tagFive;
        if (this.tagSix) jobObj.tagSix = this.tagSix;
        if (this.status === 'Live'){
           this.status = true;
           jobObj.active = this.status;
        } else {
          this.status = false;
          jobObj.active = this.status;
        }
        if (this.description) jobObj.description = this.description;
        if (this.apply_date) jobObj.job_ending = this.apply_date;
        let employerId = this.$store.state.route.params.employerId;
        if (employerId) jobObj.EmployerId = employerId;
       const createdJob = await EmployerService.createJob(jobObj);
        if (createdJob) {
          this.getEmployerJobs(this.$store.state.route.params.employerId);
          console.log(createdJob)
        }
    },
    async getJobTypes(){
        const jobTypes = (await EmployerService.getJobTypes()).data.data
        this.jobTypes = jobTypes;
    },
    async getEmployerJobs(employerId){
      this.employersJobs = [];
      const employerJobs = (await EmployerService.getEmployerJobs(employerId)).data.data;
      this.employersJobs = employerJobs;
    },
  }
}
</script>
