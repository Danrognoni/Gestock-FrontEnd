// src/app/components/login/login.component.ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  async loginUser() {
    if (this.form.invalid) {
      return;
    }

    const userLog = this.form.value;


    const user = await this.authService.validateCredentials(userLog);

    if (user) {

      this.authService.logIn(user);


      if (user.rol === 'ADMINISTRADOR') {
        this.router.navigateByUrl('/admin-dashboard');
      } else {
        this.router.navigateByUrl('/empleado-tareas');
      }

    } else {
      console.error("Credenciales incorrectas");
    }
  }
}
