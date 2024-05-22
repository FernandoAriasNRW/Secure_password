import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { Router } from '@angular/router';
import { Record } from '../../shared/interfaces/records';
import { selectForm, selectRecords } from '../../state/selectors';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { selectedRecord, showForm } from '../../state/actions';

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
export class ListsComponent implements OnInit {

  private _recordList: Record[] = [];
  private _selectedRecord!: Record | null;
  private _show: boolean = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(selectRecords).subscribe(records => {
      this._recordList = records.records;
    });
  }

  get recordList(): Record[] {
    return this._recordList;
  }

  setActive(event: MouseEvent, list: HTMLElement, content: HTMLElement, record: Record): void {

    const recordElement: HTMLElement = event.target as HTMLElement;

    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].attributes.getNamedItem('id')?.value === recordElement.id) {
        continue;
      }
      list.children[i].classList.remove("active");
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
  showContent(content: HTMLElement, record: Record): void {

    for (let i = 0; i < content.children.length; i++) {

      content.children[i].classList.remove("show");
      content.children[i].classList.remove("active");
      if (content.children[i].attributes.getNamedItem('id')?.value === (record.name + record.id)) {
        content.children[i].classList.add("show");
        content.children[i].classList.add("active");
      };
    }

  }

  hideContent(content: HTMLElement, record: Record): void {
    for (let i = 0; i < content.children.length; i++) {
      content.children[i].classList.remove("show");
      content.children[i].classList.remove("active");

      return;
    }
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
