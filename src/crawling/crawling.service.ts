// crawling.service.ts
//'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListing } from './job-listing.entity';

@Injectable()
export class CrawlingService {
  constructor(
    @InjectRepository(JobListing)
    private readonly jobListingRepository: Repository<JobListing>,
  ) {}

  async crawlWebsite(): Promise<JobListing[]> {
    const url = 'https://www.alljobspo.com/malawi-jobs/';
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'; // Replace with the desired user agent

    try {
      const response = await axios.get(url, { headers: { 'User-Agent': userAgent } });
      const html = response.data;
      const $ = cheerio.load(html);

      // Select the job listings container and iterate over each job listing
      const jobListings = $('article.job').map((i, element) => {
        const title = $(element).find('h2.heading a').text().trim();
        const sector = $(element).find('.attribute.company span.value').text().trim();
        const location = $(element).find('.attribute.location span.value').text().trim();
        const time = $(element).find('.attribute.location:nth-child(3) span.value').text().trim();
        const summary = $(element).find('.summary p').text().trim();
        const id = i;

        return { title, sector, location, time, summary, id };
      }).get();

      // Save the job listings to the database
      // const savedJobListings = await this.jobListingRepository.save(jobListings);

      return jobListings;
    } catch (error) {
      throw new Error(error);
    }
  }
}
