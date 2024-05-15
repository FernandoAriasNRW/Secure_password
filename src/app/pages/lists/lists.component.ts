import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/state';
import { Router } from '@angular/router';
import { Record } from '../../shared/interfaces/records';
import { selectRecords } from '../../state/selectors';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';

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

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(selectRecords).subscribe(records => {
      this._recordList = records.records;
      console.log(records);
    });
  }

  get recordList(): Record[] {
    return this._recordList;
  }

  setActive(event: MouseEvent, list: HTMLElement, content: HTMLElement, record: Record): void {

    const recordElement: HTMLElement = event.target as HTMLElement;

    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].attributes.getNamedItem('id')?.value === recordElement.id){
        continue;
      }
      list.children[i].classList.remove("active");
    }


    if (recordElement.classList.contains('active')) {
      recordElement.classList.remove("active");
      this.hideContent(content, record);
    } else {
      recordElement.classList.add("active");
      this.showContent(content, record);
    }


  }

  showContent(content: HTMLElement, record: Record): void {
    for (let i = 0; i < content.children.length; i++) {
      content.children[i].classList.remove("show");
      content.children[i].classList.remove("active");
     if (content.children[i].attributes.getNamedItem('id')?.value === (record.name + record.id)){
       content.children[i].classList.add("show");
       content.children[i].classList.add("active");
     };
    }
  }

  hideContent(content: HTMLElement, record: Record): void {
    for (let i = 0; i < content.children.length; i++) {
      content.children[i].classList.remove("show");
      content.children[i].classList.remove("active");
    }
  }

}
