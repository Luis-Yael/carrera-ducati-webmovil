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
