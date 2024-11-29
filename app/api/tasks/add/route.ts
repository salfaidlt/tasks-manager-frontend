import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log('req ====================================');
    const body = await req.json();
    console.log(body);
    console.log('====================================');

    const token = req.headers.get('Authorization');

    if (!token) {
        return NextResponse.json({ error: "Authorization token is missing" }, { status: 401 });
    }

    try {
        const url = `${process.env.BACKEND_API_BASE_URL}/tasks/add/`;
        const res = await axios.post(url, body, {
            headers: { Authorization: token }
        });

        console.log('res ====================================');
        console.log(res.data);
        console.log('====================================');

        return NextResponse.json({ data: res.data }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
    }
}
