import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { RulesService } from '../../servicios/rules/rules.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService,
    private rulesService: RulesService
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.authService.LoginEmail(this.email, this.password)
    .then((res)=> {
      this.flashMensaje.show('Usuario Logeado correctamente',{cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/privado']);

    }).catch((err)=> {
      this.flashMensaje.show(err.message,{cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate (['/login']);
    });

  }

  onClickGoogleLogin(){
    this.authService.loginGoogle()
      .then ((res)=> {
        if(res.additionalUserInfo.isNewUser){
          //this.rulesService.createUser(res.user.uid)
          //this.rulesService.prueba({uid:res.user.uid});
        }
        else{
          console.log("viejo")
        }
        this.router.navigate(['/privado']);
      }).catch (err => console.log(err.message));

  }

  onClickFacebookLogin(){
    this.authService.loginFacebook()
      .then ((res)=> {
        this.router.navigate(['/privado']);
      }).catch (err => console.log(err.message));

  }

}
