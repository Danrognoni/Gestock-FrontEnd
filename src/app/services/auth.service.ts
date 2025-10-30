import { Injectable, signal } from '@angular/core';

// Definimos un tipo simple para el rol
export type UserRole = 'ADMINISTRADOR' | 'EMPLEADO' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public currentUserRole = signal<UserRole>(null);

  constructor() { }



  loginComoAdmin(): void {
    this.currentUserRole.set('ADMINISTRADOR');
    console.log('Logueado como ADMIN');
  }

  loginComoEmpleado(): void {

    this.currentUserRole.set('EMPLEADO');
    console.log('Logueado como EMPLEADO');
  }

  logout(): void {
    this.currentUserRole.set(null);
    console.log('Logout');
  }


  public isAdmin(): boolean {
    return this.currentUserRole() === 'ADMINISTRADOR';
  }

  public isEmpleado(): boolean {
    return this.currentUserRole() === 'EMPLEADO';
  }

  public isLoggedIn(): boolean {
    return this.currentUserRole() !== null;
  }
}
