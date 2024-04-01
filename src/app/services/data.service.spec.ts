import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { User } from '../models/user.model';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no users initially', done => {
    service.currentUsers.subscribe(users => {
      expect(users.length).toBe(0);
      done();
    });
  });

  it('should update users correctly', done => {
    const newUsers: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
      { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'inactive' }
    ];

    service.updateUsers(newUsers);

    service.currentUsers.subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(newUsers);
      done();
    });
  });

  it('should replace users on update', done => {
    const initialUsers: User[] = [
      { id: 3, name: 'Charlie', email: 'charlie@example.com', gender: 'male', status: 'active' }
    ];

    const newUsers: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
      { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'inactive' }
    ];

    service.updateUsers(initialUsers);
    service.updateUsers(newUsers);

    service.currentUsers.subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(newUsers);
      done();
    });
  });
});
