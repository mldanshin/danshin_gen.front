"use server";

import dict from '@/dictionaries/ru/person/person.json';
import Link from 'next/link';
import { convertDateToString } from '@/helpers/date';
import { convertIntervalToString } from '@/helpers/date';
import PersonShort from './person-short';
import { Suspense } from 'react';

export default async function Person({ person }) {
    return (
        <div className="person-card">
            {person.isUnavailable ? (
                <>
                <div>{dict.unavailable.label}</div>
                <div>{dict.unavailable.content}</div>
                </>
            ) : (
                <>
                <div>{dict.live.label}</div>
                {person.isLive ? (<div>{dict.live.yes}</div>) : (<div>{dict.live.no}</div>)}
                </>
            )}

            <div>{dict.gender.label}</div>
            <div>{dict.gender.types[person.gender]}</div>

            <div>{dict.surname.label}</div>
            <div>{person.surname ? person.surname : dict.surname.unknown}</div>

            {person.oldSurname && (
            <>
            <div>{dict.old_surname.label}</div>
            <div>
                {person.oldSurname.map(oldSurname => <div key={Math.random()}>{oldSurname}</div>)}
            </div>
            </>
            )}

            <div>{dict.name.label}</div>
            <div>{person.name ? person.name : dict.name.unknown}</div>

            <div>{dict.patronymic.label}</div>
            <div>
                {person.patronymic
                    ? person.patronymic
                    : (person.patronymic === "" ? "" : dict.patronymic.unknown)
                }
            </div>

            <div>{dict.birth_date.label}</div>
            <div>
                {convertDateToString(person.birthDate)}
                {person.isLive && person.age && (
                    <>
                    {" (" + convertIntervalToString(person.age) + ")"}
                    </>
                )}
            </div>

            <div>{dict.birth_place.label}</div>
            <div>{person.birthPlace}</div>

            {(!person.isLive) && (
                <>
                <div>{dict.death_date.label}</div>
                <div>
                    <span>{convertDateToString(person.deathDate)}</span>
                    <span>
                        {(person.deathDateInterval || person.age) && (
                            <>{"("}</>
                        )}
                        {person.deathDateInterval && (
                            <>
                            {convertIntervalToString(person.deathDateInterval) + " " + dict.death_date.interval.past}
                            </>
                        )}
                        {(person.deathDateInterval && person.age) && (
                            <>{" "}</>
                        )}
                        {person.age && (
                            <>
                            {dict.death_date.interval.age + " " + convertIntervalToString(person.age)}
                            </>
                        )}
                        {(person.deathDateInterval || person.age) && (
                            <>{")"}</>
                        )}
                    </span>
                </div>
                <div>{dict.burial_place.label}</div>
                <div>{person.burialPlace}</div>
                </>
            )}

            {person.note && (
                <>
                <div>{dict.note.label}</div>
                <div>{person.note}</div>
                </>
            )}

            {person.activities && (
                <>
                <div>{dict.activities.label}</div>
                <div>
                    {person.activities.map(activitie => <div key={Math.random()}>{activitie}</div>)}
                </div>
                </>
            )}

            {person.emails && (
                <>
                <div>{dict.emails.label}</div>
                <div>
                    {person.emails.map(email => <div key={Math.random()}>{email}</div>)}
                </div>
                </>
            )}

            {person.internet && (
                <>
                <div>{dict.internet.label}</div>
                <div>
                    {person.internet.map(internet => <Link key={Math.random()} href={internet.url} title={internet.url} target="_blank" rel="noopener noreferrer">{internet.name}</Link>)}
                </div>
                </>
            )}

            {person.phones && (
                <>
                <div>{dict.phones.label}</div>
                <div>
                    {person.phones.map(phone => <div key={Math.random()}>{phone}</div>)}
                </div>
                </>
            )}

            {person.residences && (
                <>
                <div>{dict.residences.label}</div>
                <div>
                    {person.residences.map(residence => <div key={Math.random()}>
                        <span>{residence.name}</span>
                        <span> </span>
                        {residence.date && (<span>{"(" + dict.residences.date + " " + convertDateToString(residence.date) + ")"}</span>)}
                    </div>)}
                </div>
                </>
            )}

            {person.parents && (
                <>
                <div>{dict.parents.label}</div>
                <ul className="person-card-list">
                    {person.parents.map(parent => <li key={Math.random()} className="person-card-cell-list">
                        <div>{dict.parents.roles[parent.role]}</div>
                        <Suspense>
                            <PersonShort person={parent.person} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}

            {person.marriages && (
                <>
                <div>{dict.marriages.label}</div>
                <ul className="person-card-list">
                    {person.marriages.map(marriage => <li className="person-card-cell-list" key={Math.random()}>
                        <div>{dict.marriages.roles[marriage.role]}</div>
                        <Suspense>
                            <PersonShort person={marriage.soulmate} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}

            {person.children && (
                <>
                <div>{dict.children.label}</div>
                <ul className="person-card-list">
                    {person.children.map(child => <li key={Math.random()} className="person-card-cell-list-2">
                        <Suspense>
                            <PersonShort person={child} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}

            {person.brothersSisters && (
                <>
                <div>{dict.brothers_sisters.label}</div>
                <ul className="person-card-list">
                    {person.brothersSisters.map(person => <li key={Math.random()} className="person-card-cell-list-2">
                        <Suspense>
                            <PersonShort person={person} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}
        </div>
    )
}