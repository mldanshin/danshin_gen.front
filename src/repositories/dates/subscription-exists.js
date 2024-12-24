/**
 * 
 * @param {int} personId 
 * @returns 
 */
export default async function existsSubscription(personId) {
    const url = process.env.API_URL + '/api/dates/subscription/exists/' + personId;

    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        return res;
    } else {
        throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
    }
}
