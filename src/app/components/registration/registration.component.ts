import { Component } from '@angular/core';
import { AuthService } from '../../serviceses/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  singupform = new FormGroup({
    email: new FormControl(null, Validators.required),
    firatName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    displayName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmpassword: new FormControl(null, Validators.required),
  });
  get email() {
    return this.singupform.get('email')
  }
  get firatName() {
    return this.singupform.get('firatName')
  }
  get lastName() {
    return this.singupform.get('lastName')
  }
  get displayName() {
    return this.singupform.get('displayName')
  }

  get password() {
    return this.singupform.get('password')
  }
  get confirmpassword() {
    return this.singupform.get('confirmpassword')
  }




  user = new UserModel();

  constructor(private authService: AuthService, private toster: ToastrService, private router: Router) { }

  register() {
    this.authService.register(this.user)
      .then(response => {
        this.toster.success('Registration successfully....!');
        this.router.navigate(['/login']);

      })
      .catch(error => {
        this.toster.error('Internal server error..!');
      })
  }

}