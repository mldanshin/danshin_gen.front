import unsubscribe from "@/repositories/dates/unsubscribe";

export async function DELETE(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const res = await unsubscribe(userId);

    return new Response(res.body, {
        status: 200,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
}
