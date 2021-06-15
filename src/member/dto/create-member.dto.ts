import { IsEmail, IsNotEmpty, Min, Max,IsInt, Length, min, maxLength } from 'class-validator';

export class CreateMemberDTO {
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  
  
  @Length(10,10)
  readonly mobile: string;

  readonly address: string;
  readonly date_posted: string;
  readonly membershiptype: string;
}
