"use client";

import dict from '@/dictionaries/ru/dates/dates.json';
import dictUnsubscribe from '@/dictionaries/ru/dates/unsubscribe.json';
import getQuery from "@/helpers/search-params.js";
import Image from 'next/image';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function Nav({ hasSubscriptionStart }) {
    const router = useRouter();
    const [hasSubscription, setHasSubscription] = useState(hasSubscriptionStart);

    const searchParams = useSearchParams();

    useEffect(() => {
        let timerId = setInterval(async () => {
            const res = await fetch("/api/dates/subscribe/exist?person_id=83");
    
            if (res.ok) {
                const obj = await res.json();
                if (obj.exist !== hasSubscription) {
                    setHasSubscription(obj.exist);
                    if (obj.exist) {
                        router.push(
                            "/dates/subscribe" + getQuery(searchParams)
                        )
                    } else {
                        router.push(
                            "/dates/unsubscribe" + getQuery(searchParams)
                        )
                    }
                }
            } else {
                throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
            }
            
        }, 2000);
        return () => {
            clearInterval(timerId);
        };
    }, [hasSubscription, router, searchParams]);

    return (
        <div className="nav-list">
            <Link href={"/dates/all" + getQuery(searchParams)} title={dict.nav.all.tooltip}>
                <Image src="/img/dates/list.svg" alt={dict.nav.all.alt} width={56} height={56} />
            </Link>
            <Link href={"/dates/upcoming" + getQuery(searchParams)} title={dict.nav.upcoming.tooltip}>
                <Image src="/img/dates/upcoming.svg" alt={dict.nav.upcoming.alt} width={56} height={56} />
            </Link>
            {(hasSubscription === true) ? (
                <Link href={"/dates/unsubscribe" + getQuery(searchParams)}
                    title={dict.nav.unsubscribe.tooltip}
                    onClick={(event) => {
                        if (!confirm(dictUnsubscribe.confirm_delete)) {
                            event.preventDefault();
                        }
                    }}
                >
                    <Image src="/img/dates/unsubscribe.svg" alt={dict.nav.unsubscribe.alt} width={56} height={56} />
                </Link>
            ) : (
                <Link href={"/dates/subscribe" + getQuery(searchParams)} title={dict.nav.subscription.tooltip}>
                    <Image src="/img/dates/subscription.svg" alt={dict.nav.subscription.alt} width={56} height={56} />
                </Link>
            )}
        </div>
    )
}
