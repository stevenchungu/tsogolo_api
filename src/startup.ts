

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as bunyan from 'bunyan';
// import { JobService } from './job/job.service';

// // Create a new logger instance
// const logger = bunyan.createLogger({
//     name: 'myapp'
// });

// async function bootstrap() {
//     try {
//         const app = await NestFactory.create(AppModule);
//         const jobService = app.get(JobService);
//         await jobService.crawlJobs();
//         await app.close();
//     } catch (error) {
//         console.error('Error occurred during startup:', error);
//         process.exit(1); // Terminate the application with a non-zero exit code
//     }
// }

// bootstrap()
