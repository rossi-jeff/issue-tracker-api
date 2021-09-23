import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto, LoginDto, UuidDto } from '../global/dto';
import { SessionService } from '../session/session.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(payload: JwtPayloadDto) {
    const { UUID } = payload;
    const user = this.userService.getUserByUUID(UUID);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const { Username, Password } = loginDto;
    const user = await this.userService.getUserByUsername(Username);
    if (user && user.validatePassword(Password)) {
      const Name = user.fullName();
      const UserName = user.Credentials.Username;
      const Token = this._createToken(user);
      const UserId = user.Id;
      const session = await this.sessionService.login({
        Active: true,
        Name,
        UserName,
        UserId,
      });
      return {
        Name,
        UserName,
        Token,
        UUID: user.UUID,
        SessionId: session.UUID,
      };
    } else {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  private _createToken(user: User): string {
    const { Id, UUID, Roles } = user;
    return this.jwtService.sign({ Id, UUID, Roles });
  }

  async logout(uuidDto: UuidDto) {
    return await this.sessionService.logout(uuidDto);
  }
}
