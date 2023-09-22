import {Injectable}  from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IwebsiteModel } from "./websitse.model";

@Injectable()
export class websiteService {
    constructor(
        @InjectModel("websites") private readonly websiteModel:Model<IwebsiteModel>
    ){}

    async getAll(){
        try {
            let res = await this.websiteModel.find();
            return res
        } catch (error) {
            return error
        }
    }

    async addwebsite (data){
        try {

            let url = data.websiteURL;
            const urlObject = new URL(url)
            const hostName = urlObject.hostname;
            let domainName = hostName.replace(/^[^.]+\./g, '');
            
            let res = await this.websiteModel.create({...data,domainName});
            return res
        } catch (error) {
            return error;
        }       
    }
}