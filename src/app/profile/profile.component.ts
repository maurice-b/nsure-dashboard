import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../shared/services/token-storage/token-storage.service';
import {TokenInterface} from '../shared/services/token-storage/token.interface';
import {UserInfoInterface} from '../shared/services/user/user-info.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public currentUser: UserInfoInterface | undefined;
  public token: TokenInterface | undefined;

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken();
    this.currentUser = this.tokenStorage.getUserInfo();
  }

}
