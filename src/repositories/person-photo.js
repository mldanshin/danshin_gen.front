import { notFound } from 'next/navigation';

/**
 * 
 * @param {int} personId 
 * @returns 
 */
export default async function getPhotoListByPerson(personId) {
    const res = await fetch(process.env.API_URL + '/api/person-photo/' + personId, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        return res.json();
    } else if (res.status === 404) {
        notFound();
    } else {
        throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
    }
}