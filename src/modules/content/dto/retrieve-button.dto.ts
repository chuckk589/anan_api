import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Button } from 'src/modules/mikroorm/entities/Button';

export class RawButton {
  constructor(button: Button) {
    Object.assign(this, button);
  }
  id: number;
  @IsString()
  keyboard: string;
  @IsString()
  text: string;
  @IsString()
  data: string;
  @IsBoolean()
  hide: boolean;
  @IsNumber()
  line: number;
  @IsBoolean()
  url: boolean;
}
export class RetrieveButtonDto extends RawButton {
  constructor(button: Button & { translations: { [key: string]: string } }) {
    super(button);
    this.translations = button.translations;
  }

  @ApiProperty({ type: 'object', example: { en: 'text' } })
  translations: {
    [key: string]: string;
  };
}
