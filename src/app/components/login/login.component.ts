import { Component } from '@angular/core';
import { AuthService } from '../../serviceses/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userDetail = new UserModel();
  loginform = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),

  });

  get email() {
    return this.loginform.get('email')
  }
  get password() {
    return this.loginform.get('password')
  }
  constructor(private authService: AuthService, private toster: ToastrService, private router: Router) { }

  login() {
    console.log(this.userDetail.email, this.userDetail.password);
    this.authService.validate(this.userDetail.email, this.userDetail.password).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this)
    });
  }
  handleSuccess(response: any) {
    let users = response.map((data: any) => {
      return {
        id: data.payload.doc.id,
        ...data.payload.doc.data() as UserModel
      }
    });
    if (users && users.length > 0) {

      let userDetail = users.shift();
      localStorage.setItem('displayName', userDetail!.displayName);
      localStorage.setItem('loggedInUserId', userDetail!.id);
      localStorage.setItem('isAdmin', userDetail!.isAdmin ? 'true' : 'false');

      this.toster.success('Login successfully');
      this.router.navigate(['/userproduct']);
    }
    else {
      this.toster.error('In-valid credentials..!');
    }
  }

  handleError(response: any) {

    this.toster.error('In-valid credentials..!');
  }
}
