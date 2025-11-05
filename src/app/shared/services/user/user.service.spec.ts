import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../../../sections/admin/users/model/user.model';

describe('UserService', () => {
  let service: UserService<User>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService<User>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
