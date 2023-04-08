import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Text } from 'src/modules/mikroorm/entities/Text';

export class RawText {
  constructor(text: Text) {
    Object.assign(this, text);
  }
  id: number;
  @IsString()
  depends: string;
  @IsString()
  text: string;
}

export class RetrieveTextDto extends RawText {
  constructor(text: Text & { translations: { [key: string]: string } }) {
    super(text);
    this.translations = text.translations;
  }

  @ApiProperty({ type: 'object', example: { en: 'text' } })
  translations: {
    [key: string]: string;
  };
}
