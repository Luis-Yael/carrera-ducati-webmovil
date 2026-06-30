import { Component, OnInit } from '@angular/core';
/**
 * IMPORTANTE:
 * SHARED_IMPORTS centraliza:
 * - CommonModule
 * - FormsModule / ReactiveFormsModule
 * - RouterModule
 * - Angular Material
 * - ngx-mask
 */
import { SHARED_IMPORTS } from '../../shared/shared.imports';
/* ===== Partials standalone ===== */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { Router } from '@angular/router';

/**
 * Modelo de fila de puntuación (tipado básico)
 */
type PuntuacionItem = {
  descripcion: string;
  puntos: number;
};

@Component({
  selector: 'app-instrucciones-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp
  ],
  templateUrl: './instrucciones-screen.html',
  styleUrl: './instrucciones-screen.scss',
})
export class InstruccionesScreen implements OnInit {

  /* =========================================================
     ESTADO GENERAL (igual que Home)
     ========================================================= */

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  /* =========================================================
     DATOS DE UI
     ========================================================= */

  public isLoading = false;

  /** Tabla de puntuación */
  public lista_puntuacion: PuntuacionItem[] = [];

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarPuntuacion();
  }

  /* =========================================================
     DRAWER (HEADER / SIDEBAR) - MISMO PATRÓN QUE HOME
     ========================================================= */

  /** Evento emitido por el Header */
  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  /** Evento emitido por el Sidebar */
  public closeSidebar(): void {
    this.drawerOpen = false;
  }

  /* =========================================================
     RESPONSIVE (si su HTML aún usa mobileClass())
     ========================================================= */

  /**
   * Devuelve la clase usada por el HTML:
   * - 'interior-mobile' si es pantalla pequeña
   * - 'interior-normal' en pantallas grandes
   *
   * Nota: si ya controla esto 100% con CSS, puede eliminarlo del HTML.
   */
  public mobileClass(): 'interior-mobile' | 'interior-normal' {
    return window.matchMedia('(max-width: 603px)').matches
      ? 'interior-mobile'
      : 'interior-normal';
  }

  /* =========================================================
     ACCIÓN PRINCIPAL
     ========================================================= */

  public jugarAhora(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    // Simulación breve (si después conectará API, aquí iría el servicio)
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['app', 'nuevo-look']);
    }, 400);
  }

  /* =========================================================
     DATOS (MOCK / API)
     ========================================================= */

  private cargarPuntuacion(): void {
    // Ajuste estos valores para que coincidan 1:1 con su backend o reglas reales
    this.lista_puntuacion = [
      { descripcion: 'Esquivar auto', puntos: 10 },
      { descripcion: 'Mantenerse con vida (30s)', puntos: 25 },
      { descripcion: 'Completar 120s', puntos: 100 },
    ];
  }
}
