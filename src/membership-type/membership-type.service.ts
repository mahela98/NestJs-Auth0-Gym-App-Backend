import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MembershipType } from './interfaces/mambershipType.interface';
import { CreateMambershipTypeDTO } from './dto/create-membershipType.dto';

@Injectable()
export class MembershipTypeService {
  constructor(
    @InjectModel('MembershipType')
    private readonly membershipTypeModel: Model<MembershipType>,
  ) {}

  async addMembershipType(
    createMembershipTypeDTO: CreateMambershipTypeDTO,
  ): Promise<MembershipType> {
    const newMembershipType = await new this.membershipTypeModel(
      createMembershipTypeDTO,
    );
    return newMembershipType.save();
  }

  async getMembershipType(membershipTypeID): Promise<MembershipType> {
    const membershipType = await this.membershipTypeModel
      .findById(membershipTypeID)
      .exec();
    if (!membershipType) {
      console.log('my error');
    }else{
      console.log('no error');

    }
    return membershipType;
  }

  // async countMembershipType(membershipTypeID): Promise<MembershipType> {
  //   const membershipType = await this.membershipTypeModel.count(membershipTypeID).exec();
  //   return membershipType;
  // }

  async editMembershipType(
    membershipTypeID,
    createMambershipTypeDTO: CreateMambershipTypeDTO,
  ): Promise<MembershipType> {
    const editedMembershipType =
      await this.membershipTypeModel.findByIdAndUpdate(
        membershipTypeID,
        createMambershipTypeDTO,
        { new: true },
      );
    return editedMembershipType;
  }
  async deleteMembershipType(membershipTypeID): Promise<any> {
    const deletedMembershipType =
      await this.membershipTypeModel.findByIdAndRemove(membershipTypeID);
    return deletedMembershipType;
  }

  async getMembershipTypes(): Promise<MembershipType[]> {
    const membershipTypes = await this.membershipTypeModel.find().exec();
    return membershipTypes;
  }
}
