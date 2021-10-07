import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../global/dto';
import { PhoneService } from '../phone/phone.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RegisterService {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private phoneService: PhoneService,
  ) {}

  async registerUser(registerDto: CreateUserDto) {
    const emails = registerDto.Emails;
    const phones = registerDto.Phones;
    delete registerDto.Emails;
    delete registerDto.Phones;
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
      return user;
    } catch (e) {
      throw e.message;
    }
  }
}
