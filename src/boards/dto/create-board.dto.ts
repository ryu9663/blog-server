import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  datoId: string;
}
