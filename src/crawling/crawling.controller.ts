// crawling.controller.ts
import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { JobListing } from './job-listing.entity';

@Controller('jobs')
export class CrawlingController {
  constructor(private readonly crawlingService: CrawlingService) { }

  @Get()
  async crawlWebsite(@Query('personalityType') personalityType: string): Promise<JobListing[]> {
    const jobListings = await this.crawlingService.crawlWebsite(personalityType);
    return jobListings;
  }

  @Post()
  async saveJobListings(@Body() jobListings: JobListing[]): Promise<JobListing[]> {
    const savedJobListings = await this.crawlingService.saveJobListings(jobListings);
    return savedJobListings;
  }
  
}
