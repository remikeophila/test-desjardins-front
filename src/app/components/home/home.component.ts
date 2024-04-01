import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private usersService: UsersService,
    private dataService: DataService,
    private router: Router) {}

  fetchUsersAndNavigate() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataService.updateUsers(users);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error("Error while retrieving users: ", error);
      }
    });
  }

}
