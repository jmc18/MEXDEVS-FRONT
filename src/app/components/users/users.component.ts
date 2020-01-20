import { Component, OnInit } from '@angular/core';
import {  NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { DetailUser } from '../../models/detail-user.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  titleModal: string;
  titleButton: string;
  typeSubmit: number;

  //Form Register
  userForm: FormGroup;
  submitted = false;
  modal : NgbModalRef;


 

  constructor(private userService: UsersService, private router: Router, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.getAllUsers();
    this.userService.getCountries();
    this.userForm = this.formBuilder.group({
      ID: ['0'],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      Country: ['', Validators.required],
      State: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  showFormModal(opc: number, ID: number, content){
    switch (opc){
      case 1:
        this.titleModal = "New User";
        this.titleButton = 'Register';
        this.typeSubmit = 1;
      break;
      case 2:
        this.titleModal = "Edit User";
        this.titleButton = 'Update';
        this.typeSubmit = 2;
        this.userService.getUser(ID, 2)
        .subscribe((response: DetailUser) => {
          this.userForm = this.formBuilder.group({
            ID: [response.ID],
            FirstName: [response.FirstName, Validators.required],
            LastName: [response.LastName, Validators.required],
            Address: [response.Address, Validators.required],
            Country: [response.Country, Validators.required],
            State: [response.State, Validators.required],
            Email: [response.Email, [Validators.required, Validators.email]],
            Password: [response.Password, [Validators.required, Validators.minLength(6)]],
        });
        });
      break;
    }
    this.modal = this.modalService.open(content, { centered: true, backdropClass: 'light-blue-backdrop', size: 'lg'  });
  }

  deleteUser(ID: number){
    this.userService.deleteUserApi(ID);
  }

  viewUserDetail(ID: number){
    this.router.navigate(['/user-detail', ID]);
  }

      get f() { return this.userForm.controls; }

      onSubmit() {
          this.submitted = true;
          if (this.userForm.invalid) {
              return;
          }

          if(this.typeSubmit == 1){
            this.userService.insertUser(this.userForm.value);
            this.closeModal();
          } else {
            this.userService.updateUser(this.userForm.value);
            this.closeModal();
          }
      }
  
      onReset() {
          this.submitted = false;
          this.userForm.reset();
      }
      
      closeModal(){
        this.modal.close();
        this.onReset();
      }

}
