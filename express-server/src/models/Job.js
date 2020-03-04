module.exports = (sequelize, DataTypes) =>{
    const Job = sequelize.define('Job', {
        jobTitle: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        salary: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.TEXT,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
        job_ending: {
            type: DataTypes.DATE,
        },
        tagOne: {
            type: DataTypes.STRING,
        },
        tagTwo: {
            type: DataTypes.STRING,
        },
        tagThree: {
            type: DataTypes.STRING,
        },
        tagFour: {
            type: DataTypes.STRING,
        },
        tagFive: {
            type: DataTypes.STRING,
        },
        tagSix: {
            type: DataTypes.STRING,
        },
    })

    Job.associate = function(models){
        Job.belongsTo(models.Employer)
     }
   
    return Job;
}