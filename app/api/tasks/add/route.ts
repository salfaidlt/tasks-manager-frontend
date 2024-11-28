import axios from "axios"
import { NextResponse } from "next/server"

export async function POST (req: Request) {
    const token = req.headers.get('Authorization')
    try {
        const url = process.env.BACKEND_API_BASE_URL + "/tasks/add/"
        const res = await axios.post(url, {
            headers: { Authorization: token },
            data: req.json()
        })
        return NextResponse.json({ test: token}, { status: 200 })
    } catch (error) {
        console.error("error : " + error)
    }
}