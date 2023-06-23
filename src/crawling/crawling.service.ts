import { Injectable } from '@nestjs/common';
import cheerio, { CheerioAPI } from 'cheerio';
import * as request from 'request';
import { JobListing } from './job-listing.entity';

@Injectable()
export class CrawlingService {
 
  async crawlWebsite(personalityType?: string): Promise<JobListing[]> {
    const url = 'https://www.alljobspo.com/malawi-jobs/';

    const options = {
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
      },
    };

    const $: CheerioAPI = await new Promise((resolve, reject) => {
      request(options, (err, resp, html) => {
        if (!err) {
          resolve(cheerio.load(html));
        } else {
          reject(err);
        }
      });
    });

    // Extract the professional sectors from the HTML
    const professionalSectors = $('#refineByRole li a').map((i, element) => {
      const sectorUrl = $(element).attr('href');
      const sectorName = $(element).text().trim();
      return { sectorName, sectorUrl };
    }).get();

    // Filter the job listings based on the selected personality type
    const filteredSectors = professionalSectors.filter(sector => {
      // Add the appropriate logic to map personality types to sectors
      if (personalityType === 'INTJ') {
        return sector.sectorName === 'Accounting / Finance Jobs' || sector.sectorName === 'Computers / Telecommunication Jobs' || sector.sectorName === 'Design Jobs';
      } else if (personalityType === 'INTP') {
        return sector.sectorName === 'Computers / Telecommunication Jobs' || sector.sectorName === '';
      }
      else if (personalityType === 'INFJ') {
        return sector.sectorName === 'Design Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      else if (personalityType === 'INFP') {
        return sector.sectorName === 'Design Jobs' || sector.sectorName === 'QA / Research Jobs';
      }

      else if (personalityType === 'ISTJ') {
        return sector.sectorName === 'Accounting / Finance Jobs' || sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'Computers / Telecommunication Jobs' || sector.sectorName == 'Design Jobs';
      }
      else if (personalityType === 'ISTP') {
        return sector.sectorName === 'Accounting / Finance Jobs' || sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'Computers / Telecommunication Jobs' || sector.sectorName == 'Design Jobs';
      }
      else if (personalityType === 'ISFJ') {
        return sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      else if (personalityType === 'ISFP') {
        return sector.sectorName === 'Teaching Jobs' || sector.sectorName === 'Administrative / Clerical Jobs';
      }
      else if (personalityType === 'ENTJ') {
        return sector.sectorName === 'Accounting / Finance Jobs' || sector.sectorName === 'Computers / Telecommunication Jobs';
      }
      else if (personalityType === 'ENTP') {
        return sector.sectorName === 'Computers / Telecommunication Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      else if (personalityType === 'ENFJ') {
        return sector.sectorName === 'Teaching Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      else if (personalityType === 'ENFP') {
        return sector.sectorName === 'Design Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      else if (personalityType === 'ESTJ') {
        return sector.sectorName === 'Accounting / Finance Jobs' || sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'Computers / Telecommunication Jobs';
      }
      else if (personalityType === 'ESTP') {
        return sector.sectorName === 'Accounting / Finance Jobs' || sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'Computers / Telecommunication Jobs' || sector.sectorName == 'Design Jobs';
      }
      else if (personalityType === 'ESFJ') {
        return sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      else if (personalityType === 'ESFP') {
        return sector.sectorName === 'Administrative / Clerical Jobs' || sector.sectorName === 'QA / Research Jobs';
      }
      // ...
      return false; // Default case if personalityType doesn't match any mappings
    });

    // Iterate over each filtered sector and extract job listings
    const jobListings: JobListing[] = [];
    for (const sector of filteredSectors) {
      const sectorJobListings = await this.extractJobListings($, sector.sectorUrl);
      jobListings.push(...sectorJobListings);
    }

    // Save the job listings to the database
    // const savedJobListings = await this.jobListingRepository.save(jobListings);

    return jobListings;
  }

  async extractJobListings($: CheerioAPI, url: string): Promise<JobListing[]> {
    const options = {
      url,
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
      },
    };

    const cheerioLoad = (html: string) => cheerio.load(html);

    $ = await new Promise((resolve, reject) => {
      request(options, (err, resp, html) => {
        if (!err) {
          resolve(cheerioLoad(html));
        } else {
          reject(err);
        }
      });
    });

    // Select the job listings container and iterate over each job listing
    const jobListings = $('article.job').map((i, element) => {
      const title = $(element).find('h2.heading a').text().trim();
      const sector = $(element).find('.attribute.company span.value').text().trim();
      const location = $(element).find('.attribute.location:nth-child(3) span.value').text().trim();
      const time = $(element).find('.attribute.location span.value:nth-child(3)').text().trim();
      const summary = $(element).find('.summary p').text().trim();
      const id = i;
      
      return { title, sector, location, time, summary, id };
    }).get();

    return jobListings;
  }
}
