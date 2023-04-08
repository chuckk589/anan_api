import { PickType } from '@nestjs/swagger';
import { RetrieveSystemDto } from './retrieve-system.dto';

export class UpdateSystemDto extends PickType(RetrieveSystemDto, ['activation_limit', 'auto_accept']) {}
