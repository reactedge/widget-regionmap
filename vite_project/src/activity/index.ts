import { isActivityEnabled } from './activity.guard';

type Level = 'info' | 'warn' | 'error';

export function activity(
    phase: string,
    message: string,
    data?: unknown,
    level: Level = 'info'
) {
    if (!isActivityEnabled()) return;

    const payload = {
        widget: 'regionmap',
        phase,
        message,
        data,
        ts: Date.now(),
    };

    const prefix = `[RE:contact] [${phase}]`;

    if (level === 'error') {
        console.error(prefix, payload);
    } else if (level === 'warn') {
        console.warn(prefix, payload);
    } else {
        console.log(prefix, payload);
    }
}
