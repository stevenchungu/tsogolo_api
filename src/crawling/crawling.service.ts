// crawling.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobListing } from './job-listing.entity';

@Injectable()
export class CrawlingService {
  async crawlWebsite(): Promise<JobListing[]> {
    const proxyUrl = 'https://tsogoloapi-production.up.railway.app/';
    const targetUrl = 'https://www.alljobspo.com/malawi-jobs/';
  
    try {
      const response = await axios.get(proxyUrl, {
        params: {
          url: targetUrl,
        },
      });

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

      return jobListings;
    } catch (error) {
      throw new Error(error);
    }
  }
}