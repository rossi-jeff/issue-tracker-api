import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../global/dto';
import { PhoneService } from '../phone/phone.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RegisterService {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private phoneService: PhoneService,
    private roleService: RoleService,
  ) {}

  async registerUser(registerDto: CreateUserDto) {
    const emails = registerDto.Emails;
    const phones = registerDto.Phones;
    const roles = registerDto.Roles;
    delete registerDto.Emails;
    delete registerDto.Phones;
    delete registerDto.Roles;
    try {
      const user = await this.userService.createUser(registerDto);
      for (let data of emails) {
        data.UserId = user.Id;
        await this.emailService.createEmail(data);
      }
      for (let data of phones) {
        data.UserId = user.Id;
        await this.phoneService.createPhone(data);
      }
      for (let data of roles) {
        data.UserId = user.Id;
        await this.roleService.createRole(data);
      }
      return user;
    } catch (e) {
      throw e.message;
    }
  }
}
