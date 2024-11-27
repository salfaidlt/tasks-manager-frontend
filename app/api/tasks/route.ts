import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const token = req.headers.get('authorization')

    try {
        const url = process.env.BACKEND_API_BASE_URL + "/tasks/"
        const res = await axios.get(url, {
            headers: { Authorization: token }
        })
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        return NextResponse.json(res.data)
    } catch (error) {
        console.error("Failed to fetch tasks", error);
    }

    return NextResponse.json({ token })
}