import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
/* ===== Partials standalone ===== */
import { FooterApp } from '../../partials/footer-app/footer-app';
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * HomeScreenComponent
 * ---------------------------------------------------------
 * Pantalla principal de la aplicación.
 * Controla:
 * - Drawer (sidebar)
 * - Header / Footer
 * - Formulario reactivo (FormArray)
 * - Tabla de códigos
 */
@Component({
  selector: 'app-home-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp,
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss',
})
export class HomeScreen implements OnInit {

  /* =========================================================
     ESTADO GENERAL
     ========================================================= */

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  /** Controla franja Licensed del footer */
  public showLicensed = false;

  /* =========================================================
     DATOS DE UI
     ========================================================= */

  public name_user = 'Luis Yael Méndez Sánchez';
  public isLoading = false;

  /** Puntaje y ranking (bindings del HTML) */
  public totalPuntos = 3600;
  public posicionRanking = 14;


  /* =========================================================
     FORMULARIO REACTIVO
     ========================================================= */

  /**
   * FormGroup raíz del formulario.
   * IMPORTANTE:
   * - Se inicializa en el constructor
   * - Así Angular garantiza que nunca es undefined en el template
   */
  public inputsCodigo: FormGroup;

  /* =========================================================
     SELECT DE TIENDAS
     ========================================================= */

  public tiendas: Array<{ value: string; nombre: string }> = [
    { value: 'liverpool', nombre: 'Liverpool' },
    { value: 'devlyn', nombre: 'Ópticas Devlyn' },
  ];

  public participacion: { tienda?: string } = {};

  /* =========================================================
     TABLA DE CÓDIGOS
     ========================================================= */

  public lista_codigos: any[] = [];
  public tiene_juegos_pendientes = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
    /**
     * Inicialización SEGURA del formulario.
     * El template se evalúa antes de ngOnInit.
     */
    this.inputsCodigo = this.fb.group({
      listaInputs: this.fb.array([]),
    });

    this.initInputsCodigo();
  }

  ngOnInit(): void {
    this.obtenerCodigos();
  }

  /* =========================================================
     DRAWER (HEADER / SIDEBAR)
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
     BANNER CTA
     ========================================================= */

  public saberMas(): void {
    this.router.navigate(['app','bases-promocion']);
  }

  /* =========================================================
     FOOTER
     ========================================================= */

  public openPrivacy(): void {
    this.router.navigate(['/politica-privacidad']);
  }

  public openTerms(): void {
    this.router.navigate(['/terminos-condiciones']);
  }

  /* =========================================================
     FORM: INPUTS DINÁMICOS
     ========================================================= */

  /**
   * Crea 8 inputs dinámicos (FormArray).
   */

  private initInputsCodigo(): void {
    const array = this.getCamposInputs;

    for (let i = 0; i < 8; i++) {
      array.push(
        this.fb.group({
          valor: [''],
          extra: [false],
        })
      );
    }
  }

  /**
   * Getter seguro del FormArray.
   * Se usa directamente en el template.
   */
  public get getCamposInputs(): FormArray {
    return this.inputsCodigo.get('listaInputs') as FormArray;
  }

  /**
   * Concatena los caracteres del código.
   */
  private getCodigoCompleto(): string {
    return this.getCamposInputs.controls
      .map(ctrl => (ctrl.get('valor')?.value ?? '').toString().trim())
      .join('')
      .toUpperCase();
  }

  /* =========================================================
     ACCIÓN: REGISTRAR CÓDIGO
     ========================================================= */

  public registrarCodigo(): void {
    this.router.navigate(['app','instrucciones']);
  }

  // public registrarCodigo(): void {
  //   if (this.isLoading) return;

  //   const codigo = this.getCodigoCompleto();

  //   if (codigo.length < 8) {
  //     console.warn('Código incompleto:', codigo);
  //     return;
  //   }

  //   if (!this.participacion.tienda) {
  //     console.warn('Debe seleccionar tienda.');
  //     return;
  //   }

  //   this.isLoading = true;

  //   setTimeout(() => {
  //     this.isLoading = false;
  //     this.router.navigate(['/bases-promocion']);
  //   }, 600);
  // }

  /* =========================================================
     DATOS MOCK DE TABLA
     ========================================================= */

  public obtenerCodigos(): void {
    this.lista_codigos = [
      {
        creation: '2022-10-18',
        codigo: 264956,
        puntos_totales: 1100,
        puntos_codigo: 1000,
        puntos_jugar: 100,
        participaciones: 0,
      },
      {
        creation: '2022-11-20',
        codigo: 254956,
        puntos_totales: 1300,
        puntos_codigo: 1000,
        puntos_jugar: 300,
        participaciones: 2,
      },
      {
        creation: '2022-12-19',
        codigo: 274956,
        puntos_totales: 1200,
        puntos_codigo: 1000,
        puntos_jugar: 200,
        participaciones: 1,
      },
    ];

    this.tiene_juegos_pendientes = this.lista_codigos.some(
      c => (c.participaciones ?? 0) < 2
    );
  }

  public jugarParticipacion(codigo: any): void {
    console.log('Código seleccionado:', codigo);
    this.router.navigate(['/instrucciones-juego']);
  }

  /* =========================================================
     SELECT (DEBUG)
     ========================================================= */

  public changeTienda(event: any): void {
    console.log('Tienda seleccionada:', this.participacion.tienda, event?.value);
  }

  /* =========================================================
     TRACK BY (RENDIMIENTO)
     ========================================================= */

  public trackByIndex(index: number): number {
    return index;
  }

  public trackByTienda(index: number, item: { value: string }): string {
    return item.value;
  }

  public trackByCodigo(index: number, item: any): any {
    return item?.codigo ?? index;
  }
}
