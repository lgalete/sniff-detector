import { Utils } from '@curseduca/csdc-script';
import { config } from 'config';
import { authenticate } from '@/modules';
import { getBrowser } from '@/utils';

const WORKSPACE_URL = `https://${config.workspace}.slack.com`;

async function main() {
    const credentials = await authenticate()

    const { browser, page } = await getBrowser(credentials.cookies)

    await page.goto(WORKSPACE_URL);
    await Utils.delay(100000);
}

main();

