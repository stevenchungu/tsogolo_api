import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityQuestionModule } from './personality-question/personality-question.module';
import config from 'typeorm.config';
import { JobListing } from './crawling/job-listing.entity';
import { CrawlingModule } from './crawling/crawling.module';


@Module({
  imports: [TypeOrmModule.forRoot(config),
    PersonalityQuestionModule,
    CrawlingModule

  ],

})
export class AppModule { }
