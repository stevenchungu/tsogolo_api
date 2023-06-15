// crawling.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { CrawlingService } from './crawling.service';

@Controller('jobs')
export class CrawlingController {
  constructor(private readonly crawlingService: CrawlingService) { }

  @Get()
  async crawlWebsite(@Query('personalityType') personalityType: string): Promise<any[]> {
    const jobListings = await this.crawlingService.crawlWebsite(personalityType);
    return jobListings;
  }
  
}
