import { Component, inject } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  userService = inject(UserService)
  constructor(){
    const user = this.userService.getUserFromStorage()
    if(!user){
      const randomName = `tigputak-${Math.floor(Math.random() * 5000 + 1000)}`
      this.userService.createUser(randomName)
        .subscribe(user => this.userService.saveUserToStorage(user))
    }
  }
}
