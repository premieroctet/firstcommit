import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const commit = searchParams.get('commit');
    const repository = searchParams.get('repository');

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    background: '#f6f6f6',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img src={`https://opengraph.githubassets.com/firstcommit/${repository}/commit/${commit}`} />
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}