import { NextResponse } from "next/server";

// 创建一个全局变量来保存 access token
let accessToken: string;

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

        // 将 access token 存储在服务器端的内存中
        accessToken = data.access_token;

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error fetching access token:', error);
        return NextResponse.error();
    }
}

// 创建一个额外的 API 端点来获取 access token
export function GETAccessToken(
    request: Request
) {
    try {
        if (!accessToken) {
            throw new Error('Access token not available');
        }

        return NextResponse.json({ access_token: accessToken }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving access token:', error);
        return NextResponse.error();
    }
}
