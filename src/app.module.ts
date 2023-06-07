import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityQuestionModule } from './personality-question/personality-question.module';
import { CrawlingModule } from './crawling/crawling.module';




@Module({

  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: false,
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    driver: require('mysql2'),
  }), PersonalityQuestionModule, CrawlingModule
  ],

})
export class AppModule { }
