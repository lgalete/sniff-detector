import { User } from './user';

export type Config = {
    email: string;
    password: string;
    workspace: string;
    usersToSniff: Array<User>;
}

