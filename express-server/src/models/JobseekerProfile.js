module.exports = (sequelize, DataTypes) =>{
    const JobseekerProfile = sequelize.define('JobseekerProfile', {
         photo: {
             type: DataTypes.STRING,
         },
          address:{
            type: DataTypes.STRING,
          },
          phone: {
            type: DataTypes.STRING,
          },
          website: {
            type: DataTypes.STRING,
          },
          dob: {
            type: DataTypes.STRING,
          },
          bio: {
            type: DataTypes.STRING,
          },
          resume: {
            type: DataTypes.STRING,
          },
          coverletter: {
            type: DataTypes.TEXT,
          },
          jobHistCompanyOne: {
            type: DataTypes.STRING
          },
          jobHistRoleOne: {
            type: DataTypes.STRING
          },
          jobHistDateOne: {
            type: DataTypes.STRING
          },
          jobHistDescOne: {
            type: DataTypes.STRING
          },
          jobHistCompanyTwo: {
            type: DataTypes.STRING
          },
          jobHistRoleTwo: {
            type: DataTypes.STRING
          },
          jobHistDateTwo: {
            type: DataTypes.STRING
          },
          jobHistDescTwo: {
            type: DataTypes.STRING
          },
          jobHistCompanyThree: {
            type: DataTypes.STRING
          },
          jobHistRoleThree: {
            type: DataTypes.STRING
          },
          jobHistDateThree: {
            type: DataTypes.STRING
          },
          jobHistDescThree: {
            type: DataTypes.STRING
          },
          keySkillOne: {
            type: DataTypes.STRING
          },
          keySkillTwo: {
            type: DataTypes.STRING
          },
          keySkillThree: {
            type: DataTypes.STRING
          },
          keySkillFour: {
            type: DataTypes.STRING
          },
          keySkillFive: {
            type: DataTypes.STRING
          },
          keySkillSix: {
            type: DataTypes.STRING
          },
    })

    JobseekerProfile.associate = function(models){
        JobseekerProfile.belongsTo(models.Jobseeker)
    }

    return JobseekerProfile;
}