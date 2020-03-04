<template>
  <div>
    <h1 class="heading grey--text my-3 text-center">Profile</h1>
    <v-card>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow>
      <v-tab>
        <h3
        class="grey--text">View Profile</h3>
      </v-tab>
      <v-tab-item>
        <v-card
          flat>
          <v-card-text>
            <v-row dense >
              <v-col
              :cols="12"
              sm="12"
              xs="12"
              md="3"
              class="">
                <v-img
                aspect-ratio="1"
                v-if="this.$store.state.currentJobSeeker"
                :src="this.$store.state.currentJobSeeker.photo"
                max-height="200"
                max-width="200"
                class="mx-auto"
                style="margin-left: -25px; display: block; padding: 1em; border-radius:50%;"/>
                <h2 class="heading grey--text mt-5 text-center" style="margin: auto;"
                v-if="this.$store.state.currentJobSeeker">
                {{ this.$store.state.jobseeker.firstName }} {{ this.$store.state.jobseeker.lastName }}</h2>
                <p class="text-center mt-10">Developer</p>
                <v-divider></v-divider>
                <h2 class="heading grey--text mt-5 text-center">Profile:</h2>
                <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;"> {{this.$store.state.currentJobSeeker.bio}}</p>
                <v-divider></v-divider>
                <h2 class="heading grey--text mt-5 text-center">Contact:</h2>
                <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{this.$store.state.currentJobSeeker.address}}</p>
                <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{ this.$store.state.jobseeker.email }}</p>
                <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{this.$store.state.currentJobSeeker.phone}}</p>
                <p v-if="this.$store.state.currentJobSeeker" style="padding: 1em;">{{this.$store.state.currentJobSeeker.website}}</p>
                <v-divider></v-divider>
                <h2 class="heading grey--text mt-5 text-center">Key Skills</h2>
                  <v-row style="padding: 1em;" class="my-5 mx-auto">
                    <v-flex>
                      <v-chip>
                        {{ this.$store.state.currentJobSeeker.keySkillOne }}
                      </v-chip>
                    </v-flex>
                    <v-flex>
                      <v-chip>
                        {{ this.$store.state.currentJobSeeker.keySkillTwo }}
                      </v-chip>
                    </v-flex>
                    <v-flex>
                      <v-chip>
                        {{ this.$store.state.currentJobSeeker.keySkillThree }}
                      </v-chip>
                    </v-flex>
                  </v-row>
                  <v-row style="padding: 1em;" class="my-5 mx-auto">
                    <v-flex>
                      <v-chip>
                        {{ this.$store.state.currentJobSeeker.keySkillFour }}
                      </v-chip>
                    </v-flex>
                    <v-flex>
                      <v-chip>
                        {{ this.$store.state.currentJobSeeker.keySkillFive }}
                      </v-chip>
                    </v-flex>
                    <v-flex>
                      <v-chip>
                        {{ this.$store.state.currentJobSeeker.keySkillSix }}
                      </v-chip>
                    </v-flex>
                  </v-row>
              </v-col>
              <v-col
              :cols="12"
              sm="12"
              xs="12"
              md="9"
              class="mt-10">
                <h2 class="text-center my-5">Employment History</h2>
                <v-divider class="mx-10"></v-divider>
                <v-row v-if="this.$store.state.currentJobSeeker.jobHistCompanyOne" class="my-10 mx-10">
                <v-flex>
                  <h2 class="subheading grey--text"
                  v-if="this.$store.state.currentJobSeeker">
                  {{ this.$store.state.currentJobSeeker.jobHistCompanyOne }} | {{ this.$store.state.currentJobSeeker.jobHistRoleOne }}</h2>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md2>
                  <h2 class="subheading grey--text">{{ this.$store.state.currentJobSeeker.jobHistDateOne }}</h2>
                </v-flex>
                  <p class="mt-5">{{ this.$store.state.currentJobSeeker.jobHistDescOne }}</p>
                  <v-divider></v-divider>
                </v-row>
                <v-row v-if="this.$store.state.currentJobSeeker.jobHistCompanyTwo" class="my-10 mx-10">
                <v-flex>
                  <h2 class="subheading grey--text"
                  v-if="this.$store.state.currentJobSeeker">
                  {{ this.$store.state.currentJobSeeker.jobHistCompanyTwo }} | {{ this.$store.state.currentJobSeeker.jobHistRoleTwo }}</h2>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md2>
                  <h2 class="subheading grey--text">{{ this.$store.state.currentJobSeeker.jobHistDateTwo }}</h2>
                </v-flex>
                  <p class="mt-5">{{ this.$store.state.currentJobSeeker.jobHistDescTwo }}</p>
                  <v-divider></v-divider>
                </v-row>
                <v-row v-if="this.$store.state.currentJobSeeker.jobHistCompanyThree" class="my-10 mx-10">
                <v-flex>
                  <h2 class="subheading grey--text"
                  v-if="this.$store.state.currentJobSeeker">
                  {{ this.$store.state.currentJobSeeker.jobHistCompanyThree }} | {{ this.$store.state.currentJobSeeker.jobHistRoleThree }}</h2>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md2>
                  <h2 class="subheading grey--text">{{ this.$store.state.currentJobSeeker.jobHistDateThree }}</h2>
                </v-flex>
                  <p class="mt-5">{{ this.$store.state.currentJobSeeker.jobHistDescThree }}</p>
                  <v-divider></v-divider>
                  
                  <v-flex>
                  <h2>Resume: <a :href="this.$store.state.currentJobSeeker.resume" v-if="this.$store.state.currentJobSeeker"><span>{{ this.$store.state.currentJobSeeker.resume | shortenURL }}</span></a></h2>
                  <v-divider></v-divider>


                  <h2>Cover Letter: <a :href="this.$store.state.currentJobSeeker.coverletter" v-if="this.$store.state.currentJobSeeker"><span>{{ this.$store.state.currentJobSeeker.coverletter | shortenURL }}</span></a></h2>
                  <v-divider></v-divider>
                  </v-flex>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>
        <h3 class="grey--text">Edit Profile</h3>
      </v-tab>
      <v-tab-item>
        <v-card
          flat>
          <v-card-text>
            <v-layout row wrap>
                <v-flex lg3 md4>
                  <file-upload
                  upload_header="Update Your Profile Photo"
                  file_type="image"
                  upload_label="Choose Photo"
                  upload_name="profilephoto"
                  profileType="jobseeker"
                  allowedTypes=".jpeg .jpg .png .gif"
                  :profileID="this.$store.state.route.params.jobseekerId">
                  </file-upload>

                  <v-flex>
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    full-width
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                      v-model="joBSeeker.dob"
                      @change="inputChange(joBSeeker.dob)"
                      label="Date Of Birth"
                      readonly
                      outline
                      v-on="on">
                      </v-text-field>
                    </template>
                    <v-date-picker
                    ref="picker"
                    v-model="joBSeeker.dob"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save">
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                  <!-- Contact Stuff -->

                  <v-flex>
                    <h2 class="text-center my-5">
                      Contact Info
                    </h2>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex>
                    <v-text-field label="Website" outline v-model="joBSeeker.website" @change="inputChange(joBSeeker.website)"></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field label="Phone" outline v-model="joBSeeker.phone" @change="inputChange(joBSeeker.phone)"></v-text-field>
                  </v-flex>

                  <v-flex>
                    <v-text-field label="Address" outline v-model="joBSeeker.address" @change="inputChange(joBSeeker.address)"></v-text-field>
                  </v-flex>

                  <!-- Bio Stuff -->
                  <v-flex>
                  <h2 class="text-center mb-10">
                    Personal Bio
                  </h2>
                  <v-divider class="mb-10"></v-divider>
                  </v-flex>
                  <v-flex>
                    <v-textarea
                    maxlength="300"
                    outline
                    textarea
                    label="Bio"
                    v-model="joBSeeker.bio"
                    value="">
                    </v-textarea>
                  </v-flex>
                  <v-flex>
                    <p>Max Length 130 Characters</p>
                  </v-flex>

                <!-- Key Skills Edit -->
                  <v-flex>
                    <h2 class="text-center my-10">
                      Primary Key Skills
                    </h2>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                    maxlength="15"
                    outline
                    textarea
                    label="Key Skill"
                    @change="inputChange(joBSeeker.keySkillOne)"
                    v-model="joBSeeker.keySkillOne"
                    value="">
                    </v-text-field>

                    <v-text-field
                    maxlength="15"
                    outline
                    textarea
                    label="Key Skill"
                    @change="inputChange(joBSeeker.keySkillTwo)"
                    v-model="joBSeeker.keySkillTwo"
                    value="">
                    </v-text-field>

                    <v-text-field
                    maxlength="15"
                    outline
                    textarea
                    label="Key Skill"
                    @change="inputChange(joBSeeker.keySkillThree)"
                    v-model="joBSeeker.keySkillThree"
                    value="">
                    </v-text-field>
                    <v-flex>
                      <h2 class="text-center my-10">
                        Additional Skills
                      </h2>
                    <v-divider></v-divider>
                    </v-flex>
                    <v-text-field
                    maxlength="15"
                    outline
                    textarea
                    label="Key Skill"
                    @change="inputChange(joBSeeker.keySkillFour)"
                    v-model="joBSeeker.keySkillFour"
                    value="">
                    </v-text-field>

                    <v-text-field
                    maxlength="15"
                    outline
                    textarea
                    label="Key Skill"
                    @change="inputChange(joBSeeker.keySkillFive)"
                    v-model="joBSeeker.keySkillFive"
                    value="">
                    </v-text-field>

                    <v-text-field
                    maxlength="15"
                    outline
                    textarea
                    label="Key Skill"
                    @change="inputChange(joBSeeker.keySkillSix)"
                    v-model="joBSeeker.keySkillSix"
                    value="">
                    </v-text-field>
                  </v-flex>
                </v-flex>
                <form action="" class="form my-10 mx-auto">
                <v-flex>
                  <h2 class="text-center my-5">
                    Employment History
                  </h2>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex class="my-5">
                  <h3 class="my-5">Job 1</h3>
                  <v-row>
                    <v-text-field
                      @change="inputChange(joBSeeker.jobHistCompanyOne)"
                      label="Company"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistCompanyOne"
                      v-on="on">
                      </v-text-field>
                      <v-text-field
                      @change="inputChange(joBSeeker.jobHistRolOne)"
                      label="Job Role"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistRoleOne"
                      v-on="on">
                      </v-text-field>
                      <v-text-field
                      @change="inputChange(joBSeeker.jobHistDateOne)"
                      label="Date"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistDateOne"
                      v-on="on">
                      </v-text-field>
                      </v-row>
                    </v-flex>
                    <v-flex>
                      <v-textarea
                      maxlength="300"
                      outline
                      textarea
                      v-model="joBSeeker.jobHistDescOne"
                      label="About This Job?"
                      value="">
                      </v-textarea>
                    </v-flex>

                    <v-flex class="my-5">
                  <h3 class="my-5">Job 2</h3>
                  <v-row>
                    <v-text-field
                      @change="inputChange(joBSeeker.jobHistCompanyTwo)"
                      label="Company"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistCompanyTwo"
                      v-on="on">
                      </v-text-field>
                      <v-text-field
                      @change="inputChange(joBSeeker.jobHistRoleTwo)"
                      label="Job Role"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistRoleTwo"
                      v-on="on">
                      </v-text-field>
                      <v-text-field
                      @change="inputChange(joBSeeker.jobHistDateTwo)"
                      label="Date"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistDateTwo"
                      v-on="on">
                      </v-text-field>
                      </v-row>
                    </v-flex>
                    <v-flex>
                      <v-textarea
                      maxlength="300"
                      outline
                      textarea
                      v-model="joBSeeker.jobHistDescTwo"
                      label="About This Job?"
                      value="">
                      </v-textarea>
                    </v-flex>

                    <v-flex class="my-5">
                  <h3 class="my-5">Job 3</h3>
                  <v-row>
                    <v-text-field
                      @change="inputChange(joBSeeker.jobHistCompanyThree)"
                      label="Company"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistCompanyThree"
                      v-on="on">
                      </v-text-field>
                      <v-text-field
                      @change="inputChange(joBSeeker.jobHistRoleThree)"
                      label="Job Role"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistRoleThree"
                      v-on="on">
                      </v-text-field>
                      <v-text-field
                      @change="inputChange(joBSeeker.jobHistDateThree)"
                      label="Date"
                      class="mx-2"
                      outline
                      v-model="joBSeeker.jobHistDateThree"
                      v-on="on">
                      </v-text-field>
                      </v-row>
                    </v-flex>
                    <v-flex>
                      <v-textarea
                      maxlength="300"
                      outline
                      textarea
                      v-model="joBSeeker.jobHistDescThree"
                      label="About This Job?"
                      value="">
                      </v-textarea>
                    </v-flex>
                    
                    <!-- Cover letter & Resume -->
                    <v-row>
                      <v-col xs12>
                        <h2 class="grey--text mx-5">Upload CV</h2>
                  <file-upload
                    upload_header="Update Your Resume"
                    file_type="document"
                    upload_label="Choose File"
                    upload_name="resume"
                    profileType="jobseeker"
                    allowedTypes=".pdf .doc .docx"
                    :profileID="this.$store.state.route.params.jobseekerId"
                    >
                  </file-upload>

                  
                      </v-col>
                      <v-col xs12>
                        <h2 class="grey--text mx-5">Upload Cover Letter</h2>
                        <file-upload
                    upload_header="Update Your Cover Letter"
                    file_type="document"
                    upload_label="Choose File"
                    upload_name="coverletter"
                    profileType="jobseeker"
                    allowedTypes=".pdf .doc .docx"
                    :profileID="this.$store.state.route.params.jobseekerId"
                    >
                  </file-upload>
                      </v-col>
                    </v-row>

                       <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-btn
                          fixed
                          v-on="on"
                          dark
                          x-large
                          fab
                          bottom
                          right
                          @click="updateProfile"
                          ref="updateJobSeeker"
                          color="grey">
                            <v-icon>update</v-icon>
                          </v-btn>
                        </template>
                        <span>Update Profile</span>
                      </v-tooltip>

                <v-flex>
                  <span v-if="alertSubmit"><strong style="color: red;">Please submit your information</strong></span>
                </v-flex>
              </form>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>
        <h3 class="grey--text">View Activity</h3>
      </v-tab>
      <v-tab-item>
        <v-card
          flat>
          <v-card-text>
              <v-flex xs12>
          <v-card>
                <h2 class="grey--text">Jobs You've Applied To</h2>
                  <v-data-table
                    :headers="tableHeaders"
                    :items="jobApplications"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.Job.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                      <td>{{ props.item.Job.location }}</td>
                      <td>{{ props.item.Job.date_posted | formateDate}}</td>
                      <td>{{ props.item.Job.date_applied | formateDate }}</td>
                    </template>
                  </v-data-table>
          </v-card>
        </v-flex>

        <v-flex xs12 class="section-container">
            <v-card>
                <h2 class="grey--text">Favorite Jobs</h2>
                <v-data-table
                    :headers="tableHeaders"
                    :items="favorites"
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.Job.jobTitle }}<br/>&nbsp;&nbsp;&nbsp;{{ props.item.type }}</td>
                         <td>{{ props.item.Job.location }}</td>
                         <td>{{ props.item.Job.date_posted | formateDate}}</td>
                          <td>{{ props.item.Job.date_applied | formateDate }}</td>
                    </template>
                  </v-data-table>
            </v-card>
        </v-flex>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab>
        <h3 class="grey--text">Settings</h3>
      </v-tab>
      <v-tab-item>
        <v-card
          color="basil"
          flat>
          <v-card-text>TODO: Add settings</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>


  </div>
</template>
<script>
import ProfileService from '../../../services/ProfileService.js'
import FileUpload from '../../fileupload/FileUpload'
import EventBus from '../../../main'
import { setTimeout } from 'timers'
import moment from 'moment'

export default {
  components: {
    'file-upload': FileUpload
  },
  created(){
    let $this = this;
    this.getProfileInfo();
    setTimeout(function(){
      $this.checkJobsAppliedTo();
    }, 2500);
      this.getProfileInfo();
    setTimeout(function(){
       $this.getFavoritedJobs();
    }, 2500);
  },
  mounted(){
   let $this = this;
    EventBus.$on('update-jobseeker-progress', function(){
      $this.getProfileInfo();
    })
  },
  data: function(){
    return {
      alertSubmit: false,
      tab: null,
        items: [
          'View Profile', 'Edit Profile', 'View Your Activity', 'Settings',
        ],
      date: null,
      menu: false,
      progressStatus: 1,
      value: '50%',
      stepsToComplete: [],
      joBSeeker: {},
      allStepsComplete: false,
      jobApplications: [],
      favorites: [],
        tableHeaders: [
        {text: 'Position/Type', value:'Position/Type'},
        {text: 'Location', value: 'Location'},
        {text: 'Date Posted', value:'Date Posted'},
         {text: 'Date Applied', value:'Date Applied'},
      ],
       pagination: {
        pages: 1
      },
    }
  },
  filters: {
    capitalize(word){
       return word.charAt(0).toUpperCase() + word.slice(1);
    },
     formateDate(date){
      return moment(date).format('MMMM Do YYYY');
    },
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
    }
  },
  methods: {
    inputChange: function(input){
      if (input && !this.alertSubmit) {
        this.alertSubmit = true;
      }
    },
    async updateProfile(){
        let obj = {};

        if (this.$store.state.jobseeker) obj.id = this.$store.state.route.params.jobseekerId
        if (this.joBSeeker.address)obj.address = this.joBSeeker.address
        if (this.joBSeeker.phone) obj.phone = this.joBSeeker.phone
        if (this.joBSeeker.website) obj.website = this.joBSeeker.website
        if (this.joBSeeker.bio) obj.bio = this.joBSeeker.bio

        if (this.joBSeeker.jobHistCompanyOne) obj.jobHistCompanyOne = this.joBSeeker.jobHistCompanyOne
        if (this.joBSeeker.jobHistRoleOne) obj.jobHistRoleOne = this.joBSeeker.jobHistRoleOne
        if (this.joBSeeker.jobHistDateOne) obj.jobHistDateOne = this.joBSeeker.jobHistDateOne
        if (this.joBSeeker.jobHistDescOne) obj.jobHistDescOne = this.joBSeeker.jobHistDescOne

        if (this.joBSeeker.jobHistCompanyTwo) obj.jobHistCompanyTwo = this.joBSeeker.jobHistCompanyTwo
        if (this.joBSeeker.jobHistRoleTwo) obj.jobHistRoleTwo = this.joBSeeker.jobHistRoleTwo
        if (this.joBSeeker.jobHistDateTwo) obj.jobHistDateTwo = this.joBSeeker.jobHistDateTwo
        if (this.joBSeeker.jobHistDescTwo) obj.jobHistDescTwo = this.joBSeeker.jobHistDescTwo

        if (this.joBSeeker.jobHistCompanyThree) obj.jobHistCompanyThree = this.joBSeeker.jobHistCompanyThree
        if (this.joBSeeker.jobHistRoleThree) obj.jobHistRoleThree = this.joBSeeker.jobHistRoleThree
        if (this.joBSeeker.jobHistDateThree) obj.jobHistDateThree = this.joBSeeker.jobHistDateThree
        if (this.joBSeeker.jobHistDescThree) obj.jobHistDescThree = this.joBSeeker.jobHistDescThree

        if (this.joBSeeker.keySkillOne) obj.keySkillOne = this.joBSeeker.keySkillOne
        if (this.joBSeeker.keySkillTwo) obj.keySkillTwo = this.joBSeeker.keySkillTwo
        if (this.joBSeeker.keySkillThree) obj.keySkillThree = this.joBSeeker.keySkillThree
        if (this.joBSeeker.keySkillFour) obj.keySkillFour = this.joBSeeker.keySkillFour
        if (this.joBSeeker.keySkillFive) obj.keySkillFive = this.joBSeeker.keySkillFive
        if (this.joBSeeker.keySkillSix) obj.keySkillSix = this.joBSeeker.keySkillSix

         if (this.joBSeeker.dob) obj.dob = this.joBSeeker.dob
        if (this.joBSeeker.photo) obj.photo = this.joBSeeker.photo
        if (this.joBSeeker.resume) obj.resume = this.joBSeeker.resume
        if (this.joBSeeker.coverletter) obj.coverletter = this.joBSeeker.coverletter
         const updated = await ProfileService.updateJobSeekerProfile(obj);
         if (updated) {
            this.alertSubmit = false;
            this.getProfileInfo();
         }
    },

    photoUpload: (e) => {
      this.joBSeeker.photo = e.target.files || e.dataTransfer.files;
    },
    resumeUpload: (e) => {
      this.joBSeeker.resume = e.target.files || e.dataTransfer.files;
    },
    coverLetterUpload: (e) => {
      this.joBSeeker.coverletter = e.target.files || e.dataTransfer.files;
    },
    save (date) {
        this.$refs.menu.save(date)
        this.inputChange(this.joBSeeker.dob);
    },
    async getProfileInfo() {
       this.joBSeeker = {};
       const seekerId = this.$store.state.route.params.jobseekerId;
       let seeker = (await ProfileService.getJobseekerProfile(seekerId)).data.jobseeker;
       if (seeker === null) {
         this.joBSeeker = {};
       } else {
        this.joBSeeker = seeker;
       }
       this.$store.dispatch('setCurrentJobseekerAction', this.joBSeeker)
       this.updateProgressStatus(this.joBSeeker);
    },

    async checkJobsAppliedTo(){
       if (this.$store.state.route.params) {
        let jobseekerId = this.$store.state.route.params.jobseekerId;
           const applications = (await ProfileService.checkJobsAppliedTo(jobseekerId)).data;
           if (applications) {
             this.jobApplications = applications;
           }
       }
    },

    async getFavoritedJobs(){
        if (this.$store.state.route.params) {
        let jobseekerId = this.$store.state.route.params.jobseekerId;
        if (jobseekerId) {
           const favorites = (await ProfileService.getFavoritedJobs(jobseekerId)).data.data;
           if (favorites) {
             this.favorites = favorites;
           }
        }
      }
    }
  },
   watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
  },
}
</script>

<style scoped>
h2 {
  padding: 2rem
}
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
  .v-datatable tbody td{
    padding: 0 !important;
   }
}
</style>