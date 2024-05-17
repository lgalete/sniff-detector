import { Page } from 'puppeteer';
import { UserStatus, UserStatusMapper } from '@/types';

export async function checkUserStatus(
    page: Page,
    userId: string
): Promise<UserStatus | null> {
    const userStatus = await page.evaluate(
        (userId, UserStatus, UserStatusMapper) => {
            const userEl = document.querySelector(`#${userId}`);

            const presenceIndicator = userEl.querySelector(
                '*[data-qa="presence_indicator"]'
            );

            const userStatus = presenceIndicator
                ?.getAttribute('title')
                ?.toUpperCase() as string;

            if (!userStatus) {
                return null;
            }

            if (UserStatusMapper.Active.includes(userStatus)) {
                return UserStatus.Active;
            }

            if (UserStatusMapper.Away.includes(userStatus)) {
                return UserStatus.Away;
            }
        },
        userId,
        UserStatus,
        UserStatusMapper
    );

    return userStatus;
}
