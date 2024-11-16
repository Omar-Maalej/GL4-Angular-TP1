import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { map, Observable, tap } from 'rxjs';
import { AuthInfo } from '../dto/auth-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private authInfoSignal = signal<AuthInfo | null>(null);

  constructor() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');

    if (token && email && userId) {
      this.authInfoSignal.set({
        token,
        email,
        userId: parseInt(userId, 10),
      });
  }
} 


  isAuthenticated = computed<boolean>(() => {
    const user = this.authInfoSignal();
    return user !== null && user.token !== null;
  });
  
  /*authInfo = computed<AuthInfo | null>(() => {
    const user = this.authInfoSignal();
    return user ? { token : user.token , userId: user.userId, email: user.email } : null;
  });
 */


  login(credentials: CredentialsDto): Observable<boolean> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap( (response) => {
        this.authInfoSignal.set({
          token: response.id,
          email: credentials.email,
          userId: response.userId,
        });
      
      localStorage.setItem('token', response.id);
      localStorage.setItem('userId', response.userId.toString());
      localStorage.setItem('email', credentials.email);
  
   } ), 
   map(() => true)
  );
  }

 
  getAuthInfo() {
    return this.authInfoSignal();
  }

  logout() {
    this.authInfoSignal.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
  }
}
