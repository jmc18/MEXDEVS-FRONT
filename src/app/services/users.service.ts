import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { DetailUser } from '../models/detail-user.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly rootURL = 'https://localhost:44358/api';
  

  constructor(private http: HttpClient) { }


  getAllUsers() {
    return this.http.get(`${this.rootURL}/Users/GetAllUsers`);
  }

  getUser(ID: number, opc: number) {
    return this.http.get(`${this.rootURL}/Users/GetUser/${ID}/${opc}`);
  }

  deleteUserApi(ID: number) {
    return this.http.delete(`${this.rootURL}/Users/DeleteUser/${ID}`);
  }

  insertUser(data: User) {
    return this.http.post(`${this.rootURL}/Users/CreateUser`, data);
  }

  updateUser(data: User) {
    return this.http.put(`${this.rootURL}/Users/UpdateUser`, data);
  }

  getCountries(){
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }

  getNameCountry(code: string) {
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${ code }`);
  }

}
