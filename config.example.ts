import { Config } from '@/types';

export const config: Config = {
    email: 'user@example.com',
    password: '123456',
    workspace: 'myworkspace', // Full URL would be https://myworkspace.slack.com/
    usersToSniff: [
        {
            id: 'D04CMFB2AZ1',
            name: 'Mr. Coworker'
        }
    ],
}

