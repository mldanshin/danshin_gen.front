export default async function getDatesAll() {
    const url = process.env.API_URL + '/api/dates';
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
    }
}