"use server";

import { convertDateToStringISO8601 } from '@/helpers/date';
import dict from "@/dictionaries/ru/dates/dates.json";
import getDatesAll from "@/repositories/dates/all.js";
import Person from './person.js';

export default async function DatesAll() {
    const dates = await getDatesAll();

    return (
        <div className="dates-container">
            <h2>{dict.title.all}</h2>
            {(dates != null & dates.length > 0) ? (
                <ul>
                    {dates.map(item => 
                        <li className="dates-li" key={Math.random()}>
                            <span>{convertDateToStringISO8601(item.date)}</span>
                            <span> </span>
                            {item.type == 1 && (<span>{dict.birth.name}</span>)}
                            {item.type == 2 && (<span>{dict.death.name}</span>)}
                            <span> </span>
                            <Person person={item.person} />
                        </li>
                    )}
                </ul>
                ) : (
                <div>{dict.not_found}</div>
            )}
        </div>
    )
}