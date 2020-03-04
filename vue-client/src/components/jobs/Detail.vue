<template>
    <v-container>
      <h2 class="company-header-container my-3"><router-link :to="{name: 'home'}" class="heading grey--text"> Back to Job List</router-link></h2>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-row>
          <!-- Job Details -->
          <v-col cols="12" md="5" sm="6" class="mx-auto">
            <v-flex xs12 md8 pa-2>
                    <h2 class="heading grey--text text-center my-5">Job Details</h2>
                    <v-divider></v-divider>
                      <div class="my-5">
                        <v-flex><router-link :to="{name:'view.employer.detail', params: {employerId: company.id}}" v-if="company.id"><span class="title my-10">Visit Company Page</span></router-link></v-flex>
                    </div>
                    <v-divider></v-divider>
                    <div  class="my-5">
                        <v-flex><span class="title grey--text my-5">Annual Salary: </span><span class="title" v-if="job">{{job.salary}}</span></v-flex>
                    </div>
                    <v-divider></v-divider>
                      <div  class="my-5">
                        <v-flex><span class="title grey--text my-5">Location: </span><span class="title" v-if="job">{{job.location}}</span></v-flex>
                    </div>
                    <v-divider></v-divider>
                      <div  class="my-5">
                        <v-flex><span class="title grey--text my-5">Type: </span><span class="title" v-if="job">{{job.type}}</span></v-flex>
                    </div>
                    <v-divider></v-divider>

                    <div  class="my-5">
                        <v-flex><span class="title grey--text my-5">Job Posted: </span><span class="title" v-if="job">{{job.createdAt | formateDate }}</span></v-flex>
                    </div>
                    <v-divider></v-divider>


                      <div  class="my-5">
                        <v-flex><span class="title grey--text my-5">Last Date To Apply: </span><span class="title" v-if="job">{{job.job_ending | formateDate }}</span></v-flex>
                    </div>
                    <v-divider></v-divider>


                    <div  class="my-5">
                        <v-flex><span class="title grey--text my-5">{{company.company}} Representative: </span><span class="title" v-if="job">{{ company.representative }}</span></v-flex>
                    </div>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col cols="12" md="12" sm="6" class="mx-auto">
                         <div v-if="!this.$store.state.isJobseekerLoggedIn && !this.$store.state.isEmployerLoggedIn">
                          <h3 class="red--text text-center">To Apply and Bookmark Please Login In</h3>
                        </div>
                        <div v-if="this.$store.state.isJobseekerLoggedIn && !alreadyApplied" class="button">
                          <a href="javascript:void(0)" @click="applyForJob">
                            Apply
                            <i></i>
                          </a>
                        </div>
                      </v-col>
                      <v-row>
                        <v-flex xs12>
                          <div class="mx-auto my-10" style="padding: 0.1em;" v-if="this.$store.state.isJobseekerLoggedIn">
                            <v-btn
                              v-if="!isFavorited"
                              @click.prevent="favorite">
                              <h3 class="grey--text">Bookmark This Job</h3>
                            </v-btn>
                            <v-btn
                              v-if="isFavorited"
                              @click.prevent="unFavorite">
                              <h3 class="grey--text">Un-Bookmark This Job</h3>
                            </v-btn>
                          </div>
                        </v-flex>
                      </v-row>
                    </v-row>
              </v-flex>
          </v-col>
          <!-- Job Description -->
          <v-col cols="12" md="7" sm="6" class="mx-auto">
            <v-flex xs12 md12 pa-2>
              <h1 v-if="job" class="heading grey--text text-center">{{job.jobTitle}}</h1>
              <h3 class="heading grey--text text-center mb-5">at {{ company.company }} - {{job.location}}</h3>
              <v-divider></v-divider>
              <p v-if="job" class="heading black--text text-center my-10">{{job.description}}</p>
            </v-flex>
          </v-col>
          
        </v-row>
      </v-layout>
      <v-system-bar v-if="this.$store.state.isJobseekerLoggedIn && alreadyApplied"><h3 class="text-center mx-auto">You Have Applied To This Job</h3></v-system-bar>
    </v-container>
</template>

<script>
import JobService from '../../services/JobService'
import moment from 'moment'
export default {
  created(){
    this.getJobInfo();
    this.checkExisitingJobApplication();
    this.checkFavoritedJob();
  },
  mounted(){
  },
  data(){
    return {
      job: {},
      company: {},
      alreadyApplied: false,
      isFavorited: false,
    }
  },
  methods: {
    async unFavorite(){
      this.isFavorited = !this.isFavorited;
      let jobseekerID = this.$store.state.jobseeker.id;
      let jobID = this.$store.state.route.params.jobId;
       let jobResponse = (await JobService.removeJobFromFavorites(jobID, jobseekerID)).data.data;
       if (jobResponse) {
        // The favorite was removed
       }
    },
    async favorite(){
      this.isFavorited = !this.isFavorited;
      let jobseekerID = this.$store.state.jobseeker.id;
      let jobID = this.$store.state.route.params.jobId;
      let jobResponse = (await JobService.addJobToFavorites(jobID, jobseekerID)).data.data;
      if (jobResponse) {
       // The favorite was added
      }
    },
    async getJobInfo(){
      this.job = {};
       const jobId = this.$store.state.route.params.jobId;
       let job = (await JobService.viewJob(jobId)).data.data;
       this.job = job;
       this.getCompanyInfo(job.EmployerId);
    },
    async getCompanyInfo(employerID){
      this.company = {}
      const company = (await JobService.employerJob(employerID)).data.data
      this.company = company;
    },
    async applyForJob(){
      let jobseekerId = this.$store.state.jobseeker.id;
      let jobId = this.$store.state.route.params.jobId;
      const applied = (await JobService.applyForJob(jobseekerId, jobId))
          if (applied) {
            // Application sent
          } else {
               // Application was not sent
          }
          this.checkExisitingJobApplication();
    },
    async checkExisitingJobApplication(){
      let jobId = this.$store.state.route.params.jobId;
      if (this.$store.state.jobseeker) {
       let jobseekerId = this.$store.state.jobseeker.id;
       const applied = (await JobService.checkJobApplication(jobseekerId, jobId)).data.data
          if (applied && applied !== null) {
              this.alreadyApplied = true;
          } else {
            // Never applied
          }
      }
    },
    async checkFavoritedJob(){
      let jobId = this.$store.state.route.params.jobId;
      if (this.$store.state.jobseeker) {
       let jobseekerId = this.$store.state.jobseeker.id;
       const markedAsFavorite = (await JobService.checkFavoritedJob(jobId, jobseekerId)).data.data
          if (markedAsFavorite && markedAsFavorite !== null) {
              this.isFavorited = true;
          } else {
              this.isFavorited = false;
          }
      }
    }
  },
  computed: {

  },

  filters: {
    formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    }
  }

}
</script>
<style scoped>
 .button>a {
  
/*  styling */
  display: inline-block;
	text-transform: uppercase;
  text-decoration: none;
	letter-spacing: 5px;
	color: #FAFAFA;
	border: 3px solid #FAFAFA;
  border-radius: 15px;
	padding: 15px;
  
/*  centering */
	position: fixed;
	text-align: center;
	left: 50%;
	bottom: 5%;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	background: rgba(0,0,0,0.5);
}


i {
/*   positioning */
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
  
/*   gradient   */
		background: -moz-linear-gradient(left,  rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 1%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.85) 70%, rgba(255,255,255,0.85) 71%, rgba(255,255,255,0) 100%); /* FF3.6+ */
		background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(1%,rgba(255,255,255,0.03)), color-stop(30%,rgba(255,255,255,0.85)), color-stop(50%,rgba(255,255,255,0.85)), color-stop(70%,rgba(255,255,255,0.85)), color-stop(71%,rgba(255,255,255,0.85)), color-stop(100%,rgba(255,255,255,0))); /* Chrome,Safari4+ */
		background: -webkit-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,0.03) 1%,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.85) 50%,rgba(255,255,255,0.85) 70%,rgba(255,255,255,0.85) 71%,rgba(255,255,255,0) 100%); /* Chrome10+,Safari5.1+ */
		background: -o-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,0.03) 1%,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.85) 50%,rgba(255,255,255,0.85) 70%,rgba(255,255,255,0.85) 71%,rgba(255,255,255,0) 100%); /* Opera 11.10+ */
		background: -ms-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,0.03) 1%,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.85) 50%,rgba(255,255,255,0.85) 70%,rgba(255,255,255,0.85) 71%,rgba(255,255,255,0) 100%); /* IE10+ */
		background: linear-gradient(to right,  rgba(255,255,255,0) 0%,rgba(255,255,255,0.03) 1%,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.85) 50%,rgba(255,255,255,0.85) 70%,rgba(255,255,255,0.85) 71%,rgba(255,255,255,0) 100%); /* W3C */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
    
/*  forming the shine element
    play around with the width, skew and gradient to get different effects
  */
		width: 15%;
		height: 100%;
     transform: skew(-10deg,0deg);
		-webkit-transform: skew(-10deg,0deg);
     -moz-transform: skew(-10deg,0deg);
     -ms-transform: skew(-10deg,0deg);
     -o-transform: skew(-10deg,0deg);
  
/*  animating it  */
     animation: move 2s;
		animation-iteration-count: infinite;
		animation-delay: 1s;
		-webkit-animation: move 2s;
		-webkit-animation-iteration-count: infinite;
		-webkit-animation-delay: 1s;
		-moz-transform: skew(-10deg,0deg);
		-moz-animation: move 2s;
		-moz-animation-iteration-count: infinite;
		-moz-animation-delay: 1s;
		-ms-transform: skew(-10deg,0deg);
		-ms-animation: move 2s;
		-ms-animation-iteration-count: infinite;
		-ms-animation-delay: 1s;
		-o-transform: skew(-10deg,0deg);
		-o-animation: move 2s;
		-o-animation-iteration-count: infinite;
		-o-animation-delay: 1s;
	}

/*  */
@keyframes move {
	0%  { left: 0; opacity: 0; }
	5% {opacity: 0.0}
	48% {opacity: 0.2}
	80% {opacity: 0.0}
	100% { left: 82%}
}

@-webkit-keyframes move {
	0%  { left: 0; opacity: 0; }
	5% {opacity: 0.0}
	48% {opacity: 0.2}
	80% {opacity: 0.0}
	100% { left: 82%}
}

@-moz-keyframes move {
	0%  { left: 0; opacity: 0; }
	5% {opacity: 0.0}
	48% {opacity: 0.2}
	80% {opacity: 0.0}
	100% { left: 88%}
}

@-ms-keyframes move {
	0%  { left: 0; opacity: 0; }
	5% {opacity: 0.0}
	48% {opacity: 0.2}
	80% {opacity: 0.0}
	100% { left: 82%}
}

@-o-keyframes move {
	0%  { left: 0; opacity: 0; }
	5% {opacity: 0.0}
	48% {opacity: 0.2}
	80% {opacity: 0.0}
	100% { left: 82%}
}
</style>
