import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';

export type UserRole = 'ADMINISTRADOR' | 'EMPLEADO' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios';
  private userRegisteredSignal = signal<any[]>([]);
  public userRegistered = this.userRegisteredSignal.asReadonly();
  private route = inject(Router);
  public estoyLogeado = signal(false);
  private http = inject(HttpClient);
  public currentUser = signal<Usuario | null>(null);

  constructor(){
    this.getUsersRegistered().subscribe({
      next : (data)=>{
        this.userRegisteredSignal.set(data);
      },
      error : (e)=>{
        console.error(e);

      }
    })
    const user = localStorage.getItem('loggedUser');
    if(user){
      const userObj = JSON.parse(user);
      this.currentUser.set(userObj);
      this.estoyLogeado.set(true);
    }
  }

  getUsersRegistered(){
    return this.http.get<any[]>(this.apiUrl);
  }

 validateCredentials(userLog: any): Promise<Usuario | null> {
    return new Promise((resolve) => {
      this.http.get<any[]>(this.apiUrl).subscribe(users => {
        const foundUser = users.find(user =>
          user.username.toLowerCase() === userLog.username.toLowerCase() &&
          user.password === userLog.password
        );

        if (foundUser) {

          const { password, ...userToSave } = foundUser;
          resolve(userToSave as Usuario);
        } else {
          resolve(null);
        }
      });
    });
  }


  logIn(user: Usuario) {
    this.currentUser.set(user);
    this.estoyLogeado.set(true);
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

 logOut() {
  console.log('¡¡¡INTENTANDO CERRAR SESIÓN!!!');
    this.currentUser.set(null);
    this.estoyLogeado.set(false);
    localStorage.removeItem('loggedUser');
    this.route.navigateByUrl('/home');
  }
}

