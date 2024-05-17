import { Cookie } from 'puppeteer';

export type Credentials = {
    cookies: Cookie[];
    cookieString: string;
};
