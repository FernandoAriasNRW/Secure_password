import { AfterContentChecked, AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { Router } from '@angular/router';
import { Record } from '../../shared/interfaces/records';
import { selectForm, selectRecords } from '../../state/selectors';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { deleteNewRecord, selectedRecord, showForm } from '../../state/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('formElement') form!: ElementRef;

  recordList: Record[] = [];
  private _selectedRecord!: Record | null;
  private _show: boolean = false;
  newRecord!: Record | null;
  private _clickedElement!: HTMLElement | null;
  private _firstCall: boolean = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }
  ngAfterViewChecked(): void {

    // if (this._firstCall) {
    //   return;
    // }

    // setTimeout(() => {

    //   if (location.hash) {
    //     let record = this._recordList.find(r => r.id === location.hash.replace('#', ''));
    //     const content = document.getElementById('nav-tabContent');
    //     let recordElement = document.getElementById(location.hash.replace('#', ''));

    //     if (!record) {
    //       record = this._recordList.find(r => r.name === location.hash.replace('#', '').replaceAll("%20", " "));

    //       const recordList = document.getElementById('list-tab');

    //       if (recordList) {
    //         recordElement = recordList.children[recordList.children.length - 1] as HTMLElement;
    //       }
    //     }

    //     if (record && recordElement) {

    //       recordElement.classList.add('active');

    //       this.store.dispatch(selectedRecord({ record }));
    //       this.store.dispatch(showForm({ show: true }));
    //       this._clickedElement = document.getElementById(location.hash.replace('#', ''));

    //       this.showContent(content, record);
    //     }
    //     this._firstCall = true;
    //     return;
    //   }
    // }, 0);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.store.select(selectRecords).subscribe(records => {
      this.recordList = records.records;
      this.newRecord = records.newRecord;
    });
  }

  ngOnInit(): void {

    this.store.select(selectRecords).subscribe(records => {
      this.recordList = records.records;
      this.newRecord = records.newRecord;
    });

  }

  setActive(event: MouseEvent, list: HTMLElement, record: Record): void {

    const recordElement: HTMLElement = event.target as HTMLElement;
    const content = document.getElementById('nav-tabContent');

    this.store.select(selectRecords).subscribe(records => {
      this.newRecord = records.newRecord;
      this._selectedRecord = records.selectedRecord;
    });

    if (this._selectedRecord?.id === 'selected' && this.newRecord) {
      if (record.name === this.newRecord.name) {
        return;
      }

      Swal.fire({
        title: "Do you want to leave without save changes?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then((result) => {
        if (result.isDenied) {
          return;
        }

        this.store.dispatch(selectedRecord({ record }));
        this.store.dispatch(showForm({ show: true }));
        this._clickedElement = recordElement;
        let recordNew = this.newRecord;

        if (recordNew?.name) {
          this.store.dispatch(deleteNewRecord({ name: recordNew?.name }));
        }
        this.newRecord = null;
      });

      return;

    }



    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].attributes.getNamedItem('id')?.value === record.id) {
        continue;
      }
      list.children[i].children[0].classList.remove('active');
    }

    this.store.select(selectForm).subscribe(form => {
      this._show = form.show;
    });

    this.store.dispatch(showForm({ show: true }));
    this.store.dispatch(selectedRecord({ record }));

    if (recordElement.classList.contains('active')) {

      if (this._show) {
        recordElement.classList.remove("active");
        this.hideContent(content, record);
        return;
      }
      this.store.dispatch(selectedRecord({ record }));
      return;
    }

    this.store.select(selectRecords).subscribe(record => {
      this._selectedRecord = record.selectedRecord;
    });
    this.store.dispatch(showForm({ show: true }));
    recordElement.classList.add("active");
    this.showContent(content, record);
    return;


  }
  showContent(content: HTMLElement | null, record: Record): void {

    if (!content) {
      return;
    }

    for (let i = 0; i < content.children.length + 1; i++) {
      content.children[i]?.classList.remove("show");
      content.children[i]?.classList.remove("active");

      if (content.children[i]?.attributes.getNamedItem('id')?.value === (record.id)) {
        content.children[i]?.classList.add("show");
        content.children[i]?.classList.add("active");
      };
    }

  }

  hideContent(content: HTMLElement | null, record: Record): void {
    if (!content) {
      return;
    }

    for (let i = 0; i < content.children.length; i++) {
      content.children[i].classList.remove("show");
      content.children[i].classList.remove("active");
    }
    return;
  }

  get selectedRecord(): Record | null {
    return this._selectedRecord;
  }

  deleteRecord(record: Record): void {
    console.log("Delete Record: ", record);
  }

  addToVault(record: Record): void {
    console.log('Add Record to Vault: ', record);
  }


}
