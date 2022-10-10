import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
        let user:any = {}
        let message = service.registerUser(user);
    
        expect(message).toBe('User registered successfully!');
      })
    
      it('should login user', () => {
        let user:any = {}
        let message = service.LoginUser(user);
    
        expect(message).toBe('User logged in successfully!');
      })
    
      it('should logout user', () => {
        let user:any = {}
        let message = service.logout(user);
    
        expect(message).toBe('User logged out successfully!');
      })
});
