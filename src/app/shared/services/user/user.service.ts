import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfoInterface} from "./user-info.interface";

const API_URL = 'https://auth.thuisapp.info';

//
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient) {
  }

  public getUserInfo(): Observable<UserInfoInterface> {
    return this.http.get<UserInfoInterface>(`${API_URL}/userinfo`,
      {
        responseType: 'json'
      }
    );
  }
}

