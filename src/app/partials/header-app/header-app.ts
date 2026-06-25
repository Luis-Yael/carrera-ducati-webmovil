import { Component, EventEmitter, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-header-app',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './header-app.html',
  styleUrl: './header-app.scss',
})
export class HeaderApp {

  /**
   * Evento que notifica al componente padre (HomeScreen)
   * que el usuario quiere abrir o cerrar el sidebar.
   */
  @Output() menuToggle = new EventEmitter<void>();

  /**
   * Método que se ejecuta al dar clic en el botón hamburguesa.
   * Emite el evento hacia el componente padre.
   */
  onToggleMenu(): void {
    this.menuToggle.emit();
  }

}
