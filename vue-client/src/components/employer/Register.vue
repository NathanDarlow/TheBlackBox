<template>
<div>
  <h1 class="subheading grey--text mx-5">Jobseeker Register</h1>
    <v-form @submit="submit">
        <v-container>
            <v-row>
                <!-- TODO: Create Admin register feature and have it send to a seperate table in DB -->
                <v-col cols="12" md="7" sm="6" class="mx-auto">
                  <v-text-field
                    outlined
                    shaped
                    v-model="employerRegistration.companyName"
                    name="company"
                    v-validate="'required|max:75'"
                    :counter="35"
                    :error-messages="errors.collect('company')"
                    label="Company Name"
                    data-vv-name="company"
                    required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="7" sm="6" class="mx-auto">
                  <v-text-field
                    v-model="employerRegistration.email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    label="E-mail"
                    data-vv-name="email"
                    name="email"
                    required
                    outlined
                    shaped>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="7" sm="6" class="mx-auto">
                  <v-text-field
                    v-model="employerRegistration.representative"
                    v-validate="'required'"
                    label="Your Name"
                    outlined
                    shaped
                    :error-messages="errors.collect('representative')"
                    data-vv-name="representative"
                    name="representative"
                    required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="7" sm="6" class="mx-auto">
                  <v-text-field
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    outlined
                    shaped
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                    name="password"
                    label="Password"
                    v-model="employerRegistration.password"
                    :error-messages="errors.collect('password')"
                    v-validate="'required'"
                    autocomplete="new-password"
                    ref="password">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="7" sm="6" class="mx-auto">
                  <v-text-field
                    :append-icon="show4 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.emailMatch]"
                    :type="show4 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    value="Pa"
                    outlined
                    shaped
                    error
                    @click:append="show4 = !show4"
                    name="confirm"
                    v-model="employerRegistration.confirmPassword"
                    label="Confirm Password"
                    v-validate="'required|confirmed:password'"
                    :error-messages="errors.collect('confirm')"
                    data-vv-name="password">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-col class="d-flex align-center">
                <v-spacer></v-spacer>
                <div style="padding: 1em;" v-if="missingCredentials"><strong><span class="red--text">Please enter missing information</span></strong></div>
                <div style="padding: 1em;" v-if="passwordMatch"><strong><span class="red--text">Passwords do not match</span></strong></div>
                <v-spacer></v-spacer>
            </v-col> 
            <v-row>
                <v-btn class="ma-2 mx-auto mb-5" outlined color="secondary" @click="submit">Sign Up</v-btn>
            </v-row>
            <v-col class="d-flex align-center">
              <v-spacer></v-spacer>
                <nuxt-link to="/auth/log-in"><div>Already Have an Account? Log In</div></nuxt-link>
              <v-spacer></v-spacer>
            </v-col> 
        </v-form>
    </div>
</template>

<script>
import RegisterService from '../../services/RegistrationService'
import { Validator } from 'vee-validate';
const dict = {
        custom: {
            email: {
                required: 'Please enter your email'
            },
            company: {
              required: 'Please enter your company name'
            },
            representative: {
              required: 'Please enter your name'
            },
            password:{
                required: 'Please enter your password'
            },
            confirm: {
              required: 'Please re-enter your password',
              confirmed: 'Passwords do not match'
            }

        }
};

Validator.localize('en', dict);


export default {
  inject: ['$validator'],
    created(){

    },
    mounted(){

    },
    data: function() {
        return {
          missingCredentials: false,
          passwordMatch: false,
          show1: false,
          show2: true,
          show3: false,
          show4: false,
          password: 'Password',
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match'),
          },
          employerRegistration:{
            companyName: '',
            representative: '',
            email:'',
            password:'',
            confirmPassword:'',

          }

        }
    },
    methods: {
        async submit() {
            this.$validator.validate().then(valid => {
                if (!valid) {
                // do stuff if not valid.
                  this.missingCredentials = true;
                } else {
                  this.submitFormValues();
                }
           });
        },

        clear(){
          this.employerRegistration.companyName = '';
          this.employerRegistration.representative = '';
          this.employerRegistration.email = '';
          this.employerRegistration.password = '';
          this.employerRegistration.confirmPassword = '';
        },

        async submitFormValues(){
              try {
                const res = await RegisterService.employerRegister({
                  company: this.employerRegistration.companyName,
                  email: this.employerRegistration.email,
                  representative: this.employerRegistration.representative,
                  password: this.employerRegistration.password
                })
                if (res.status === 200){
                      this.$router.push({name: 'employer.login', params: {message: res.data.message}});
               }
               if (res.status === 403) {
                   confirm('You are unauthorized to peform this action');
               }
               if (res.status === 500) {
                  confirm('There was an error trying to perform this action');
               }
              } catch (error) {
                  confirm(`There was an error trying to register: ${error}`);
              }
        }

    },
    computed: {

    }
}
</script>
<style>

</style>
