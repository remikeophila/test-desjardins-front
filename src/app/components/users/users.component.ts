import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    users: User[] = [];

    constructor(private dataService: DataService) {}
  
    ngOnInit() {
        this.dataService.currentUsers.subscribe(users => {
            this.users = users;
            console.log(users);
          });
    }
}
