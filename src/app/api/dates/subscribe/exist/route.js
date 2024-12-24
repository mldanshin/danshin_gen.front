import existsSubscription from "@/repositories/dates/subscription-exists.js";

export async function GET(request) {
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");

    const res = await existsSubscription(personId);

    return new Response(res.body, {
        status: 200,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
}
