import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { RegistroErrors, RegistroUser, UsuariosService } from '../../services/usuarios-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user!: RegistroUser;
  public errors: RegistroErrors = {};
  public isLoading = false;

  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();

    // Llenar el array de edades
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {
    // Igual a su lógica original (18..80)
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public registrar(): void {
    if (this.isLoading) return;

    console.log('Registro de usuario:', this.user);

    // // 1) Validación centralizada en UsuariosService
    // this.errors = this.usuariosService.validarUsuario(this.user);

    // // 2) Sin jQuery: si hay errores, se detiene
    // if (Object.keys(this.errors).length > 0) return;

    // 3) Registro
    this.isLoading = true;


  }

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

}
