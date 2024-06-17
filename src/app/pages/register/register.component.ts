import { Component, OnInit } from '@angular/core';
import { AppState } from '../../shared/interfaces/state';
import { Store } from '@ngrx/store';
import { uploadAvatar } from '../../state/actions';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidacionesPropias } from '../../shared/validations/register.validators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
 //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/)

 form! : FormGroup;

 constructor(
  private store: Store<AppState>,
 ){}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/)]),
      confirmPassword: new FormControl('', [Validators.required, (value) => ValidacionesPropias.confirmPass(value, this.form)]),
      avatar: new FormControl(''),
    })
  }

  register(){
    if (this.form?.valid) {
      console.log(this.form.value);
    }

    console.log(this.form);
  }

 upload(event: Event): void {

  let file: File;
  const target = event.target as HTMLInputElement;


  if (target.files && (target.files.length > 0)){
    file = target.files[0];
    console.log('Before Dispatch ', file);
    this.store.dispatch(uploadAvatar({avatar: file}));
    console.log('After Dispatch ');
  }

 }
}
