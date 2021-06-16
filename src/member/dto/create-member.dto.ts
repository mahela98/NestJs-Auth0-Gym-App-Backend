import { IsEmail, IsNotEmpty, Min, Max,IsInt, Length, min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateMambershipTypeDTO} from '../../membership-type/dto/create-membershipType.dto';
export class CreateMemberDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  @Length(10,10)
  @IsNotEmpty()
  readonly mobile: string;

  @IsNotEmpty()
  readonly address: string;

  readonly date_posted: string;

  @IsNotEmpty()
  readonly membershiptype: string;
}
