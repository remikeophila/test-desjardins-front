import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsersComponent } from './users.component';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing'; 
import { RouterModule } from '@angular/router';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    const dataServiceMock = {
      currentUsers: of([
        { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
        { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'active' },
      ])
    };

    await TestBed.configureTestingModule({
        imports: [RouterModule.forRoot([])],
        providers: [
        { provide: DataService, useValue: dataServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users after ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('should display users', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toEqual(component.users.length);

    expect(rows[0].nativeElement.textContent).toContain(component.users[0].name);
    expect(rows[1].nativeElement.textContent).toContain(component.users[1].name);
  });

});
