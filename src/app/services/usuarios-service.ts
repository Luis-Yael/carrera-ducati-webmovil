import { Injectable } from '@angular/core';

export interface RegistroUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  telefono: string;
  ciudad: string;
  edad: number | null;
  terminos_condiciones: boolean;
}

export interface PerfilUsuarioUI {
  first_name: string;
  last_name: string;
  email: string;
  telefono: string;
  estado: string;
  ciudad: string;
  edad: number | null;

  // extras para UI
  codigo?: string;
  fecha_registro?: string; // ISO
  photoUrl?: string;
  rolEtiqueta?: string; // ej. "DOCENTE BUAP"
}

export type RegistroErrors = Partial<Record<keyof RegistroUser, string>>;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  /* =========================================================
     1) ESQUEMA (modelo base)
     ========================================================= */
  public esquemaUser(): RegistroUser {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      telefono: '',
      ciudad: '',
      edad: null,
      terminos_condiciones: false
    };
  }

  // public validarUsuario(user: RegistroUser): RegistroErrors {

  // }

}
