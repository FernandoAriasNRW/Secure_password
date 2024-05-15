import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      username: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      description: ['', Validators.maxLength(255)],
      password: ['', Validators.required],
      url: [''],
    });
  }

  sendForm(): void {
    console.log(this.formulario.value);
    this.formulario.reset();
  }

}
