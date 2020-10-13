import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }


  registerCompany(name_: string, document_: string, uf_: number): Observable<any> {

    return this.http.post("http://localhost:4200/api/entities", {

      type: "company",
      name: name_,
      cnpj: document_,
      is_legal_person: "1",
      uf: uf_

    })

  }

  registerLegalProvider(name_: string, document_: string, email_: string, isLegalPerson: boolean): Observable<any> {

    return this.http.post("http://localhost:4200/api/entities", {

      type: "provider",
      name: name_,
      doc: document_,
      is_legal_person: "1",
      birthday: "2000-12-31"

    })

  }

  registerNaturalProvider(name_: string, document_: string, email_: string, isLegalPerson: boolean, birthday_: string): Observable<any> {

    return this.http.post("http://localhost:4200/api/entities", {

      type: "provider",
      name: name_,
      doc: document_,
      is_legal_person: "0",
      birthday: birthday_

    })

  }

  getEntityById(id_: string, type_: string): Observable<any> {

    return this.http.get("http://localhost:4200/api/entities/" + type_ + "/" + id_);

  }

  getEntities(): Observable<any> {

    return this.http.get("http://localhost:4200/api/entities");

  }

  updateEntity(entity_): Observable<any> {

    return this.http.put("http://localhost:4200/api/entities", entity_);

  }

  deleteEntity(entity_): Observable<any> {

    return this.http.delete("http://localhost:4200/api/entities?id=" + entity_.id + "&type=" + entity_.type);

  }
}
