import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const score = searchParams.get('score') || '0';

  return new ImageResponse(
    (
      <div style={{
        fontSize: 50,
        color: 'white',
        background: '#000',
        width: '100%',
        height: '100%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1>🪙 Coin Catcher</h1>
        <p>Skor kamu: {score}</p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
