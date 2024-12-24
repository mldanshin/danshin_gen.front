"use server";

import getData from "@/repositories/dates/subscription-data.js";
import existsSubscription from "@/repositories/dates/subscription-exists.js";
import Subscription from "@/components/dates/subscription.js";

export default async function Page() {
    const data = await getData(83);

    async function hasSubscription() {
        const res = await existsSubscription(83);
        const obj = await res.json();
        return obj.exist;
    }

    return (
        <Subscription data={data} hasSubscription={hasSubscription()} />
    )
}
