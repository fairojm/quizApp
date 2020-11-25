import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiStorageService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) { }

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name // tslint:disable-next-line: ban-types
  getQuizQuestion(category_id: Number): Observable<any> {
    const params = new HttpParams().set('category', String(category_id));
    // headersParam = headersParam.set('amount', '10').set('category', String(category_id));
    return this._http.get(apiUrl + 'api.php?amount=10', {params});
  }

}
