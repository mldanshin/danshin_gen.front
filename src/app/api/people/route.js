import getPeople from "@/repositories/people.js";

export async function GET(request) {
    const url = new URL(request.url);
    const order = url.searchParams.get("people_order");
    const search = url.searchParams.get("people_search");

    const people = await getPeople(order, search);

    return new Response(people.body, {
        status: 200,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
}