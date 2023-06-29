import { Injectable } from '@nestjs/common';
import cheerio, { CheerioAPI } from 'cheerio';
import axios from 'axios';
import { JobListing } from './job-listing.entity';
import { Connection } from 'typeorm';
import { resolve } from 'path';

@Injectable()
export class CrawlingService {
  //get reference of the database
  constructor(private connection: Connection) {}

  //crawler method which use axios to send request to the website url and cheerio to palse the data
  async crawlWebsite(personalityType?: string): Promise<JobListing[]> {
    const url = 'https://www.alljobspo.com/malawi-jobs/';
   
    
    const response = await axios.get(url);
    const $: CheerioAPI = cheerio.load(response.data);

    // Get the professional sectors from the website
    const professionalSectors = $('#refineByRole li a').map((i, element) => {
      const sectorUrl = $(element).attr('href');
      const sectorName = $(element).text().trim();
      return { sectorName, sectorUrl };
    }).get();

    // Retrieve the personality-sector mappings from the database
    const mappings = await this.getPersonalitySectorMappings(personalityType);
    console.log('Mappings:', mappings);

  //get sectors from website which match with the ones from database 
  const matchedSectors = professionalSectors
  .filter(sector => mappings.some(mapping => mapping.sector_name === sector.sectorName));
  console.log('Matched Sectors:', matchedSectors);

   // list the jobs of the matched sectors from the website
    // const jobListings: JobListing[] = [];
    // for (const sector of matchedSectors) {
    //   //set time delay for 2 seconds
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
    //   const sectorJobListings = await this.extractJobListings($, sector.sectorUrl);
    //   jobListings.push(...sectorJobListings);
    // }

     // Execute requests for job listings concurrently
  const jobListings: JobListing[] = [];
  await Promise.all(
    matchedSectors.map(async sector => {
      const sectorJobListings = await this.extractJobListings($, sector.sectorUrl);
      jobListings.push(...sectorJobListings);
    })
  );

    return jobListings;
  }
   //method to retrieve the sector with matching personality type passed as end point
  async getPersonalitySectorMappings(personalityType: string) {
    const query = this.connection
      .createQueryBuilder()
      .select('personality_type')
      .addSelect('sector_name')
      .from('personality_sector_mapping', 'psm')
      .where('personality_type = :personalityType', { personalityType })
      .getRawMany();

    return query;
  }

  //extract job listings from the website
  async extractJobListings($: CheerioAPI, url: string): Promise<JobListing[]> {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };  
    const response = await axios.get(url, {headers});
    const cheerioLoad = (html: string) => cheerio.load(html);
    $ = cheerioLoad(response.data);

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
