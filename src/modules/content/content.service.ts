import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTextDto, CreateTextEnDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { CreateButtonDto, CreateButtonEnDto } from './dto/create-button.dto';
import { UpdateButtonDto, UpdateButtonEnDto } from './dto/update-button.dto';
import { EntityManager } from '@mikro-orm/core';
import { Button } from '../mikroorm/entities/Button';
import { ButtonEn } from '../mikroorm/entities/ButtonEn';
import { RawButton, RetrieveButtonDto } from './dto/retrieve-button.dto';
import { TextEn } from '../mikroorm/entities/TextEn';
import { Text } from '../mikroorm/entities/Text';
import { RawText, RetrieveTextDto } from './dto/retrieve-text.dto';

@Injectable()
export class ContentService {
  constructor(private readonly em: EntityManager) {}
  async getAllButtons(): Promise<RetrieveButtonDto[]> {
    const buttonsRu = await this.em.find(Button, {});
    const buttonsEn = await this.em.find(ButtonEn, {});
    const populatedButtons = buttonsRu.map((button) => {
      const buttonEn = buttonsEn.find((b) => b.original_id === button.id);
      return {
        ...button,
        translations: {
          en: buttonEn?.text || '',
        },
      };
    });
    return populatedButtons.map((button) => new RetrieveButtonDto(button));
  }
  async getButton(id: number): Promise<RetrieveButtonDto> {
    const buttonRu = await this.em.findOne(Button, { id });
    if (!buttonRu) throw new NotFoundException('Button not found');
    const buttonEn = await this.em.findOne(ButtonEn, { original_id: id });
    return new RetrieveButtonDto({
      ...buttonRu,
      translations: {
        en: buttonEn?.text || '',
      },
    });
  }
  async getButtonRu(id: number): Promise<RawButton> {
    const button = await this.em.findOne(Button, { id });
    if (!button) throw new NotFoundException('Button not found');
    return new RawButton(button);
  }
  async getButtonEn(id: number): Promise<RawButton> {
    const buttonEn = await this.em.findOne(ButtonEn, { id });
    if (!buttonEn) throw new NotFoundException('Button not found');
    const buttonRu = await this.em.findOne(Button, { id: buttonEn.original_id });
    if (!buttonRu) throw new NotFoundException('Original button not found');
    return new RawButton({ ...buttonRu, text: buttonEn.text });
  }
  async createButton(body: CreateButtonDto): Promise<void> {
    const { text_en, ...button } = body;
    const buttonRu = this.em.create(Button, {
      keyboard: button.keyboard,
      text: button.text,
      data: button.data,
      hide: button.hide.toString(),
      line: button.line.toString(),
      url: button.url.toString(),
    });
    await this.em.persistAndFlush(buttonRu);
    const buttonEn = this.em.create(ButtonEn, { text: text_en, original_id: buttonRu.id });
    return await this.em.persistAndFlush(buttonEn);
  }
  async createButtonRu(body: CreateButtonDto): Promise<void> {
    const button = this.em.create(Button, {
      keyboard: body.keyboard,
      text: body.text,
      data: body.data,
      hide: body.hide.toString(),
      line: body.line.toString(),
      url: body.url.toString(),
    });
    return await this.em.persistAndFlush(button);
  }
  async createButtonEn(body: CreateButtonEnDto): Promise<void> {
    const buttonEn = this.em.create(ButtonEn, { original_id: body.original_id, text: body.text_en });
    return await this.em.persistAndFlush(buttonEn);
  }
  async updateButton(id: number, body: UpdateButtonDto): Promise<void> {
    const buttonRu = await this.em.findOne(Button, { id });
    if (!buttonRu) throw new NotFoundException('ButtonRu not found');
    const buttonEn = await this.em.findOne(ButtonEn, { original_id: id });
    if (!buttonEn) throw new NotFoundException('ButtonEn not found');
    this.em.assign(buttonRu, {
      keyboard: body.keyboard,
      text: body.text,
      data: body.data,
      hide: body.hide.toString(),
      line: body.line.toString(),
      url: body.url.toString(),
    });
    buttonEn.text = body.text_en;
    return await this.em.persistAndFlush([buttonRu, buttonEn]);
  }
  async updateButtonRu(id: number, body: UpdateButtonDto): Promise<void> {
    const buttonRu = await this.em.findOne(Button, { id });
    if (!buttonRu) throw new NotFoundException('ButtonRu not found');
    this.em.assign(buttonRu, {
      keyboard: body.keyboard,
      text: body.text,
      data: body.data,
      hide: body.hide.toString(),
      line: body.line.toString(),
      url: body.url.toString(),
    });
    return await this.em.persistAndFlush(buttonRu);
  }
  async updateButtonEn(id: number, body: UpdateButtonEnDto): Promise<void> {
    const buttonEn = await this.em.findOne(ButtonEn, { id });
    if (!buttonEn) throw new NotFoundException('ButtonEn not found');
    buttonEn.text = body.text_en;
    return await this.em.persistAndFlush(buttonEn);
  }
  async removeButton(id: number): Promise<void> {
    await this.em.nativeDelete(Button, { id });
    await this.em.nativeDelete(ButtonEn, { original_id: id });
    return;
  }
  async removeButtonRu(id: number): Promise<void> {
    await this.em.nativeDelete(Button, { id });
    return;
  }
  async removeButtonEn(id: number): Promise<void> {
    await this.em.nativeDelete(ButtonEn, { id });
    return;
  }
  async create(body: CreateTextDto): Promise<void> {
    const { text_en, ...text } = body;
    const textRu = this.em.create(Text, text);
    await this.em.persistAndFlush(textRu);
    const textEn = this.em.create(TextEn, { text: text_en, original_id: textRu.id });
    return await this.em.persistAndFlush(textEn);
  }
  async createRu(body: CreateTextDto): Promise<void> {
    const text = this.em.create(Text, body);
    return await this.em.persistAndFlush(text);
  }
  async createEn(body: CreateTextEnDto): Promise<void> {
    const textEn = this.em.create(TextEn, { original_id: body.original_id, text: body.text_en });
    return await this.em.persistAndFlush(textEn);
  }
  async update(id: number, body: UpdateTextDto): Promise<void> {
    const textRu = await this.em.findOne(Text, { id });
    if (!textRu) throw new NotFoundException('TextRu not found');
    const textEn = await this.em.findOne(TextEn, { original_id: id });
    if (!textEn) throw new NotFoundException('TextEn not found');
    const { text_en, ...text } = body;
    this.em.assign(textRu, text);
    textEn.text = text_en;
    return await this.em.persistAndFlush([textRu, textEn]);
  }
  async updateRu(id: number, body: UpdateTextDto): Promise<void> {
    const textRu = await this.em.findOne(Text, { id });
    if (!textRu) throw new NotFoundException('TextRu not found');
    this.em.assign(textRu, body);
    return await this.em.persistAndFlush(textRu);
  }
  async updateEn(id: number, body: UpdateTextDto): Promise<void> {
    const textEn = await this.em.findOne(TextEn, { id });
    if (!textEn) throw new NotFoundException('TextEn not found');
    textEn.text = body.text_en;
    return await this.em.persistAndFlush(textEn);
  }
  async remove(id: number): Promise<void> {
    await this.em.nativeDelete(Text, { id });
    await this.em.nativeDelete(TextEn, { original_id: id });
    return;
  }
  async removeRu(id: number): Promise<void> {
    await this.em.nativeDelete(Text, { id });
    return;
  }
  async removeEn(id: number): Promise<void> {
    await this.em.nativeDelete(TextEn, { id });
    return;
  }
  async getAll(): Promise<RetrieveTextDto[]> {
    const texts = await this.em.find(Text, {});
    const textsEn = await this.em.find(TextEn, {});
    const populatedTexts = texts.map((text) => {
      const textEn = textsEn.find((t) => t.original_id === text.id);
      return {
        ...text,
        translations: {
          en: textEn?.text || '',
        },
      };
    });
    return populatedTexts.map((text) => new RetrieveTextDto(text));
  }
  async get(id: number): Promise<RetrieveTextDto> {
    const textRu = await this.em.findOne(Text, { id });
    if (!textRu) throw new NotFoundException('Text not found');
    const textEn = await this.em.findOne(TextEn, { original_id: id });
    return new RetrieveTextDto({
      ...textRu,
      translations: {
        en: textEn?.text || '',
      },
    });
  }
  async getRu(id: number): Promise<RawText> {
    const textRu = await this.em.findOne(Text, { id });
    if (!textRu) throw new NotFoundException('Text not found');
    return new RawText(textRu);
  }
  async getEn(id: number): Promise<RawText> {
    const textEn = await this.em.findOne(TextEn, { id });
    if (!textEn) throw new NotFoundException('Text not found');
    const textRu = await this.em.findOne(Text, { id: textEn.original_id });
    if (!textRu) throw new NotFoundException('Original text not found');
    return new RawText({ ...textRu, text: textEn.text });
  }
}
