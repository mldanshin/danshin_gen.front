/**
 * 
 * @param {string} order 
 * @param {string} search 
 * @returns 
 */
export default async function getPeople(order, search) {

    const res = await fetch(process.env.API_URL + '/api/people' + getRequest(order, search), {
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

function getRequest(order, search) {
    let str = "";

    if (order || search) {
        str += "?";
    }

    if (order) {
        str += "order=" + order;
    }

    if (order && search) {
        str += "&";
    }

    if (search) {
        str += "search=" + search;
    }

    return str;
}
