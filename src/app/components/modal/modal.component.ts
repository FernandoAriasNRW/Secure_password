import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ]]
    });
  }


  showModal(){
    let modal = document.getElementById('modal');

    if (modal) {
      modal.style.display="block";
    }
  }

  closeModal(){
    let modal = document.getElementById('modal');
    if (modal) {
      modal.style.display="none";
    }
  }


}
