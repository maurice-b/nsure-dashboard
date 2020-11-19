import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfoInterface} from './user-info.interface';
import {USER_API_URL} from '@app-shared/const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient) {
  }

  public getUserInfo(): Observable<UserInfoInterface> {
    return this.http.get<UserInfoInterface>(`${USER_API_URL}/userinfo`,
      {
        responseType: 'json'
      }
    );
  }
}

