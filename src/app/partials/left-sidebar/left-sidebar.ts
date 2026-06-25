import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

/**
 * LeftSidebar
 * - Es un componente Standalone (Angular 20)
 * - Diseñado para funcionar como drawer en mobile-first.
 *
 * Contrato con el contenedor (Home):
 * - Recibe isLogin (si hay sesión iniciada o no)
 * - Emite closeSidebar para indicar que debe cerrarse el drawer
 *   (por ejemplo cuando el usuario navega o presiona la X)
 */

@Component({
  selector: 'app-left-sidebar',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss',
})
export class LeftSidebar {

  /**
   * Router:
   * - permite navegar de forma programática
   * - aquí lo inyectamos con inject() (Angular moderno)
   */
  private readonly router = inject(Router);

  /**
   * isLogin:
   * - Indica si hay sesión iniciada.
   * - En una app real, esto se recomienda que venga de un AuthService,
   *   pero como aún estamos armando arquitectura, lo dejamos como Input.
   */
  @Input() isLogin = false;

  /**
   * closeSidebar:
   * - Evento que se emite para que el contenedor (Home) cierre el drawer.
   * - Es clave para mobile: cuando se navega, el menú debe cerrarse.
   */
  @Output() closeSidebar = new EventEmitter<void>();

  /**
   * close():
   * - Se llama cuando el usuario presiona la X
   * - o cuando navegamos (goTo) y deseamos cerrar el drawer.
   */
  close(): void {
    this.closeSidebar.emit();
  }

  /**
   * goTo(path):
   * - Navega hacia una ruta (por ejemplo /home)
   * - Cuando termina la navegación, cierra el drawer.
   *
   * Nota:
   * - router.navigate devuelve una Promesa<boolean>
   * - Si la navegación es exitosa, cerramos el drawer.
   */
  public goTo(segments: string[]): void {
    this.router.navigate(segments);
    this.close(); // cierra el drawer y mantiene la UX mobile correcta
  }

  /**
   * logout():
   * - Aquí debe integrarse su lógica real de cerrar sesión.
   *   Ejemplos:
   *   - borrar cookies
   *   - limpiar localStorage
   *   - reiniciar estado de AuthService
   *
   * Por ahora dejamos una navegación segura al login '/' y cerramos el drawer.
   */
  logout(): void {
    this.router.navigate(['/']).then(() => this.close());
  }

}
