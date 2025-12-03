import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;

  localStorageUser: any = null;


  userResponse : any;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.localStorageUser = this.authService.getCurrentUser();

    this.profileForm = this.fb.group({
      firstName: [],
      lastName: [],
      gender: [],
      email: [],
      phone: [],
      address: [],
      countryCode: [],
      userid : []
    });

    this.getOwnerDetails();
  }

  save() {
    console.log(this.userResponse.data[0].userid)
    const userPayload : User = {
      firstname: this.profileForm.value.firstName,
      lastname: this.profileForm.value.lastName,
      countrycode: this.profileForm.value.countryCode,
      mobileno: this.profileForm.value.phone,
      emailid: this.profileForm.value.email,
      userid: this.userResponse.data[0].userid,
      password: '',
      entrytime: null,
      updatetime: null,
      status: null,
      gender : this.profileForm.value.gender
    }
    this.userService.updateUserProfile(userPayload ).toPromise().then((response: any) => {
      console.log("Profile updated successfully:", response);
      // Optionally, show a success message to the user
    }).catch((error: any) => {
      console.error("Error updating profile:", error);
      // Optionally, show an error message to the user
    });
  }

  cancel() {
    this.profileForm.reset({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      countryCode: '',
      userid : ''
    });
  }


  async getOwnerDetails() {
    const userid = this.localStorageUser ? this.localStorageUser.userid : null;
this.userResponse = await this.userService.getUserById(userid)


    const user = this.userResponse.data;

    if (user.length > 0) {
      this.profileForm.patchValue({
        firstName: user[0].firstname,
        lastName: user[0].lastname,
        gender: user[0].gender,
        email: user[0].emailid,
        phone: user[0].mobileno,
        address: user[0].address || '',
        countryCode: user[0].countrycode,
        userId: user[0].userid
      });
    }

  }
}
