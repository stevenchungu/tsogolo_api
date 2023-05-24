import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalityQuestionDto } from './create-personality-question.dto';

export class UpdatePersonalityQuestionDto extends PartialType(CreatePersonalityQuestionDto) {}
