import { Component } from '@angular/core';
import { AuthService } from '../auth-service/auth-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  layoutClass: string = 'left-sidebar'; // Valor por defecto
  isMenuVisible: boolean = false; // Estado del menú desplegable

  constructor(private authService: AuthService) {}

  // Métodos para cambiar el layout
  setLeftSidebar() {
    this.layoutClass = 'left-sidebar';
  }

  setRightSidebar() {
    this.layoutClass = 'right-sidebar';
  }

  setNoSidebar() {
    this.layoutClass = 'no-sidebar';
  }

  // Método para alternar la visibilidad del menú
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible; // Cambia el estado del menú
  }

  // Método para cerrar el menú
  closeMenu() {
    this.isMenuVisible = false; // Cierra el menú
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout(); // Cerrar sesión
    this.closeMenu(); // Cerrar el menú
    window.location.href = '/'; // Redirigir al usuario al inicio
  }
}
