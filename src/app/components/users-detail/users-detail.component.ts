import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { DetailUser } from '../../models/detail-user.model';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html'
})
export class UsersDetailComponent implements OnInit {

  fromDataUser: DetailUser;
  nameCountry: any[];
  constructor(private userService: UsersService, private activateRouter: ActivatedRoute, private router: Router) {
    
   }

   ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      this.userService.getUser(params['id'], 1)
      .subscribe((response: DetailUser) => {
        this.fromDataUser = response;
        this.userService.getNameCountry(response.Country)
        .subscribe((res: any[]) => {
          this.nameCountry = res;
        });
      });
    });
   }

   returnToList(){
    this.router.navigate(['/list']);
   }


}
