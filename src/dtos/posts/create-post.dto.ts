import { IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  public title!: string

  @ValidateIf((data) => data.content !== 'undefined')
  @IsString()
  public content!: string
}
