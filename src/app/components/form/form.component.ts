import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Record } from '../../shared/interfaces/records';
import { AppState } from '../../shared/interfaces/state';
import { Store } from '@ngrx/store';
import { deleteNewRecord, selectedRecord, showForm, updateRecord } from '../../state/actions';
import { selectRecords } from '../../state/selectors';
import Swal from 'sweetalert2';

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
export class FormComponent implements OnInit, OnChanges {

  form!: FormGroup;
  @Input() record!: Record | null;
  title: string = 'Title';
  private _selectedRecord: Record | null = null;
  showForm: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>,
  ) {
  }
  ngOnInit(): void {

    this.showForm = true;

    this.store.dispatch(showForm({show: true}));

    this.form = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', Validators.maxLength(255)],
      password: ['', Validators.required],
      url: [''],
    });

    if (this._selectedRecord) {
      this.form.patchValue({
        name: this._selectedRecord.name || '',
        username: this._selectedRecord.username || '',
        description: this._selectedRecord.description || '',
        password: this._selectedRecord.password || '',
        url: this._selectedRecord.url || '',
      });
    }

  }

  ngOnChanges(changes: SimpleChanges): void {

    let record = this._selectedRecord;


    this.store.select(selectRecords).subscribe(r => {

      record = r.selectedRecord;

      if (record) {

        this.title = record.name || 'Title';
        this._selectedRecord = record;
        if (record.id) {
          this.form?.patchValue({
            name: record.name || '',
            username: record.username || '',
            description: record.description || '',
            password: record.password || '',
            url: record.url || '',
          });
        }

      }
    })
  }

  get selectedRecord(){
    return this._selectedRecord;
  }

  sendForm(): void {

    let record;

    if (this._selectedRecord) {
      record = {...this._selectedRecord};

      console.log('Controls: ', this.form.controls['name'].value)

      record.name = this.form.controls['name'].value;
      record.username = this.form.controls['username'].value;
      record.description = this.form.controls['description'].value;
      record.password = this.form.controls['password'].value;
      record.url = this.form.controls['url'].value;

      this.store.dispatch(updateRecord({record}));

      this.store.dispatch(selectedRecord({ record: null}));
      this.showForm = false;
      this.store.dispatch(showForm({show: false}));

      if (!this._selectedRecord.id) {
        
      }

    }
  }

  showPass ( event: Event, password: HTMLInputElement){
    const icon = event.target as HTMLInputElement;
    if(password.type === "password") {
      password.type = "text";
      icon.classList.add("fa-eye");
      icon.classList.remove("fa-eye-slash");
    }
    else {
      password.type = "password";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
    }
  }

  hideForm(){

    const currentRecord = this._selectedRecord;

    if (!currentRecord?.id) {

      Swal.fire({
        title: "Do you want to leave without save changes?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isDenied) {
          return;
        }
        console.log(currentRecord);
        // this.store.dispatch(selectedRecord({ record }));
        // this.store.dispatch(showForm({ show: true }));
        // this._clickedElement = recordElement;
        // let recordNew =this._newRecord;
        if ( currentRecord?.name) {
          this.store.dispatch(deleteNewRecord({ name: currentRecord?.name}));
        }
        // this._newRecord = null;
        this.store.dispatch(selectedRecord({ record: null}));
        this.showForm = false;
        this.store.dispatch(showForm({show: false}));
      });
      return;
    }

    this.store.dispatch(selectedRecord({ record: null}));
    this.showForm = false;
    this.store.dispatch(showForm({show: false}));

  }

}
