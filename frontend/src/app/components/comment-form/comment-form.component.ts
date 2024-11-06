import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent {

  @Input() placeholder = 'I-type imo putak. Bisan-unsang mga putak nga naa sa imong huna-huna nga gusto nimo i-gasa sa tanan.'
  @Input() buttonText = 'I-putak'
  @Output() formSubmitted = new EventEmitter<{
    text: string
  }>()

  formSubmit(event: SubmitEvent) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const textAreaElement = form.elements.namedItem('commentText') as HTMLTextAreaElement
    const commentText = textAreaElement.value
    form.reset()

    console.log(commentText)

    this.formSubmitted.emit({
      text: commentText
    })

  }
  

}
