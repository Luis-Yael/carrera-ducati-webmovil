import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./screens/login-screen/login-screen').then(m => m.LoginScreen),
  },
  {
    path: 'registro',
    loadComponent: () => import('./screens/registro-screen/registro-screen').then(m => m.RegistroScreen),
  },
  {
    path: 'app',
    children: [
      {
        path: 'home',
        loadComponent: () => import('./screens/home-screen/home-screen').then(m => m.HomeScreen),
      },
      {
        path: 'instrucciones',
        loadComponent: () => import('./screens/instrucciones-screen/instrucciones-screen').then(m => m.InstruccionesScreen),
      },
      {
        path: 'bases-promocion',
        loadComponent: () => import('./screens/bases-promocion-screen/bases-promocion-screen').then(m => m.BasesPromocionScreen),
      },
      {
        path: 'nuevo-look',
        loadComponent: () => import('./screens/nuevo-look-screen/nuevo-look-screen').then(m => m.NuevoLookScreen),
      },
      {
        path: 'juego-simulado',
        loadComponent: () => import('./screens/juego-simulado-screen/juego-simulado-screen').then(m => m.JuegoSimuladoScreen),
      },
      {
        path: 'juego-terminado',
        loadComponent: () => import('./screens/juego-terminado-screen/juego-terminado-screen').then(m => m.JuegoTerminadoScreen),
      },
      {
        path: 'perfil-usuario',
        loadComponent: () => import('./screens/perfil-usuario-screen/perfil-usuario-screen').then(m => m.PerfilUsuarioScreen),
      },
      {
        path: 'politica-privacidad',
        loadComponent: () => import('./screens/politica-privacidad-screen/politica-privacidad-screen').then(m => m.PoliticaPrivacidadScreen),
      },
      {
        path: 'terminos-condiciones',
        loadComponent: () => import('./screens/terminos-condiciones-screen/terminos-condiciones-screen').then(m => m.TerminosCondicionesScreen),
      }
    ]
  }
];
