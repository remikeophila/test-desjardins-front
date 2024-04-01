import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private usersSource = new BehaviorSubject<User[]>([]);
    currentUsers = this.usersSource.asObservable();
  
    constructor() { }
  
    updateUsers(users: User[]) {
      this.usersSource.next(users);
    }
}