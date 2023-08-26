import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public firstName!: string

  @IsNotEmpty()
  @IsString()
  public lastName!: string

  @IsNotEmpty()
  @IsAlphanumeric()
  public userName!: string

  @IsEmail()
  @IsString()
  public email!: string
}
