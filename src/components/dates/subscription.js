"use client";

import dict from "@/dictionaries/ru/dates/subscription.json";
import Image from "next/image";

export default function Subscription({ data, hasSubscription }) {
    function handleClick() {
        navigator.clipboard.writeText(data.code);
    }

    if (hasSubscription === true) {
        return (
            <div>
                <span>{dict.instructions[0]}</span>
                <a href={data.publisherUrl} target="_blank" rel="noopener noreferrer">
                    {dict.instructions[1]}
                </a>
                <span>{dict.instructions[2]}</span>
                <button type="button" title={dict.button_copy.title} onClick={handleClick}>
                    <div>
                        <span>{data.code}</span>
                        <Image src="/img/app/copy.svg" alt={dict.button_copy.alt} width={30} height={30} />
                    </div>
                </button>
                <span>{dict.instructions[3]}</span>
            </div>
        )
    } else {
        return (
            <div>{dict.notification}</div>
        )
    }
}
