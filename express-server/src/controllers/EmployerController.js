 const {JobCategory}  = require('../models/')
 const {Job}  = require('../models/')
 const {JobApplicant}  = require('../models/')
 const {Jobseeker}  = require('../models/')
 const {JobseekerProfile}  = require('../models/')
 module.exports  = {
     async getCategories(req, res){
            const categories  = await JobCategory.findAll();
            res.send({
                data: categories
            }) 
     },
     async getJobTypes(req, res){
         try {
            // const types = await db.sequelize.query("SELECT distinct type from jobs");
             const types = await Job.aggregate('type', 'DISTINCT', { plain: false })
             res.send({
              data: types
            })    
         }catch(err){
          res.status(500).send({
            error: err
           })
         }

          
     },

     async createJob(req, res){
        try {
            const createdJob = await Job.create(req.body);
            let createdJobJSON = createdJob.toJSON()
            res.send({
                data: createdJobJSON
            })
        }catch(err){
          res.status(500).send({
            error: err
          })
        }
     },

     async deleteJob(req, res){
      try{
          const job = await Job.update({active: false}, {where:{id: req.params.jobId}})
          if(job){
            res.send({
                success: 'The job was removed.',
            })
          }
      } catch(err){
          res.send({
              error:  `There was an error: ${err}`
          })
      }
  },

     async updateJob(req, res){
        try {
            let updateObj = {};
             if(req.body.jobTitle)updateObj.jobTitle = req.body.jobTitle;
             if(req.body.location)updateObj.location = req.body.location;
             if(req.body.type)updateObj.type = req.body.type;
             if(req.body.description)updateObj.description = req.body.description;
             if(req.body.active)updateObj.active = req.body.active;
             if(req.body.job_ending)updateObj.job_ending = req.body.job_ending;
             if(req.body.JobCategoryId)updateObj.JobCategoryId = req.body.JobCategoryId;
             const whereObj = {where:{EmployerId: req.body.EmployerId}}    
             const job = Job.update(updateObj, whereObj)
                res.send({
                    data: job
                })
        }catch(err){
          res.status(500).send({
            error: err
         })
        }
     },

     async getEmployerJobs(req, res){
         try{
            const jobs = await Job.findAll(
                {where: {EmployerId: req.params.employerId, active: true}},
            )
            res.send({
                data: jobs
            })
         }catch(err){
          res.status(500).send({
            error: err
          })
         }
       
     },
     async getEmployerInactiveJobs(req, res){
      try{
         const jobs = await Job.findAll(
             {where: {EmployerId: req.params.employerId, active: false}},
         )
         res.send({
             data: jobs
         })
      }catch(err){
       res.status(500).send({
         error: err
       })
      }
    
  },
     async getJobApplicants(req, res){
        try{
          const jobApplicants = await JobApplicant.findAll({
            include:[
              { model: Job, where: { EmployerId: req.params.employerId},}, 
              { model: Jobseeker, include: [{model: JobseekerProfile}]} 
            ],
          })  
         res.send({
            data: jobApplicants
          })
         } catch(err) {
           res.status(500).send({
            error: err
           })
         } 
     }
 }
