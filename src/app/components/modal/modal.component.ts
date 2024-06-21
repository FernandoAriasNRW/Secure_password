import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { addNewRecord, showForm } from '../../state/actions';

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
  classShowMenu: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ]]
    });
  }


  showModal(){

    const record = document.getElementById('selected');


    if (record) {
      return;
    }

    let modal = document.getElementById('modal');

    if (modal) {
      modal.style.display="block";
      this.disableBackgroundInteractions();
    }

    this.showMenu();

  }

  disableBackgroundInteractions() {
    const body = document.querySelector('body');
    const modal = document.getElementById('modal');

    if (body && modal) {
      body.style.pointerEvents = "none";
      modal.style.pointerEvents = "auto";
    }

  }

  showMenu() {
    this.classShowMenu = this.classShowMenu === '' ? 'show' : '';
  }

  closeModal(){
    let modal = document.getElementById('modal');
    const body = document.querySelector('body');

    if (modal && body) {
      modal.style.display="none";
      body.style.pointerEvents = "auto";
    }
  }

  onSubmit(){

    const name = this.form.controls['name'].value;

    const record = {
      id: "selected",
      name,
      description: "",
      username: "",
      password: "",
      url: "",
      vaultId: "",
      userId: ""
    }

    this.store.dispatch(addNewRecord({ record }));
    this.store.dispatch(showForm({show: true}));

    location.hash = name;

    this.closeModal();
    this.form.reset();
  }


}
