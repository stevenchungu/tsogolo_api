import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalityQuestion } from './entities/personality-question.entity';
import { CreatePersonalityQuestionDto } from './dto/create-personality-question.dto';



@Injectable()
export class PersonalityQuestionService {
  constructor(
    @InjectRepository(PersonalityQuestion)
    private readonly personalityQuestionRepository: Repository<PersonalityQuestion>,
  ) { }

  async getAll(): Promise<PersonalityQuestion[]> {
    return this.personalityQuestionRepository.find();
  }

  async create(questions: CreatePersonalityQuestionDto): Promise<PersonalityQuestion> {
    const { question, agreeType, denialType } = questions;
    const personalityQuestion = new PersonalityQuestion();
    personalityQuestion.question = question;
    personalityQuestion.agreeType = agreeType;
    personalityQuestion.denialType = denialType;


    return await this.personalityQuestionRepository.save(personalityQuestion);
  }


  async update(id: number, questions: PersonalityQuestion): Promise<PersonalityQuestion> {
    await this.personalityQuestionRepository.update(id, questions);
    return this.personalityQuestionRepository.findOne({ where: { id } });

  }

  async delete(id: number): Promise<void> {
    await this.personalityQuestionRepository.delete(id);
  }
}
