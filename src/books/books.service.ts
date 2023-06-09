import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }

  async getReservationsCountByEmail(email: string): Promise<number> {
    return this.bookModel.countDocuments({ email }).exec();
  }

  remove(ids: string[]) {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const stringIds = objectIds.map((objectId) => objectId.toString());
  
    return this.bookModel.deleteMany({ _id: { $in: stringIds } });
  }
}
