import { TestBed } from '@angular/core/testing';

import { AuthenticationProxy } from './authentication.proxy.service';

describe('AuthService', () => {
  let service: AuthenticationProxy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationProxy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
