import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityQuestionModule } from './personality-question/personality-question.module';
import { CrawlingModule } from './crawling/crawling.module';


@Module({

  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tsogolo',
    autoLoadEntities: false,
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    driver: require('mysql2'),
   
  }), 
   PersonalityQuestionModule,
   CrawlingModule,
 
  ],



})
export class AppModule { }
