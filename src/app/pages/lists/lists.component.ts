import { AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ListsComponent implements OnInit, OnChanges, AfterContentChecked {

  private _recordList: Record[] = [];
  private _selectedRecord!: Record | null;
  private _show: boolean = false;
  private _newRecord!: Record | null;
  private _clickedElement!: HTMLElement | null;
  private _firstCall: boolean = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) { }
  ngAfterContentChecked(): void {

    this.store.select(selectRecords).subscribe(r => {

      const list = document.getElementById('list-tab');
      const content = document.getElementById('nav-tabContent');

      if (r.newRecord) {

        this._newRecord = r.newRecord;
        this._selectedRecord = r.newRecord;

        if (list) {
          for (let i = 0; i < list.children.length; i++) {
            if (i === (list.children.length + 1)) {
              list.children[i].children[0].classList.add('active');
              break;
            }
            list.children[i].children[0].classList.remove('active');
          }
        }

        if (content) {
          this.showContent(content, r.newRecord);
        }
      }

      if (!this._newRecord && !this._firstCall) {

        this._firstCall = true;
        const record = this._selectedRecord;
        const recordElement = this._clickedElement;

        if (list && record && recordElement){
          for (let i = 0; i < list.children.length; i++) {
            if (list.children[i].attributes.getNamedItem('id')?.value === record.id) {
              continue;
            }
            list.children[i].children[0].classList.remove('active');
          }

          this.store.select(selectForm).subscribe(form => {
            this._show = form.show;
          });

          if (recordElement.classList.contains('active')) {
            if (this._show) {
              recordElement.classList.remove("active");
              this.hideContent(content, record);
              return;
            }

            return;
          }

          this.store.dispatch(selectedRecord({ record }));
          this.store.select(selectRecords).subscribe(record => {
            this._selectedRecord = record.selectedRecord;
          });

          recordElement.classList.add("active");
          this.showContent(content, record);
          return;
        }

      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.store.select(selectRecords).subscribe(records => {
      console.log('List Changes: ', records);
      this._recordList = records.records;
    });
  }

  ngOnInit(): void {
    this.store.select(selectRecords).subscribe(records => {
      console.log('List Changes: ', records);
      this._recordList = records.records;
    });

    this.store.select(selectRecords).subscribe(recordState => {
      this._newRecord = recordState.newRecord;
    })
  }

  get recordList(): Record[] {
    return this._recordList;
  }

  setActive(event: MouseEvent, list: HTMLElement, record: Record): void {


    const recordElement: HTMLElement = event.target as HTMLElement;
    const content = document.getElementById('nav-tabContent');

    console.log(this._newRecord)
    if (!this._selectedRecord?.id && this._newRecord) {
      if (record.name === this._newRecord.name) {
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
        let recordNew =this._newRecord;

        if ( recordNew?.name) {
          this.store.dispatch(deleteNewRecord({ name: recordNew?.name}));
        }
        this._newRecord = null;
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


    if (recordElement.classList.contains('active')) {

      if (this._show) {
        recordElement.classList.remove("active");
        this.hideContent(content, record);
        return;
      }
      this.store.dispatch(selectedRecord({ record }));
      this.store.dispatch(showForm({ show: true }));
      return;
    }

    this.store.dispatch(selectedRecord({ record }));
    this.store.select(selectRecords).subscribe(record => {
      this._selectedRecord = record.selectedRecord;
    });
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

      if (content.children[i]?.attributes.getNamedItem('id')?.value === (record.name + record.id)) {
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
