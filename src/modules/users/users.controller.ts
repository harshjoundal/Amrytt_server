import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res,Get,UseGuards } from "@nestjs/common";
import { userService } from "./users.service";
var bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken")
import {config } from '../../config/config'
import { JwtMiddleware } from "../jwt.middleware";

@Controller('/users')
@UseGuards(JwtMiddleware)
export class usersController {
    constructor(
        private readonly userService : userService
    ){}

    @Get('/getAll')
    async getAllusers (@Body() Body, @Res() res){
        let result = await this.userService.getall()
        res.status(HttpStatus.OK).json({success:true,user:result})
    }

    @Post('/deleteUser')
    async deleteuser (@Req() req , @Res() res,@Body() body){
        let result = await this.userService.deleteUser(body)
        res.status(HttpStatus.OK).json(result)
    }


    @Post('/register')
    async userRegister(@Body() body, @Res() res, @Req() req ){

        if(!body?.email || !body?.password){
            res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"All fields are compulsary"})       
        }
        let isExist = await this.userService.findUser({email:body?.email})
        if(isExist){
            res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"User already exist"})   
            return;    
        }

        const hashedPassword = await bcrypt.hash(body?.password,10)

        let result = await this.userService.userRegisterService({
            ...body,
            password : hashedPassword
        })

        let token = jwt.sign({
            userId : result._id,
            email:result.email
        },config.secret_key)

        result.password = undefined
        res.status(HttpStatus.OK).json({success:true,user:result,token})
    }

    @Post('/login')
    async loginUser (@Body() Body,@Req() req, @Res() res){
        let {email ,password} = Body;

        if(!email || !password){
            res.status(HttpStatus.OK).json({success:false,message:"Email or Passeord is missing"})
            return;   
        }
        
        let user = await this.userService.findUser({email})
        if(!user){
            res.status(HttpStatus.OK).json({success:false,message:"User Doesnt Exist!"})
            return;
        }

        let comparePassword = await bcrypt.compare(password , user.password);
        
        user.password = undefined


        if(comparePassword){
         let token = jwt.sign({
            userId : user._id,
            email:user.email
         },config.secret_key)
         res.status(HttpStatus.OK).json({success:true,user,token})
        }
        else{
            res.status(HttpStatus.OK).json({success:false,message:"wrong password"})
        }
    }

    @Post('/userUpdate')
    async updateUser (@Body() Body,@Req() req, @Res() res){
        let result = await this.userService.updateUser(Body)
        res.status(HttpStatus.OK).json({success:true,message:"User Updated Successfully",data : result})
    }
}