import { Component, OnInit, EventEmitter, Output} from '@angular/core';

import { ApiService } from './../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() clickName = new EventEmitter()

  entities = [];

  entityType : string = "all";

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {

    console.log(this.api.getEntities().subscribe( data => {
      this.entities = data;

      console.log(data);
    } ));

  }

  onSelectTypeChange(event_: any){

    this.entityType = event_.target.value;    

  }

  onClickName(event_){

    this.clickName.emit(event_);

  }

}
