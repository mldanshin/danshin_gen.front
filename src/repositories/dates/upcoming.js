import config from "@/config/dates.json";

export default async function getDatesUpcoming() {
    const url = process.env.API_URL + '/api/dates/upcoming' + getParams();
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

function getParams() {
    return "?date=" + getDate()
        + "&past_day=" + config.past_day
        + "&nearest_day=" + config.nearest_day;
}

function getDate() {
    let now = new Date();
    const year = now.getFullYear();

    let month = String(now.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }

    let day = String(now.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}
