import { IsEmail, IsNotEmpty, Min, Max,IsInt, Length, min, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import {CreateMambershipTypeDTO} from '../../membership-type/dto/create-membershipType.dto';
export class CreateMemberDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  
  @IsString()
  @Length(10,10)
  @IsNotEmpty()
  readonly mobile: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  readonly date_posted: string;
  
  @IsString()
  @IsNotEmpty()
  readonly membershiptype: string;
}
