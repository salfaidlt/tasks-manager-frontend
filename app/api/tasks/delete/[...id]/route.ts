import axios from "axios";
import { NextResponse } from "next/server";

export async function GET (req: Request, {params}: { params: { id: string } }) {
    try {
        const url = `${process.env.BACKEND_API_BASE_URL}/tasks/${params.id}`
        const res = axios.delete(url, {
            headers: { Authorization: }
        })
    } catch (error) {
        console.error(error)
    }
    console.log('====================================');
    console.log(req);
    console.log('====================================');
    return NextResponse.json({id: params.id}, { status: 200 })
}