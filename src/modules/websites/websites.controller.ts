import {Controller,Get,Req,Res,HttpStatus,Body,Post,UseGuards} from '@nestjs/common'
import { websiteService } from './websites.service';
import { JwtMiddleware } from '../jwt.middleware';

@Controller('/websites')
@UseGuards(JwtMiddleware)
export class websiteController {
    constructor(
        private readonly websiteService : websiteService
    ){}

    @Get('/getAll')
    async getwebsites (@Req() req, @Res() res){
        let result = await this.websiteService.getAll()
        res.status(HttpStatus.OK).json({success:true,data : result})
    }


    @Post('/addWebsite')
    async addWebsite (@Body() Body, @Req() req, @Res() res){
        let result = await this.websiteService.addwebsite(Body)
        res.status(HttpStatus.OK).json({success:true,data : result})
    }
}