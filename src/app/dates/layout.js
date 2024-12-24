"use server";

import existsSubscription from "@/repositories/dates/subscription-exists.js";
import Nav from "@/components/dates/nav.js";
import { Suspense } from 'react';

export default async function Dates({ children }) {
    const res = await existsSubscription(83);
    const obj = await res.json();

    return (
        <div>
            <Suspense>
                <Nav hasSubscriptionStart={obj.exist} />
                {children}
            </Suspense>
        </div>
    )
}
