import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ApiService } from './../api.service';

@Component({
  selector: 'app-menu-register',
  templateUrl: './menu-register.component.html',
  styleUrls: ['./menu-register.component.css']
})
export class MenuRegisterComponent implements OnInit {

  @Output() entityCreated = new EventEmitter();

  alertText: string = ""

  entityName: string = ""
  entityDocument: string = ""
  entityType: string = "company";

  companyUf: string = "0";

  providerType: string = "natural";
  providerEmail: string = "";


  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {

    console.log(this.entityType);

  }

  onSelectTypeChange(event_: any) {

    this.entityType = event_.target.value;

  }

  registerButton() {

    this.alertText = "";

    if (this.entityType == "company") {

      if (this.entityName != "" && this.entityDocument != "" && this.companyUf != "0") {

        this.api.registerCompany(this.entityName, this.entityDocument, Number.parseInt(this.companyUf)).subscribe(data => {

          console.log(data);

          

          if (data.status = "1") {

            //entity has been registered

            this.entityCreated.emit({
              type: data.data.type,
              id: data.data.id
            })

          }else if(true){

            //entity already registered

            this.alertText = "- Esse documento já foi registrado";

          }



        });

        this.alertText = "";

      } else {

        this.alertText = "- Preencha todos os campos" + this.entityName + "-" + this.entityDocument + "-" + this.companyUf;

      }

    }





  }

}
