import { Injectable } from '@nestjs/common';

import { Board } from 'src/boards/board.entity';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BoardsRepository {
  private boardsRepository: Repository<Board>;

  constructor(private readonly dataSource: DataSource) {
    this.boardsRepository = this.dataSource.getRepository(Board);
  }
  async saveBoard(board: Board): Promise<Board> {
    return this.boardsRepository.save(board);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  async getBoardByDatoId(datoId: string): Promise<Board> {
    const found = await this.boardsRepository.findOneBy({ datoId });

    return found;
  }

  async createBoard(createBoard: CreateBoardDto) {
    const { datoId } = createBoard;
    const newBoard = this.boardsRepository.create({
      datoId,
    });
    await this.boardsRepository.save(newBoard);
    return newBoard;
  }
}
