import { config } from 'config';
import { IO, Utils } from '@curseduca/csdc-script';
import { getBrowser } from '@/utils';
import { Credentials } from '@/types';

const AUTH_URL = `https://${config.workspace}.slack.com/sign_in_with_password`;

export async function authenticate(): Promise<Credentials> {
    Utils.log.info('Authenticating in Slack');

    if (await IO.exists('./data/cache/credentials.json')) {
        Utils.log.success('Authenticated using cached credentials');
        return await IO.read('./data/cache/credentials.json');
    }

    const { browser, page } = await getBrowser();

    Utils.log.debug(`Navigating to Slack login page`);
    await page.goto(AUTH_URL);
    await page.waitForSelector('#signin_form', { visible: true });

    const initialCookies = await page.cookies();

    Utils.log.debug('Filling login form');
    await page.type('#email', config.email);
    await page.type('#password', config.password);

    await page.waitForSelector('#signin_btn', { visible: true });
    await Utils.delay(1000);

    await page.click('#signin_btn');
    await Utils.delay(10000);

    const finalCookies = await page.cookies();

    const cookies = [...initialCookies, ...finalCookies];

    const credentials = {
        cookies,
        cookieString: cookies
            .map(({ name, value }) => `${name}=${value}`)
            .join('; ')
    };

    await browser.close();

    await IO.write('./data/cache/credentials.json', credentials);

    Utils.log.success(
        `Successfully authenticated in ${config.workspace}'s workspace`
    );

    return credentials;
}
