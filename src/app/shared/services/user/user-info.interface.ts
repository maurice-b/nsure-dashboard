import {MetaDataInterface} from "./meta-data.interface";

export interface UserInfoInterface {
    sub: string;
    email_verified: boolean;
    email: string;
    nickname: string;
    picture: string;
    updated_at: number; // micro seconds
    metadata: MetaDataInterface
}
