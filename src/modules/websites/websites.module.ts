import {Module} from '@nestjs/common'
import { websiteService } from './websites.service';
import { websiteController } from './websites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { websiteSchema } from './websitse.model';

@Module({
    imports:[MongooseModule.forFeature([{name:"websites",schema:websiteSchema}])],
    controllers:[websiteController],
    providers:[websiteService]
})
export class websiteModule{}