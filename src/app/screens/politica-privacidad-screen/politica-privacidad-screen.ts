import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

/* Partials standalone */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';

@Component({
  selector: 'app-politica-privacidad-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp
  ],
  templateUrl: './politica-privacidad-screen.html',
  styleUrl: './politica-privacidad-screen.scss',
})
export class PoliticaPrivacidadScreen implements OnInit {

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  // Ajuste según su app (si lo obtiene de AuthService, store, etc.)
  isLogin = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  closeSidebar(): void {
    this.drawerOpen = false;
  }

}
