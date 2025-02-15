"use client";

import dict from "@/dictionaries/ru/tree/tree.json";

export default function Help() {
    return (
        <>
        {
            dict.help.map((item) => (
                <div key={Math.random()}>
                    <div>{item.value}</div>
                    <div>{item.description}</div>
                </div>
            ))
        }
        </>
    )
}
