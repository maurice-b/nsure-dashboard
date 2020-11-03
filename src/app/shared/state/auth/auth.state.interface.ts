import {TokenInterface} from '../../services/token-storage/token.interface';
import {UserInfoInterface} from '@app-shared/services/user/user-info.interface';

export interface AuthStateInterface {
  isAuthenticated: boolean;
  retryAttempts: number;
  token: TokenInterface;
  userInfo: UserInfoInterface | undefined;
}
