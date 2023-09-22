import { Schema } from "mongoose"


export const websiteSchema = new Schema ({
    websiteURL : {type:String,required:true},
    domainName : {type:String,required:true},
    name : {type:String,required:true},
    profileLink : {type:String,required:true},
    processCount : {type:Number,required:true},
})

export interface IwebsiteModel {
    websiteURL:string,
    name:string,
    profileLink:string,
    processCount:string
}