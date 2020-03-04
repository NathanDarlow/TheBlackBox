<template>
<div>
    <h1 class="subheading grey--text mx-5 pt-12">Employer LogIn</h1>
    <v-form @submit="login">
        <v-container>
            <v-row>
                <v-col cols="12" md="7" sm="6" class="mx-auto">
                    <v-text-field
                        prepend-icon="person"
                        name="email"
                        label="Email"
                        type="text"
                        v-model="email"
                        v-validate="'required|email'"
                        :error-messages="errors.collect('email')"
                        outlined
                        shaped>
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
                        id="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        v-model="password" 
                        v-validate="'required'"
                        :error-messages="errors.collect('password')">
                    </v-text-field>
                </v-col>
                      </v-row>
                    </v-container>
                    <v-col class="d-flex align-center">
                        <v-spacer></v-spacer>
                        <div class="red--text" v-html="error"/>
                        <v-spacer></v-spacer>
                    </v-col> 
                    <v-row>
                        <v-btn class="ma-2 mx-auto mb-5" outlined color="secondary" @click="login">Log In</v-btn>
                    </v-row>
                    <v-col class="d-flex align-center">
                        <v-spacer></v-spacer>
                        <nuxt-link to="/auth/register"><h3 class="grey--text">Dont Have An Account? <a href="javascript:void(0)" @click="navigateTo('employer.registration')">Sign Up</a></h3></nuxt-link>
                        <v-spacer></v-spacer>
                    </v-col> 
                </v-form>
            </div>
</template>

<script>
import AuthenticationSerivce from '../../services/AuthtenicationService'
import { Validator } from 'vee-validate';
const dict = {
        custom: {
            email: {
                required: 'Please enter your email'
            },
            password:{
                required: 'Please enter your password'
            },

   }
};
Validator.localize('en', dict);
export default {
  created () {
   this.resetForm();
  },
  mounted () {

  },
  props: {
    source: String
  },
  data: function () {
    return {
      email:'',
      password:'',
      invalidPassword: false,
      emptyCredentials: false,
      missingCredentials: false,
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
    }
  },
  methods: {
      navigateTo(route, param){
      if (param) {
        this.$router.push({ name: route, params: param });
      } else {
         this.$router.push({name: route});
      }
    },
    async login(){
      this.missingCredentials = false;
      this.$validator.validate().then(valid => {
          if (!valid) {
          // do stuff if not valid.
            this.missingCredentials = true;
          } else {
             this.sendCredentials();
          }
     });
    },
    clearInvalid(){
        this.invalidPassword = false;
    },
    async sendCredentials(){
      try {
        const response = await AuthenticationSerivce.employerLogin({
            email: this.email.trim(),
            password: this.password.trim()
          })
          if (response.status === 200) {
                this.$store.dispatch('setEmployerTokenAction', response.data.token);
                this.$store.dispatch('setEmployerAction', response.data.employer);
                this.$router.push({name: this.$store.state.route.query.redirect || 'view.employer.profile', params: {employerId: this.$store.state.employer.id}})
          }
           if (response.status === 403) {
              this.invalidPassword = true;
              this.email = '';
              this.password = '';
          }
      } catch (error){
          // confirm(`An erorr occurred ${error}`);
          this.invalidPassword = true;
      }
    },
    resetForm(){
      this.email = '';
      this.password = '';
      this.invalidPassword = false;
      this.emptyCredentials = false;
    }
  },

  computed: {

  }
}
</script>
<style>

</style>
