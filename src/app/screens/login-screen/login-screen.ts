import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {

  public username: string = '';
  public password: string = '';

  public errors: any = {};

  //Para la contraseña
  public hide_1: boolean = false;
  public inputType_1: string = 'password';

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public login(){

  }
  public recuperarPwd(){

  }

  public goRegistro(){
    this.router.navigate(['registro']); // ajuste según su app
  }

}
