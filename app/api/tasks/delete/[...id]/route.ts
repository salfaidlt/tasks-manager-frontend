import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE (req: Request) {
    try {
        const token = req.headers.get('Authorization')
        const taskId = req.headers.get('taskId')
        const url = `${process.env.BACKEND_API_BASE_URL}/tasks/${taskId}`
        const res = await axios.delete(url, {
            headers: { Authorization: token }
        })
        return NextResponse.json((await res).data, { status: 200 })
    } catch (error) {
        console.error(error)
    }
    // return NextResponse.json({id: params.id}, { status: 200 })
}