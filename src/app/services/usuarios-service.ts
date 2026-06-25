import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';

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

  constructor(
    private errors: ErrorsService,
    private validator: ValidatorService
  ) { }

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

  /* =========================================================
     2) VALIDACIÓN DE USUARIO MÉTODO SIN USAR EL SERVICIO DE ERRORS Y VALIDATOR
     ========================================================= */
  public validarUsuario(user: RegistroUser): RegistroErrors {
    const errors: RegistroErrors = {};

    if (!user.first_name?.trim()) {
      errors.first_name = 'El nombre es obligatorio.';
    }

    if (!user.last_name?.trim()) {
      errors.last_name = 'Los apellidos son obligatorios.';
    }

    if (!user.email?.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else if (!this.isValidEmail(user.email)) {
      errors.email = 'El correo electrónico no tiene un formato válido.';
    }

    if (!user.password?.trim()) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (user.password.trim().length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!user.telefono?.trim()) {
      errors.telefono = 'El teléfono es obligatorio.';
    } else if (!this.isValidPhone(user.telefono)) {
      errors.telefono = 'El teléfono debe contener 10 dígitos.';
    }

    if (!user.ciudad?.trim()) {
      errors.ciudad = 'La ciudad es obligatoria.';
    }

    if (user.edad === null || user.edad === undefined) {
      errors.edad = 'Seleccione una edad.';
    }

    // Importante: esta validación la pide su UI
    if (!user.terminos_condiciones) {
      errors.terminos_condiciones = 'Debe aceptar los términos y condiciones.';
    }

    return errors;
  }

  /* =========================================================
     Helpers privados
     ========================================================= */
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
  }

  private isValidPhone(phone: string): boolean {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  }

  /* =========================================================
     3) VALIDACIÓN DE USUARIO MÉTODO PERO AHORA USANDO EL SERVICIO DE ERRORS Y VALIDATOR
     ========================================================= */

  public validarUsuarioConServices(user: RegistroUser): RegistroErrors {
    const errors: RegistroErrors = {};

    // --- first_name ---
    if (!this.validator.required(user.first_name)) {
      errors.first_name = this.errors.required;
    } else if (!this.validator.wordsES(user.first_name)) {
      errors.first_name = this.errors.msg('pattern', 'Juan');
    }

    // --- last_name ---
    if (!this.validator.required(user.last_name)) {
      errors.last_name = this.errors.required;
    } else if (!this.validator.wordsES(user.last_name)) {
      errors.last_name = this.errors.msg('pattern', 'Pérez López');
    }

    // --- email ---
    if (!this.validator.required(user.email)) {
      errors.email = this.errors.required;
    } else if (!this.validator.email(user.email)) {
      errors.email = this.errors.email;
    }

    // --- password ---
    if (!this.validator.required(user.password)) {
      errors.password = this.errors.required;
    } else if (!this.validator.minLen(user.password, 8)) {
      errors.password = this.errors.msg('min', 8);
    }

    // --- telefono ---
    if (!this.validator.required(user.telefono)) {
      errors.telefono = this.errors.required;
    } else if (!this.validator.phoneMX(user.telefono)) {
      errors.telefono = this.errors.msg('exact', 10);
    }

    // --- ciudad ---
    if (!this.validator.required(user.ciudad)) {
      errors.ciudad = this.errors.required;
    }

    // --- edad ---
    if (!this.validator.required(user.edad)) {
      errors.edad = this.errors.required;
    } else if (!this.validator.betweenNumber(user.edad, 18, 99)) {
      errors.edad = this.errors.msg('between', 18, 99);
    }

    // --- terminos_condiciones ---
    if (!user.terminos_condiciones) {
      errors.terminos_condiciones = this.errors.generic;
    }

    return errors;
  }


}
