import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() entity = {

    id: "",
    type: "...",
    name: "...",
    document: "...",
    uf: "",
    is_legal_person: undefined

  };

  @Output() clickName = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClickName(){

    this.clickName.emit({

      id: this.entity.id,
      type: this.entity.type
      
    });

  }

}
