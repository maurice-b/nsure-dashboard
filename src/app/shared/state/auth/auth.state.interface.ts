import {TokenInterface} from '../../services/token-storage/token.interface';

export interface AuthStateInterface {
  isAuthenticated: boolean;
  retryAttempts: number;
  token: TokenInterface;
}
