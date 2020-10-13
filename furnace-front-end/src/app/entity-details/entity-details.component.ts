import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { ApiService } from './../api.service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']
})
export class EntityDetailsComponent implements OnInit {

  @Output() deleteEntity = new EventEmitter()

  mode: string = "view";

  @Input() entity = {

    id: "1",
    type: "provider",
    name: "...",
    document: "...",
    uf: "...",
    email: "...",
    birthday: "...",
    is_legal_person: undefined

  };

  tempEntity = {

    id: "...",
    type: "...",
    name: "...",
    document: "...",
    uf: "...",
    email: "...",
    birthday: "...",
    is_legal_person: undefined

  };

  tempBirthday = {

    day: "",
    month: "",
    year: ""

  }

  ufId = "0";


  constructor(

    private api: ApiService

  ) { }


  ngOnInit(): void {

    this.api.getEntityById(this.entity.id, this.entity.type)

    this.api.getEntityById(this.entity.id, this.entity.type).subscribe(data => {

      this.entity = data;

      if (this.entity.type == "company") {

        this.ufId = this.getIdByUf(this.entity.uf);

      }

    });

  }

  saveButton(){

    if(this.entity.type == "provider"){

      this.tempEntity.birthday = this.tempBirthday.year + "-" + this.tempBirthday.month + "-" + this.tempBirthday.day;
    
    }


    this.api.updateEntity(this.tempEntity).subscribe(data =>{

      if(data.status == "1"){

        this.entity = data.data;

        this.onChangeMode('view');

        console.log("- succed");

      }else if(data.status == "0"){

        console.log("- error");

      }

    })

  }

  deleteButton(){

    console.log("-deleting...")

    this.api.deleteEntity(this.entity).subscribe(data =>{

      console.log("-DATA=", data);

      if(data.status == "1"){

        this.entity = data.data;

        this.onChangeMode('view');

        console.log("- succed");

        this.deleteEntity.emit();

      }else if(data.status == "0"){

        console.log("- error");

      }

    })

  }


  onChangeMode(mode_: string) {

    if (mode_ == 'edit') {

      this.tempEntity = JSON.parse(JSON.stringify(this.entity));

      if (this.entity.type == 'provider' && !this.entity.is_legal_person) {

        this, this.tempBirthday.day = this.entity.birthday.split('/')[0];
        this, this.tempBirthday.month = this.entity.birthday.split('/')[1];
        this, this.tempBirthday.year = this.entity.birthday.split('/')[2];

      }

      if (this.entity.type == "company") {

        this.ufId = this.getIdByUf(this.entity.uf);

      }


    }

    this.mode = mode_;

  }

  getUfById = function (id_) {

    if (id_ == "1") {

      return "AC"

    } else if (id_ == "2") {

      return "AL"

    } else if (id_ == "3") {

      return "AM"

    } else if (id_ == "4") {

      return "AP"

    } else if (id_ == "5") {

      return "BA"

    } else if (id_ == "6") {

      return "CE"

    } else if (id_ == "7") {

      return "DF"

    } else if (id_ == "8") {

      return "ES"

    } else if (id_ == "9") {

      return "GO"

    } else if (id_ == "10") {

      return "MA"

    } else if (id_ == "11") {

      return "MG"

    } else if (id_ == "12") {

      return "MS"

    } else if (id_ == "13") {

      return "MT"

    } else if (id_ == "14") {

      return "PA"

    } else if (id_ == "15") {

      return "PB"

    } else if (id_ == "16") {

      return "PE"

    } else if (id_ == "17") {

      return "PI"

    } else if (id_ == "18") {

      return "PR"

    } else if (id_ == "19") {

      return "RJ"

    } else if (id_ == "20") {

      return "RN"

    } else if (id_ == "21") {

      return "RO"

    } else if (id_ == "22") {

      return "RR"

    } else if (id_ == "23") {

      return "RS"

    } else if (id_ == "24") {

      return "SC"

    } else if (id_ == "25") {

      return "SE"

    } else if (id_ == "26") {

      return "SP"

    } else if (id_ == "27") {

      return "TO"

    }

  }

  getIdByUf(uf_: string) {

    if (uf_ == "AC") {

      return "1"

    } else if (uf_ == "AL") {

      return "2"

    } else if (uf_ == "AM") {

      return "3"

    } else if (uf_ == "AP") {

      return "4"

    } else if (uf_ == "BA") {

      return "5"

    } else if (uf_ == "CE") {

      return "6"

    } else if (uf_ == "DF") {

      return "7"

    } else if (uf_ == "ES") {

      return "8"

    } else if (uf_ == "GO") {

      return "9"

    } else if (uf_ == "MA") {

      return "10"

    } else if (uf_ == "MG") {

      return "11"

    } else if (uf_ == "MS") {

      return "12"

    } else if (uf_ == "MT") {

      return "13"

    } else if (uf_ == "PA") {

      return "14"

    } else if (uf_ == "PB") {

      return "15"

    } else if (uf_ == "PE") {

      return "16"

    } else if (uf_ == "PI") {

      return "17"

    } else if (uf_ == "PR") {

      return "18"

    } else if (uf_ == "RJ") {

      return "19"

    } else if (uf_ == "RN") {

      return "20"

    } else if (uf_ == "RO") {

      return "21"

    } else if (uf_ == "RR") {

      return "22"

    } else if (uf_ == "RS") {

      return "23"

    } else if (uf_ == "SC") {

      return "24"

    } else if (uf_ == "SE") {

      return "25"

    } else if (uf_ == "SP") {

      return "26"

    } else if (uf_ == "TO") {

      return "27"

    }

  }

}
