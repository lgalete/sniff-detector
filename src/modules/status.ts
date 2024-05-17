import { Page } from 'puppeteer';
import { UserStatus } from '@/types';

export async function checkUserStatus(page: Page, userId: string): Promise<UserStatus | null> {
    const userStatus = await page.evaluate((userId, UserStatus) => {
        const userEl = document.querySelector(`.p-channel_sidebar__static_list__item[data-item-key="${userId}"]`);
        const presenceIndicator = userEl.querySelector('*[data-qa="presence_indicator"]');

        const userStatus = presenceIndicator?.getAttribute('title')?.toUpperCase() as string;

        if (!userStatus) {
            return null;
        }

        if (userStatus.includes(UserStatus.Active)) {
            return UserStatus.Active
        }

        if (userStatus.includes(UserStatus.Away)) {
            return UserStatus.Away;
        }
    }, userId, UserStatus);

    return userStatus;
}
