import { Injectable } from '@nestjs/common';
import { CreatePersonalityQuestionDto } from './dto/create-personality-question.dto';
import { UpdatePersonalityQuestionDto } from './dto/update-personality-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalityQuestion } from './entities/personality-question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalityQuestionService {
  constructor(
    @InjectRepository(PersonalityQuestion)
    private readonly personalityQuestionRepository: Repository<PersonalityQuestion>,
  ) {}

  async create(createPersonalityQuestionDto: CreatePersonalityQuestionDto) {
    const { question, agreeType, denialType } = createPersonalityQuestionDto;
    const personalityQuestion = new PersonalityQuestion();
    personalityQuestion.question = question;
    personalityQuestion.agreeType = agreeType;
    personalityQuestion.denialType = denialType;
  
    return await this.personalityQuestionRepository.save(personalityQuestion);
  }
  
  

  findAll() {
    return `This action returns all personalityQuestion`;
  }

  update(id: number, updatePersonalityQuestionDto: UpdatePersonalityQuestionDto) {
    return `This action updates a #${id} personalityQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalityQuestion`;
  }
}
