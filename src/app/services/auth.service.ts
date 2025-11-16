import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

// Definimos un tipo simple para el rol
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

  constructor(){
    this.getUsersRegistered().subscribe({
      next : (data)=>{
        this.userRegisteredSignal.set(data);
      },
      error : (e)=>{
        console.error(e);

      }
    })
    const user = localStorage.getItem('loggerUser');
    if(user){
      this.estoyLogeado.set(true);
    }
  }

  getUsersRegistered(){
    return this.http.get<any[]>(this.apiUrl);
  }

  checkUserExists(userLog : any): boolean{
    const users = this.userRegisteredSignal();
    return users.some(user=>
      user.username.toLowerCase() === userLog.username.toLowerCase() &&
      user.password === userLog.password
    );
  }

  logIn(){
    this.estoyLogeado.set(true);
  }

  logOut(){
    this.route.navigateByUrl('Acces-denied');
    this.estoyLogeado.set(false);
    if(localStorage.getItem('loggedUser')){
      localStorage.removeItem('loggedUser')
    }
  }
}
