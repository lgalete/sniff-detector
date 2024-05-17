import { Utils } from '@curseduca/csdc-script';
import { config } from 'config';
import { authenticate, checkUserStatus } from '@/modules';
import { getBrowser } from '@/utils';
import { UserStatus } from '@/types';

const WORKSPACE_URL = `https://${config.workspace}.slack.com`;

async function main() {
    if (!config.usersToSniff?.length) {
        Utils.log.error('No users to sniff. Exiting...');
        process.exit(1);
    }

    if (!config.workspace) {
        Utils.log.error('No workspace provided. Exiting...');
        process.exit(1);
    }

    const credentials = await authenticate()

    const { page } = await getBrowser(credentials.cookies)

    Utils.log.debug('Navigating to workspace');
    await page.goto(WORKSPACE_URL);
    await Utils.delay(10000);

    Utils.log.debug('Clicking on self DM');
    await page.click(`.p-channel_sidebar__channel[data-qa-channel-sidebar-is-you="true"]`)

    const previousStatusMap: Map<string, UserStatus> = new Map();
    
    while (true) {
        for (const user of config.usersToSniff) {
            const previousStatus = previousStatusMap.get(user.id);
            const currentUserStatus = await checkUserStatus(page, user.id);

            if (!currentUserStatus) {
                Utils.log.warning(`Failed to get status for user "${user.name}"`);
                continue;
            }

            if (!previousStatus) {
                Utils.log.info(`User "${user.name}" initial status is ${currentUserStatus}`);
                previousStatusMap.set(user.id, currentUserStatus);

                continue;
            }

            if (previousStatus !== currentUserStatus) {
                Utils.log.info(`User "${user.name}" changed status from ${previousStatus} to ${currentUserStatus}`);
                previousStatusMap.set(user.id, currentUserStatus);
            }
        }

        await Utils.delay(5000);
    }
}

main();

