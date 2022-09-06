const mongoose = require('mongoose');


var ProjectModel =  mongoose.Schema({
    p_title : String,
    p_description: String,
    p_images:[{
        type: String
    }] ,
    P_icones: String,
    p_trailer:String ,
    p_walkthrough:String,
    p_ripo_project:String ,
    p_membres:[{type:String}],
    p_repo_demo:String,
    p_version : String,
    p_owner:String ,
    p_category:String,
    p_type:String ,
    p_genre:String 

}, {timestamps: true});

const Project =mongoose.model('project', ProjectModel);
module.exports = { Project };