"use server";

import dict from '@/dictionaries/ru/person/person.json';
import getPhotoListByPerson from "@/repositories/person-photo.js";
import PhotoItem from "@/components/person/photo-item.js";

export default async function PhotoList({ personId }) {
    const photo = await getPhotoListByPerson(personId)

    return (
        <div className="person-photo-container">
            <div>{dict.photo.label}</div>
            {Object.keys(photo).length !== 0 ? (
                <ul className="person-photo-list">
                    {photo.map(item => <li key={Math.random()}>
                        <PhotoItem personId={personId} fileName={item.fileName} date={item.date} />
                    </li>)}
                </ul>
            ) : (
            <div>{dict.photo.not_found}</div>
        )}
        </div>
    )
}