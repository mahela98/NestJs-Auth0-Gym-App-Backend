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
  Req,
  UseInterceptors,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { MemberService } from './member.service';
import { MembershipTypeService } from '../membership-type/membership-type.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('member')
export class MemberController {
  constructor(
    private membershipTypeService: MembershipTypeService,
    private memberService: MemberService,
  ) {}

  // Submit a member
  @Post('/create')
  async addMember(@Res() res, @Body() createMemberDTO: CreateMemberDTO) {
    //
    try {
      const MambershipType = await this.membershipTypeService.getMembershipType(
        createMemberDTO.membershiptype,
      );

      const newMember = await this.memberService.addMember(createMemberDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Member has been submitted successfully!',
        member: newMember,
      });
    } catch (error) {
      throw new NotFoundException('MambershipType does not exist!');
    }
  }

  // Edit a particular member using ID
  @Put('/edit/:memberID')
  async editMember(
    @Res() res,
    @Param('memberID', new ValidateObjectId()) memberID,
    @Body() createMemberDTO: CreateMemberDTO,
  ) {
    //checking the membership Id
    try {
      const MambershipType = await this.membershipTypeService.getMembershipType(
        createMemberDTO.membershiptype,
      );
    } catch (error) {
      throw new NotFoundException('MambershipType does not exist!');
    }

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

  @Get('/')
  async getMembers(
    @Res() res,
    @Query('page') page,
    @Query('limit') limit,
    @Query('namesearch') namesearch,
    @Query('nationalitySearch') nationalitySearch,
  ) {
    var options = {};
    const pageNumber: number = parseInt(page as any) || 1;
    const dataLimit: number = parseInt(limit as any) || 10;

    if (nationalitySearch && namesearch) {
      options = {
        $and: [
          {
            $or: [
              {
                'nationality.passport_number': new RegExp(
                  nationalitySearch.toString(),
                  'i',
                ),
              },
              {
                'nationality.nic_number': new RegExp(
                  nationalitySearch.toString(),
                  'i',
                ),
              },
            ],
          },
          {
            $or: [
              { first_name: new RegExp(namesearch.toString(), 'i') },
              { last_name: new RegExp(namesearch.toString(), 'i') },
              { middle_name: new RegExp(namesearch.toString(), 'i') },
            ],
          },
        ],
      };
    } else if (namesearch) {
      options = {
        $or: [
          { first_name: new RegExp(namesearch.toString(), 'i') },
          { last_name: new RegExp(namesearch.toString(), 'i') },
          { middle_name: new RegExp(namesearch.toString(), 'i') },
        ],
      };
    } else if (nationalitySearch) {
      options = {
        $or: [
          {
            'nationality.passport_number': new RegExp(
              nationalitySearch.toString(),
              'i',
            ),
          },
          {
            'nationality.nic_number': new RegExp(
              nationalitySearch.toString(),
              'i',
            ),
          },
        ],
      };
    }
    const members = await this.memberService.getMembersPagination(
      options,
      pageNumber,
      dataLimit,
    );
    const total = await this.memberService.countAll(options);
    return res.status(HttpStatus.OK).json({
      members,
      total,
      pageNumber,
      last_page: Math.ceil(total / dataLimit),
    });
  }

  // Fetch all members
  // @Get('/all/')
  // async getAllMembers(@Res() res) {
  //   const members = await this.memberService.getAllMembers();
  //   return res.status(HttpStatus.OK).json(members);
  // }
}
