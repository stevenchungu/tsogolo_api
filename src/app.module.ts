import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityQuestionModule } from './personality-question/personality-question.module';
import { CrawlingModule } from './crawling/crawling.module';
import { UserModule } from './users/user.module';


@Module({

  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tsogolo',
    autoLoadEntities: false,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    driver: require('mysql2'),
   
  }), 
   PersonalityQuestionModule,
   CrawlingModule,
   UserModule
 
  ],



})
export class AppModule { }
