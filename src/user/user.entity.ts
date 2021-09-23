import { BaseModel } from '../global/base';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { CredentialsEmbed, NameEmbed } from '../global/embed';
import { Email } from '../email/email.entity';
import { Phone } from '../phone/phone.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Role } from '../role/role.entity';

const SaltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'Su93r53cre7!';

@Entity()
export class User extends BaseModel {
  @Column((type) => CredentialsEmbed)
  Credentials: CredentialsEmbed;

  @Column((type) => NameEmbed)
  Name: NameEmbed;

  @OneToMany((type) => Email, (email) => email.User)
  Emails: Email[];

  @OneToMany((type) => Phone, (phone) => phone.User)
  Phones: Phone[];

  @OneToMany((type) => Role, (role) => role.User)
  Roles: Role[];

  fullName() {
    const parts = [];
    const { First, Middle, Last } = this.Name;
    if (First) parts.push(First);
    if (Middle) parts.push(Middle);
    if (Last) parts.push(Last);
    return parts.join(' ');
  }

  validatePassword(pasword: string) {
    if (!pasword || !this.Credentials.Password) return false;
    return bcrypt.compareSync(pasword, this.Credentials.Password);
  }

  setEncryptedPassword(pasword: string) {
    this.Credentials.Password = bcrypt.hashSync(pasword, SaltRounds);
  }

  changePassword(oldPassword: string, newPassword: string) {
    if (this.validatePassword(oldPassword)) {
      this.setEncryptedPassword(newPassword);
      return true;
    } else {
      return false;
    }
  }

  generateAuthToken() {
    const { Id, UUID } = this;
    let Roles = [];
    for (let role of this.Roles) Roles.push(role.Name);
    let payload = { Id, UUID, Roles };
    return jwt.sign(payload, jwtSecret);
  }

  @BeforeInsert()
  initialPasswordEncrypt() {
    const { Password } = this.Credentials;
    if (Password) {
      this.setEncryptedPassword(Password);
    }
  }
}
