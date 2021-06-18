import {
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsInt,
  Length,
  min,
  ValidateNested,
  IsString,
  IsDate,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsISO8601,
  Matches,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMambershipTypeDTO } from '../../membership-type/dto/create-membershipType.dto';
import { strict } from 'assert';

class AddressDTO{
  @IsNotEmpty()
  @IsString()
  line1:string;

  @IsNotEmpty()
  @IsString()
  line2:string;

  @IsNotEmpty()
  @IsString()
  city:string;
}

export class CreateMemberDTO {
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @IsOptional()
  @IsString()
  readonly middle_name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumberString()
  @Length(10, 10)
  @IsNotEmpty()
  readonly mobile: string;

  
  @IsNotEmpty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  readonly address : AddressDTO;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: 'date must be formatted as yyyy-mm-dd',
  })
  readonly birthday: Date;

  @IsString()
  @IsNotEmpty()
  readonly membershiptype: string;
}
