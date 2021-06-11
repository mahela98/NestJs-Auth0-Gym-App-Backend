import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  // Submit a member
  @Post('/create')
  async addMember(@Res() res, @Body() createMemberDTO: CreateMemberDTO) {
    const newMember = await this.memberService.addMember(createMemberDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Member has been submitted successfully!',
      member: newMember,
    });
  }

  // Edit a particular member using ID
  @Put('/edit/:memberID')
  async editMember(
    @Res() res,
    @Param('memberID', new ValidateObjectId()) memberID,
    @Body() createMemberDTO: CreateMemberDTO,
  ) {
    const editedMember = await this.memberService.editMember(
      memberID,
      createMemberDTO,
    );
    if (!editedMember) {
      throw new NotFoundException('Member does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Member has been successfully updated',
      member: editedMember,
    });
  }

  // Delete a member using ID
  @Delete('/delete/:memberID')
  async deleteMember(
    @Res() res,
    @Param('memberID', new ValidateObjectId()) memberID,
  ) {
    const deletedMember = await this.memberService.deleteMember(memberID);
    if (!deletedMember) {
      throw new NotFoundException('Member does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Member has been deleted!',
      member: deletedMember,
    });
  }

  // Fetch a particular member using ID
  @Get('/:memberID')
  async getMember(
    @Res() res,
    @Param('memberID', new ValidateObjectId()) memberID,
  ) {
    const member = await this.memberService.getMember(memberID);
    if (!member) {
      throw new NotFoundException('Member does not exist!');
    }
    return res.status(HttpStatus.OK).json(member);
  }

  // Fetch all members
  @Get('/')
  async getMembers(@Res() res) {
    const members = await this.memberService.getMembers();
    return res.status(HttpStatus.OK).json(members);
  }
}
