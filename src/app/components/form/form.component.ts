import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { Record } from '../../shared/interfaces/records';
import { AppState } from '../../shared/interfaces/state';
import { createRecord, deleteNewRecord, selectedRecord, showForm, updateRecord } from '../../state/actions';
import { selectForm, selectRecords } from '../../state/selectors';
import { RecordService } from '../../services/record.service';
import { GeneratePassComponent } from '../generate-pass/generate-pass.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClipboardModule,
    GeneratePassComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, OnChanges, AfterViewChecked {


  form!: FormGroup;
  @Input() record!: Record | null;
  title: string = 'Title';
  private _selectedRecord: Record | null = null;
  showForm: boolean = false;
  hide: string = '';
  // private _loading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly clipboard: Clipboard,
    private readonly recordService: RecordService,
  ) {
  }
  ngAfterViewChecked(): void {
  }
  ngOnInit(): void {

      this.showForm = true;

      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
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
    // this._loading = this.recordService.loading
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('Changes: ', changes);
    let record = this._selectedRecord;

    this.store.select(selectForm).subscribe((form) => {
      this.showForm = form.show;
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
    });

  }

  get selectedRecord() {
    return this._selectedRecord;
  }

 sendForm() {


    let record;

    if (this._selectedRecord) {

      record = { ...this._selectedRecord };

      if (record.id) {

        record.name = this.form.controls['name'].value;
        record.username = this.form.controls['username'].value;
        record.description = this.form.controls['description'].value;
        record.password = this.form.controls['password'].value;
        record.url = this.form.controls['url'].value;

        this.store.dispatch(updateRecord({ record }));

        // this.store.dispatch(selectedRecord({ record: null}));
        // this.showForm = false;
        // this.store.dispatch(showForm({show: false}));


        return;

      }

      record.name = this.form.controls['name'].value;
      record.username = this.form.controls['username'].value;
      record.description = this.form.controls['description'].value;
      record.password = this.form.controls['password'].value;
      record.url = this.form.controls['url'].value;

      this.store.dispatch(createRecord({ record }));

      // this.store.dispatch(selectedRecord({ record: null}));
      // this.showForm = false;
      // this.store.dispatch(showForm({show: false}));

    }
  }

  showPass(event: Event, password: HTMLInputElement) {
    const icon = event.target as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
      icon.classList.add("fa-eye");
      icon.classList.remove("fa-eye-slash");
      // this.canCopy = true;
    }
    else {
      password.type = "password";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
      // this.canCopy = false;
    }
  }

  copyToClipboard(input: HTMLInputElement) {

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    if (input.value) {
      return this.clipboard.copy(input.value) ?
        Toast.fire({
          icon: "success",
          title: "Copied Success"
        }) : Toast.fire({
          icon: "error",
          title: "Unabled to copy"
        });
    }

    Toast.fire({
          icon: "error",
          title: "Unabled to copy"
        });

    return;
  }

  hideForm() {

    const currentRecord = this._selectedRecord;

    if (currentRecord?.id === 'selected') {


      Swal.fire({
        title: "Do you want to leave without save changes?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isDenied) {
          return;
        }
        if (currentRecord?.name) {
          this.store.dispatch(deleteNewRecord({ name: currentRecord?.name }));
        }
        this.store.dispatch(selectedRecord({ record: null }));
        this.showForm = false;
        this.store.dispatch(showForm({ show: false }));
      });
      return;
    }

    const id = location.hash.replace('#', '');

    const record = document.getElementById(id);


    if (record){
      for (let i = 0; i < record.children.length; i++) {
        record.children[i].classList.remove('active');
      }
    }

    this.store.dispatch(selectedRecord({ record: null }));
    this.showForm = false;
    this.store.dispatch(showForm({ show: false }));

  }

}
