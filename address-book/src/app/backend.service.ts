import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  constructor( private http: HttpClient ) { }

  getData() {
    return this.http.get('http://localhost:3000/get-data');
  }

  postData(x) {
    return this.http.post('http://localhost:3000/post-data', x);
  }

  updateData(id, x) {
    console.log(x)
    return this.http.post('http://localhost:3000/update-data/' + id, x);
  }

  deleteData(id) {
    return this.http.post('http://localhost:3000/delete', id);
  }
}
