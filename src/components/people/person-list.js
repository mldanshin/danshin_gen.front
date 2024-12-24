"use client";

import dict from "@/dictionaries/ru/people/people.json";
import Person from "./person";

export default function PersonList({ people }) {
    let list = [];
    if (people) {
        list = people.map(item => 
            <li className="people-person-links" key={Math.random()}>
                <Person person={item} />
            </li>
        );
    }

    return (
        <>
        {(list.length > 0) ? (
            <div className="people-list">
                <ul>
                    {list}
                </ul>
            </div>
        ) : (
            <div>
                {dict.list.not_found}
            </div>
        )}
        </>
    )
}
