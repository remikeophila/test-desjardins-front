import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UsersService } from '../../services/users.service';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let usersServiceMock: any;
  let dataServiceMock: any;

  beforeEach(async () => {
    usersServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of([
        { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
        { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'inactive' }
      ]))
    };

    dataServiceMock = {
      updateUsers: jasmine.createSpy('updateUsers')
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: DataService, useValue: dataServiceMock }
      ],
      imports: [ RouterModule.forRoot([
        { path: 'users', component: UsersComponent }
      ]) ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain h1 tag with welcome text', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Bienvenue, Rémi!');
  });

  it('should contain Button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Voir les utilisateurs');
  });

  it('should fetch users and update data service on fetchUsersAndNavigate', () => {
    component.fetchUsersAndNavigate();
    expect(usersServiceMock.getUsers).toHaveBeenCalled();
    expect(dataServiceMock.updateUsers).toHaveBeenCalledWith(jasmine.any(Object));
  });

});
