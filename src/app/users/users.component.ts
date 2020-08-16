import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  usersCopy: User[] = [];
  loading: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe(
      (response) => {
        this.loading = false;
        this.users = response;
      },
      (error) => {
        this.loading = false;
        alert(error);
      }
    );
  }

  filterUserList() {
    const filteredUser = this.users.filter((user) => {
      const fullName = user.firstName + ' ' + user.lastName;
      return fullName.length >= 10 && user.age >= 20 && user.age <= 30;
    });
    this.users = filteredUser;
  }
}
