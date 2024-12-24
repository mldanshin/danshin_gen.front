"use server";

import dict from "@/dictionaries/ru/dates/unsubscribe.json";
import existsSubscription from "@/repositories/dates/subscription-exists.js";
import unsubscribe from "@/repositories/dates/unsubscribe.js";

export default async function Page() {
    async function exists() {
        const res = await existsSubscription(83);
        const obj = await res.json();
        return obj.exist;
    }

    const hasSubscription = exists();
    if (hasSubscription === true) {
        const res = await unsubscribe(83);
        if (res === true) {
            return (
                <div>
                    {dict.ok}
                </div>
            )
        } else {
            return (
                <div>
                    {dict.error}
                </div>
            )
        }
    } else {
        return (
            <div>
                {dict.subscription_not}
            </div>
        )
    }
}
