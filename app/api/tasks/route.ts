import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const token = req.headers.get('Authorization')
        const url = process.env.BACKEND_API_BASE_URL + "/tasks/"
        const res = await axios.get(url, {
            headers: { Authorization: token }
        })
        return NextResponse.json(res.data, { status: 200 })
    } catch (error) {
        console.error(error)
    }
}