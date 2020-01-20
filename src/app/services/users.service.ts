import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ListUsers} from '../models/list-users.model';


import Swal from 'sweetalert2';



import { DetailUser } from '../models/detail-user.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly rootURL = 'https://localhost:44358/api';
  fromDataList: ListUsers[];
  fromDataUser: DetailUser;
  fromCountriesList: any[] = [];
  countriesList: any[];
  ArrCountries: any[];

  constructor(private http: HttpClient) { }


  getAllUsers() {
    this.http.get(`${this.rootURL}/Users/GetAllUsers`).subscribe(
      (response: ListUsers[]) => {
        this.fromDataList = response;
      },
      error => console.log(error)
    );
  }

  getUser(ID: number, opc: number){
    return this.http.get(`${this.rootURL}/Users/GetUser/${ID}/${opc}`);
  }

  deleteUserApi(ID: number){
    Swal.fire({
      title: 'Are you sure to delete the user?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
      if (result.value) {
        this.http.delete(`${this.rootURL}/Users/DeleteUser/${ID}`).subscribe(
          response => {
            this.getAllUsers();
          Swal.fire(
            'Deleted!',
            'The user was successfully deleted',
            'success'
          );
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong when deleting the user',
            });
          }
        );
      }
    });
  }

  getCountries(){
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(
      (res: any[]) => {
        this.ArrCountries = res;
      },

    );
  }

  insertUser(data: User){

    this.http.post(`${this.rootURL}/Users/CreateUser`, data).subscribe(
      response => {
        this.getAllUsers();
          Swal.fire(
            'The user has been successfully registered!',
            'success'
          );
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong when registering the user',
        });
      }
    );
  }

  updateUser(data: User){
    this.http.put(`${this.rootURL}/Users/UpdateUser`, data).subscribe(
      response => {
        this.getAllUsers();
          Swal.fire(
            'The user has been successfully updated!',
            'success'
          );
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong when updated the user',
        });
      }
    );

    /*AXIOS.put(`${this.rootURL}/Users/UpdateUser`, data)
        .then(data => {
          this.getAllUsers();
          Swal.fire(
            'The user has been successfully updated!',
            'success'
          );
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong when updated the user',
          });
        });*/
  }

  getNameCountry(code: string) {
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${ code }`);
  }

}
