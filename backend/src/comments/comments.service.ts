import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
    ) {}

    create(createCommentDto: CreateCommentDto) {
        const createdComment = this.commentModel.create({
            text: createCommentDto.text,
            parent: createCommentDto.parentId || null,
            user: createCommentDto.userId,
        });
        return createdComment.then((doc) =>
            doc.populate([{ path: 'user', select: ['name'] },{ path: 'parent'}]),
        );
    }

    findAll() {
        return this.commentModel
            .find({})
            .populate([{ path: 'user', select: ['name'] }])
            .exec();
    }

    topLevelComments() {
      return this.commentModel
          .find({
            parent: null
          })
          .populate([{ path: 'user', select: ['name'] }])
          .sort({createdAt: -1})
          .exec();
    }

    getCommentsByParentId(parentId: string) {
      try {
        const isValidId = mongoose.isValidObjectId(parentId);
        if (!isValidId) {
          throw new BadRequestException('Invalid ID');
        }
        const result =  this.commentModel
          .find({
            parent: parentId
          })
          .populate([{ path: 'user', select: ['name'] }])
          .sort({createdAt: -1})
          .exec();

      return result
      } catch (error) {
        return error
      }
    }

    // findOne(id: number) {
    //     return `This action returns a #${id} comment`;
    // }

    // update(id: string, updateCommentDto: UpdateCommentDto) {

    //     return this.commentModel.findOneAndUpdate({id, updateCommentDto}).exec()
    // }

    async addLikes(id: string, updateCommentDto: UpdateCommentDto) {

        const existingComment = await this.commentModel.findById(id);
        if (!existingComment) {
            throw new BadRequestException('Comment not found');
        }

        const likers = existingComment.likers || [];
        const isLiked = likers.includes(updateCommentDto.userId);
        if (isLiked) {
            throw new BadRequestException('Comment already liked');
        }

        likers.push(updateCommentDto.userId);
        const data = {
          likers
        };

        return this.commentModel.findByIdAndUpdate(id, data, {new: true}).exec()
        
    }

    async getNumberOfLikes(id: string) {
      const comment = await this.commentModel.findById(id).select('likers');
      if (!comment) {
          throw new BadRequestException('Comment not found');
      }
      return comment.likers.length;
    }

    // remove(id: number) {
    //     return `This action removes a #${id} comment`;
    // }
}
