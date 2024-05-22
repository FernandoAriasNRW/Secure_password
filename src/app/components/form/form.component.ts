import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Record } from '../../shared/interfaces/records';
import { AppState } from '../../shared/interfaces/state';
import { Store } from '@ngrx/store';
import { selectedRecord, showForm } from '../../state/actions';
import { selectRecords } from '../../state/selectors';

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

        this.form?.patchValue({
          name: record.name || '',
          username: record.username || '',
          description: record.description || '',
          password: record.password || '',
          url: record.url || '',
        });
      }
    })
  }

  get selectedRecord(){
    return this._selectedRecord;
  }

  sendForm(): void {
    console.log(this.form.value);
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
    this.store.dispatch(selectedRecord({ record: null}));
    this.showForm = false;
    this.store.dispatch(showForm({show: false}));
  }

}
