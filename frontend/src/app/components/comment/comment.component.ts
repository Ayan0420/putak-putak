import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent, LoaderComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
  @Input() comment!: Comment
  isExpanded = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService)
  userService = inject(UserService)
  nestedComments = signal<Comment[]>([])
  likes = signal<number>(0)
  isLoading = signal(true)

  nestCommentEffect = effect(() => {
    if(this.isExpanded()) {
      this.getComments()
      this.getLikes()
    
    }
  })

  addLike() {
    const user = this.userService.getUserFromStorage()
    if(!user){
      return
    }
    this.commentService.addLikes(this.comment._id, user._id).subscribe(comment => {
      this.likes.set(comment.likers.length)
    })
  }

  ngOnInit(): void {
    this.getComments()
    this.getLikes()
  }

  getComments() {
    this.isLoading.set(true)
    this.commentService.getComments(this.comment._id)
    .subscribe(comments => {
        this.nestedComments.set(comments)
        this.isLoading.set(false)
    })
  }

  getLikes() {
    return this.commentService.getLikes(this.comment._id).subscribe(likes => {
      this.likes.set(likes)
    })
  }

  toggleExpand() {
    this.isExpanded.set(!this.isExpanded());
  } 

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if(this.isReplying()){
      this.isExpanded.set(true);
    }
  }

  createComment(formValues: {text: string}) {
    this.isLoading.set(true)
    const {text} = formValues
    const user = this.userService.getUserFromStorage()
    if(!user){
      return
    }

    this.commentService.createComment({
      text,
      userId: user._id,
      parentId: this.comment._id
    }).subscribe(createdComment => {
      this.nestedComments.set([
        createdComment,
        ... this.nestedComments()
      ])
      this.isLoading.set(false)
    })
  }
}
