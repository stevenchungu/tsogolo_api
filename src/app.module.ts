import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityQuestionModule } from './personality-question/personality-question.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }),PersonalityQuestionModule,
],
  
})
export class AppModule {}
