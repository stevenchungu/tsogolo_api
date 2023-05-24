import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalityQuestionService } from './personality-question.service';
import { CreatePersonalityQuestionDto } from './dto/create-personality-question.dto';
import { UpdatePersonalityQuestionDto } from './dto/update-personality-question.dto';

@Controller('personality-question')
export class PersonalityQuestionController {
  
  constructor(private readonly personalityQuestionService: PersonalityQuestionService) {}

  @Post()
  create(@Body() createPersonalityQuestionDto: CreatePersonalityQuestionDto) {
    return this.personalityQuestionService.create(createPersonalityQuestionDto);
  }

  @Get()
  findAll() {
    return this.personalityQuestionService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalityQuestionDto: UpdatePersonalityQuestionDto) {
    return this.personalityQuestionService.update(+id, updatePersonalityQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalityQuestionService.remove(+id);
  }
}
