import { NextResponse } from "next/server";
import axios, { isAxiosError } from "axios";

interface ErrorResponse {
    message: string;
}

export async function POST(req: Request) {
    const body = await req.json();
    console.log('====================================');
    console.log("request");
    console.log(req);
    console.log("end request");
    console.log('====================================');
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", body);
        console.log('====================================');
        console.log("response");
        console.log(res);
        console.log("end response");
        console.log('====================================');
        return NextResponse.json(res.data);
    } catch (err: unknown) {
        if (err instanceof Error) {
            // If the error is an instance of Error, you can handle it here
            console.log('====================================');
            console.log('err instanceof Error');
            console.log(err);
            console.log('end err instanceof Error');
            console.log('====================================');
            return NextResponse.json(
                { message: err.message || "Error occurred" },
                { status: 401 }
            );
        } else if (isAxiosError(err)) {
            // Now we can assert that `err` is an AxiosError
            const errorResponse = err.response?.data as ErrorResponse;
            console.log('====================================');
            console.log('errorResponse');
            console.log(errorResponse);
            console.log('end errorResponse');
            console.log('====================================');
            return NextResponse.json(
                { message: errorResponse.message || "Error occurred" },
                { status: 401 }
            );
        } else {
            // Handle other types of errors
            return NextResponse.json(
                { message: "An unknown error occurred" },
                { status: 500 }
            );
        }
    }
}