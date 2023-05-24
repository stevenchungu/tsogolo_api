import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityQuestionModule } from './personality-question/personality-question.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', 
    password: '', 
    database: 'tsogolo',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), PersonalityQuestionModule,
],
  
})
export class AppModule {}
