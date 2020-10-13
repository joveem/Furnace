import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'furnace-front-end';

  tab: string = "home";

  entityDetailEntity = {

    id: "1",
    type: "provider",
    name: "...",
    document: "...",
    uf: "...",
    email: "...",
    birthday: "...",
    is_legal_person: undefined

  }


  onChangeTab(tab_: string) {

    this.tab = tab_;

  }

  onClickName(event_) {

    this.entityDetailEntity.id = event_.id;
    this.entityDetailEntity.type = event_.type;

    this.tab = "details";

  }

  onDeleteEntity(){

    this.tab = "home";

  }

  onEntityCreated(event_) {

    console.log(event_);

    this.entityDetailEntity.id = event_.id;
    this.entityDetailEntity.type = event_.type;

    this.tab = "details";

  }

}