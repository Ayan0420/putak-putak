import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  parentId?: string
  text: string
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${environment.apiBase}/comments`
    if(parentId) {
      url += `?parentId=${parentId}`
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto ){
    return this.http.post<Comment>(`${environment.apiBase}/comments`, comment)
  }


  addLikes(commentId: string, userId: string) {
    return this.http.patch<Comment>(`${environment.apiBase}/comments/${commentId}`, {
      userId
    })
  }

  getLikes(commentId: string) {
    return this.http.get<number>(`${environment.apiBase}/comments/${commentId}/likes`)
  }

}
