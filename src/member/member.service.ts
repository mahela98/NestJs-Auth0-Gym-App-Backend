import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './interfaces/member.inteface';
import { CreateMemberDTO } from './dto/create-member.dto';
import { MembershipTypeService } from '../membership-type/membership-type.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
    private membershipTypeService: MembershipTypeService,
  ) {}

  async addMember(createMemberDTO: CreateMemberDTO): Promise<Member> {
    try {
      const MambershipType = await this.membershipTypeService.getMembershipType(
        createMemberDTO.membershiptype,
      );
    } catch (error) {
      throw new NotFoundException('MambershipType does not exist!');
    }

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

  async getAllMembers(): Promise<Member[]> {
    const members = await this.memberModel
      .find()
      .populate('membershiptype')
      .exec();
    return members;
  }
  // gh
  async getMembersPagination(
    options,
    pageNumber,
    dataLimit,
  ): Promise<Member[]> {
    console.log(options);
    const members = await this.memberModel
      .find(options)
      .populate('membershiptype')
      .skip((pageNumber - 1) * dataLimit)
      .limit(dataLimit)
      .exec();

    return members;
  }

  async editMember(
    memberID,
    createMemberDTO: CreateMemberDTO,
  ): Promise<Member> {
    // console.log(await this.memberModel.findOne({'nationality.nic_number':createMemberDTO.nationality.nic_number}))
    var user = await this.memberModel.findOne({ email: createMemberDTO.email });
    if (user && user._id != memberID) {
      throw new NotAcceptableException('email must be unique!');
    }
    user = await this.memberModel.findOne({
      'nationality.nic_number': createMemberDTO.nationality.nic_number,
    });
    if (user && user._id != memberID) {
      throw new NotAcceptableException('NIC number must be unique!');
    }
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

  async countAll(options) {
    return this.memberModel.countDocuments(options).exec();
  }
}
