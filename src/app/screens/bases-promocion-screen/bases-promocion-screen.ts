import { Component, HostListener, OnInit } from '@angular/core';
/**
 * IMPORTANTE:
 * SHARED_IMPORTS centraliza:
 * - CommonModule
 * - FormsModule / ReactiveFormsModule
 * - RouterModule
 * - Angular Material
 * - ngx-mask (si aplica)
 */
import { SHARED_IMPORTS } from '../../shared/shared.imports';
/* ===== Partials standalone ===== */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { Router } from '@angular/router';

/**
 * BasesPromocionScreen
 * ---------------------------------------------------------
 * Pantalla de Bases de la promoción.
 * Controla:
 * - Drawer (sidebar) igual que Home/Instrucciones
 * - Header / Footer
 * - Navegación a Instrucciones
 * - Clase responsive (mobile/desktop) sin userAgent
 */

@Component({
  selector: 'app-bases-promocion-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp,
  ],
  templateUrl: './bases-promocion-screen.html',
  styleUrl: './bases-promocion-screen.scss',
})
export class BasesPromocionScreen implements OnInit {

  /* =========================================================
     DRAWER / SIDEBAR
     ========================================================= */

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  /** Controla franja Licensed del footer (si su Footer lo usa) */
  public showLicensed = false;

  /* =========================================================
     ESTADO
     ========================================================= */

  /** Útil si en algún momento desea bloquear CTA */
  public isLoading = false;

  /* =========================================================
     RESPONSIVE (sin userAgent)
     ========================================================= */

  /** Breakpoint consistente con su patrón (tablet+) */
  private readonly MOBILE_MAX = 767;

  /** Cache del estado mobile para no recalcular en cada binding */
  private _isMobile = this.computeIsMobile();


  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  /* =========================================================
     HEADER / SIDEBAR EVENTS
     ========================================================= */

  /** Evento emitido por Header */
  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  /** Evento emitido por Sidebar */
  public closeSidebar(): void {
    this.drawerOpen = false;
  }

  /* =========================================================
     NAVEGACIÓN
     ========================================================= */

  /**
   * CTA para ir a instrucciones (manteniendo su patrón de rutas).
   * Ajuste la ruta si su app usa otra convención.
   */
  public goInstrucciones(): void {
    this.router.navigate(['/app', 'instrucciones']);
  }

  /* =========================================================
     CLASES DE UI
     ========================================================= */

  /**
   * Equivalente a su isMobile() anterior, pero:
   * - sin userAgent
   * - estable, consistente, y fácil de mantener
   */
  public mobileClass(): string {
    return this._isMobile ? 'interior-mobile' : 'interior-normal';
  }

  @HostListener('window:resize')
  public onResize(): void {
    this._isMobile = this.computeIsMobile();
  }

  private computeIsMobile(): boolean {
    return window.matchMedia(`(max-width: ${this.MOBILE_MAX}px)`).matches;
  }

}
