import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from 'src/boards/board.entity';
import { BoardsRepository } from 'src/boards/board.repository';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async getAllBoards(): Promise<Board[]> {
    const boards = await this.boardsRepository.getAllBoards();
    return boards;
  }

  async getBoardByDatoId(datoId: string): Promise<Board> {
    const found = await this.boardsRepository.getBoardByDatoId(datoId);
    if (!found) {
      throw new NotFoundException(`Board with ID ${datoId} not found`);
    }

    return found;
  }

  async likeBoard(datoId: string, isPlus: boolean) {
    const board = await this.getBoardByDatoId(datoId);
    if (isPlus) board.likes++;
    else board.likes--;

    await this.boardsRepository.saveBoard(board);

    return board;
  }

  async createBoard({ datoId }: CreateBoardDto) {
    const newBoard = await this.boardsRepository.createBoard({
      datoId,
    });
    return newBoard;
  }
}
