import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  localStorageKay = 'putak-user'

  createUser(name: string){
    return this.http.post<User>(`${environment.apiBase}/users`, {name})
  }

  saveUserToStorage(user: User){
    localStorage.setItem(this.localStorageKay, JSON.stringify(user))
  }

  getUserFromStorage(){
    const user = localStorage.getItem(this.localStorageKay)
    return user ? JSON.parse(user) as User : null

  }
}
