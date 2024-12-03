import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  // Variables del formulario
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  telefonoUsuario: string = '';
  correoUsuario: string = '';
  direccionUsuario: string = '';
  ciudad: string = '';
  estado: string = '';
  codigoPostal: string = '';
  password: string = '';
  confirmPassword: string = '';
  isPasswordValid: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  checkPassword(): void {
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasNumber = /[0-9]/.test(this.password);
    const hasSymbol = /[!@#$%^&*]/.test(this.password);
    const isLongEnough = this.password.length >= 8;

    this.isPasswordValid = hasUpperCase && hasNumber && hasSymbol && isLongEnough;
  }

  onSubmit(): void {
    // Validación de contraseñas
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
  
    this.checkPassword();
    if (!this.isPasswordValid) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.';
      return;
    }
  
    // Validación de otros campos
    if (!this.nombreUsuario || !this.apellidoUsuario || !this.telefonoUsuario || !this.correoUsuario ||
        !this.direccionUsuario || !this.ciudad || !this.estado || !this.codigoPostal) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }
  
    // Si no hay errores, limpiar el mensaje de error y preparar los datos del usuario
    this.errorMessage = '';
  
    const userData = {
      nombreUsuario: this.nombreUsuario,
      apellidoUsuario: this.apellidoUsuario,
      telefonoUsuario: this.telefonoUsuario,
      correoUsuario: this.correoUsuario,
      contraseñaUsuario: this.password,
      direccionUsuario: this.direccionUsuario,
      ciudad: this.ciudad,
      estado: this.estado,
      codigoPostal: this.codigoPostal,
      rolUsuario: 'cliente'
    };
  
    // Enviar datos al backend solo si todo está correcto
    this.http.post('http://localhost:3000/register', userData)
      .pipe(
        catchError((error) => {
          console.error('Error en el registro:', error);
          // Si el error es debido a que el correo ya está en uso, solo mostrar el mensaje adecuado
          if (error.error?.message?.includes('correo ya está en uso')) {
            this.errorMessage = 'Este correo electrónico ya está registrado.';
          } else {
            this.errorMessage = 'No se pudo registrar el usuario. ' + (error.error?.message || 'Intenta de nuevo más tarde.');
          }
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          // Si la respuesta es exitosa, limpiar mensaje de error
          this.successMessage = 'Usuario registrado con éxito. Revisa tu correo electrónico para más detalles.';
          this.errorMessage = '';  // Limpiar mensaje de error
          // Redirigir después de registrar
          this.router.navigate(['/Viajes/inicio']);
        },
        error: (err) => {
          // Aquí solo entraría si el error sigue ocurriendo en el catchError
          console.error('Error inesperado al registrar:', err);
        }
      });
  }
    
  

  loginWithGoogle(): void {
    console.log('Iniciando sesión con Google');
  }

  loginWithFacebook(): void {
    console.log('Iniciando sesión con Facebook');
  }
}
