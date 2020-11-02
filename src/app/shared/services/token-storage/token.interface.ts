import {DateTime} from 'luxon';

export interface TokenInterface {
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    token_type: string; // Bearer

    requestedDateTime?: number; // milliseconds
}
