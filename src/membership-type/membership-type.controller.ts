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
  UseGuards,
} from '@nestjs/common';
import { MembershipTypeService } from './membership-type.service';
import { CreateMambershipTypeDTO } from './dto/create-membershipType.dto';
import { ValidateObjectId } from '../member/shared/pipes/validate-object-id.pipes';

import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';
import { PermissionsGuard } from '../permissions.guard';

@Controller('')
export class MembershipTypeController {
  constructor(private membershipTypeService: MembershipTypeService) {}

  // Submit a MambershipType
  // @UseGuards(AuthGuard('jwt'))
  @Post('/membershiptype/create')
  async addMambershipType(
    @Res() res,
    @Body() createMambershipTypeDTO: CreateMambershipTypeDTO,
  ) {
    const newMambershipType =
      await this.membershipTypeService.addMembershipType(
        createMambershipTypeDTO,
      );
    return res.status(HttpStatus.OK).json({
      message: 'MambershipType has been submitted successfully!',
      MambershipType: newMambershipType,
    });
  }

  // Edit a particular MambershipType using ID
  // @UseGuards(AuthGuard('jwt'))
  @Put('/membershiptype/edit/:MambershipTypeID')
  async editMambershipType(
    @Res() res,
    @Param('MambershipTypeID', new ValidateObjectId()) MambershipTypeID,
    @Body() createMambershipTypeDTO: CreateMambershipTypeDTO,
  ) {
    const editedMambershipType =
      await this.membershipTypeService.editMembershipType(
        MambershipTypeID,
        createMambershipTypeDTO,
      );
    if (!editedMambershipType) {
      throw new NotFoundException('MambershipType does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'MambershipType has been successfully updated',
      MambershipType: editedMambershipType,
    });
  }

  // Delete a MambershipType using ID
  // @UseGuards(AuthGuard('jwt'))
  @Delete('/membershiptype/delete/:MambershipTypeID')
  async deleteMambershipType(
    @Res() res,
    @Param('MambershipTypeID', new ValidateObjectId()) MambershipTypeID,
  ) {
    const deletedMambershipType =
      await this.membershipTypeService.deleteMembershipType(MambershipTypeID);
    if (!deletedMambershipType) {
      throw new NotFoundException('MambershipType does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'MambershipType has been deleted!',
      MambershipType: deletedMambershipType,
    });
  }

  // Fetch a particular MambershipType using ID
  // @UseGuards(AuthGuard('jwt'))
  @Get('/membershiptype/:MambershipTypeID')
  async getMambershipType(
    @Res() res,
    @Param('MambershipTypeID', new ValidateObjectId()) MambershipTypeID,
  ) {
    const MambershipType = await this.membershipTypeService.getMembershipType(
      MambershipTypeID,
    );
    if (!MambershipType) {
      throw new NotFoundException('MambershipType does not exist!');
    }
    return res.status(HttpStatus.OK).json(MambershipType);
  }
  // Fetch all MambershipTypes
  // @UseGuards(AuthGuard('jwt'),PermissionsGuard)
  @Get('/membershiptypes')
  // @Permissions('read:membershiptypes')
  async getMambershipTypes(@Res() res) {
    const MambershipTypes =
      await this.membershipTypeService.getMembershipTypes();
    return res.status(HttpStatus.OK).json(MambershipTypes);
  }
}
