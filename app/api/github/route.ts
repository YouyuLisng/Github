import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const { client_id, client_secret, code } = body;

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ client_id, client_secret, code })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error fetching access token:', error);
        return NextResponse.error();
    }
}
