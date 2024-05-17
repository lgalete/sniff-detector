import { Page } from 'puppeteer';
import { Utils } from '@curseduca/csdc-script';

export async function sendSlackMessage(
    page: Page,
    userId: string,
    text: string
) {
    await page.click(
        `.p-channel_sidebar__channel[data-qa-channel-sidebar-channel-id="${userId}"]`
    );
    await Utils.delay(2000);

    await page.type('.ql-editor', text);
    await Utils.delay(500);

    await page.keyboard.press('Enter');
}
