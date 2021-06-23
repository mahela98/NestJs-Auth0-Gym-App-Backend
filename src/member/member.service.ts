import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './interfaces/member.inteface';
import { CreateMemberDTO } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
  ) {}

  async addMember(createMemberDTO: CreateMemberDTO): Promise<Member> {
    const newMember = await new this.memberModel(createMemberDTO);
    return newMember.save();
  }

  async getMember(memberID): Promise<Member> {
    const member = await this.memberModel
      .findById(memberID)
      .populate('membershiptype')
      .exec();
    return member;
  }

  async getMembers(): Promise<Member[]> {
    const members = await this.memberModel
      .find()
      .populate('membershiptype')
      .exec();
    return members;
  }
  // gh
  async getMembersPagination(options): Promise<Member[]> {
    
    const members = await this.memberModel
      .find(options)
      .populate('membershiptype')
      .exec();
    return members;
  }

  async editMember(
    memberID,
    createMemberDTO: CreateMemberDTO,
  ): Promise<Member> {
    const editedMember = await this.memberModel.findByIdAndUpdate(
      memberID,
      createMemberDTO,
      { new: true },
    );
    return editedMember;
  }

  async deleteMember(memberID): Promise<any> {
    const deletedMember = await this.memberModel.findByIdAndRemove(memberID);
    return deletedMember;
  }
}
