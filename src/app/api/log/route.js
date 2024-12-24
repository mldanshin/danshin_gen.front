import write from "@/repositories/log.js";

export async function POST(request) {
    await request.text().then(function(text) { 
        write(request.url + "\n");
        write(text + "\n");
        write("\n");
    });

    return new Response("Ok", {
        status: 200
    });
}
