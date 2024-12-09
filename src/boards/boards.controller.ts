import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from 'src/boards/board.entity';
import { BoardsService } from 'src/boards/boards.service';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @Get('/:datoId')
  getBoardByDatoId(@Param('datoId') datoId: string) {
    return this.boardsService.getBoardByDatoId(datoId);
  }

  @Post('/:datoId/likes')
  likeBoard(@Param('datoId') datoId: string) {
    return this.boardsService.likeBoard(datoId, true);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }
}
