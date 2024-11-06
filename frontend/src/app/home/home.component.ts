import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { NgFor } from '@angular/common';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';
import { CountdownComponent } from '../components/countdown/countdown.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, NgFor, CommentFormComponent, CountdownComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  commentService = inject(CommentService)

  dateNow = Date.now()
  
  dateFormatted = signal(new Date(this.dateNow).toLocaleDateString())

  comments = signal<Comment[]>([])

  userService = inject(UserService)

  ngOnInit(): void {
      this.getComments()
  }

  getComments() {
    this.commentService.getComments().subscribe(comments => {
      this.comments.set(comments)
    })
  }

  createComment(formValues: {text: string}) {
    const {text} = formValues
    const user = this.userService.getUserFromStorage()
    if(!user){
      return
    }

    this.commentService.createComment({
      text,
      userId: user._id
    }).subscribe(createdComment => {
      this.comments.set([
        createdComment,
        ... this.comments()
      ])
    })
  }
}
