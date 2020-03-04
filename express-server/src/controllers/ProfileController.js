const {EmployerProfile} = require('../models')
const {JobseekerProfile} = require('../models')
const {Favorite} = require('../models')
const {JobApplicant} = require('../models')
const {Job} = require('../models')
module.exports = {

    async getFavoritedJobsForJobseekerProfile(req, res){
        try {
            const favorites = await Favorite.findAll({
                where: {
                    JobseekerId: req.params.jobseekerId
                },
                include: [{
                    all: true
                }]
            })
            res.send({
                data: favorites
            })
        } catch (error){
            res.send({
               error: error
            })
        }
        
    },
    async updateEmployerProfile(req, res){
        try{
            const profile = await EmployerProfile.findOne({where:{id: req.body.id}})
            const update = await EmployerProfile.update(req.body)
            let profileJON = profile.toJSON();
            res.send({
                profile: profileJON,
                update: update
            })
        }catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
            
        }
    },

    async updateJobseekerProfile(req, res){
        try{
            let updateObj = {};
            
            if (req.body.photo) {
                updateObj.photo = req.body.photo;
            }
            if (req.body.address) {
                updateObj.address = req.body.address;
            } 
            if (req.body.phone) {
              updateObj.phone = req.body.phone;      
            }
            if (req.body.website) {
              updateObj.website = req.body.website 
            }
            if (req.body.bio) {
              updateObj.bio = req.body.bio;      
            }
            if (req.body.dob) {
                updateObj.dob = req.body.dob
            }
            if (req.body.resume) {
                updateObj.resume = req.body.resume;
            }
            if (req.body.coverletter) {
                updateObj.coverletter = req.body.coverletter;
            }
            if (req.body.jobHistCompanyOne) {
                updateObj.jobHistCompanyOne = req.body.jobHistCompanyOne;
            }
            if (req.body.jobHistRoleOne) {
                updateObj.jobHistRoleOne = req.body.jobHistRoleOne;
            }
            if (req.body.jobHistDateOne) {
                updateObj.jobHistDateOne = req.body.jobHistDateOne;
            }
            if (req.body.jobHistDescOne) {
                updateObj.jobHistDescOne = req.body.jobHistDescOne;
            }
            if (req.body.jobHistCompanyTwo) {
                updateObj.jobHistCompanyTwo = req.body.jobHistCompanyTwo;
            }
            if (req.body.jobHistRoleTwo) {
                updateObj.jobHistRoleTwo = req.body.jobHistRoleTwo;
            }
            if (req.body.jobHistDateTwo) {
                updateObj.jobHistDateTwo = req.body.jobHistDateTwo;
            }
            if (req.body.jobHistDescTwo) {
                updateObj.jobHistDescTwo = req.body.jobHistDescTwo;
            }
            if (req.body.jobHistCompanyThree) {
                updateObj.jobHistCompanyThree = req.body.jobHistCompanyThree;
            }
            if (req.body.jobHistRoleThree) {
                updateObj.jobHistRoleThree = req.body.jobHistRoleThree;
            }
            if (req.body.jobHistDateThree) {
                updateObj.jobHistDateThree = req.body.jobHistDateThree;
            }
            if (req.body.jobHistDescThree) {
                updateObj.jobHistDescThree = req.body.jobHistDescThree;
            }
            if (req.body.keySkillOne) {
                updateObj.keySkillOne = req.body.keySkillOne;
            }
            if (req.body.keySkillTwo) {
                updateObj.keySkillTwo = req.body.keySkillTwo;
            }
            if (req.body.keySkillThree) {
                updateObj.keySkillThree = req.body.keySkillThree;
            }
            if (req.body.keySkillFour) {
                updateObj.keySkillFour = req.body.keySkillFour;
            }
            if (req.body.keySkillFive) {
                updateObj.keySkillFive = req.body.keySkillFive;
            }
            if (req.body.keySkillSix) {
                updateObj.keySkillSix = req.body.keySkillSix;
            }
            let whereObj = {where:{ JobseekerId: req.body.id}}
            const profile = await JobseekerProfile.update(updateObj, whereObj)
            res.send({
                profile: profile
            })
        }catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
            
        }
    },


    async getJobSeekerProfileInfo (req, res){
        try{
            const jobSeeker = await JobseekerProfile.findOne({
                where: {JobseekerId: req.params.jobseekerId}
            })
            res.send({
                jobseeker: jobSeeker
            })
        } catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
        }
    },

    async getEmployerProfileInfo(req, res){
    try{
        const employer = await EmployerProfile.findOne({
            where: {EmployerId: req.params.employerId}
        })
        res.send({
            data: employer
        })
    } catch(err){
            res.send({
                error:  `There was an error: ${err}`
            })
        }
    },

    async getJobAppliedFor(req, res){
      try {
          const { jobseekerId } = req.params;
        const applications = await JobApplicant.findAll({
            where: {JobseekerId: jobseekerId},
            include: [{ model: Job }]
          });
          res.json(applications);
      } catch(err){
        res.status(500).json({
          message:  `There was an error: ${err}`
        })
      }
     
    },

}