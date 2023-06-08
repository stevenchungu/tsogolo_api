import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import * as request from 'request';
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

    const options = {
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
      },
    };

    return new Promise((resolve, reject) => {
      request(options, (err, resp, html) => {
        if (!err) {
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

          resolve(jobListings);
        } else {
          reject(err);
        }
      });
    });
  }
}
