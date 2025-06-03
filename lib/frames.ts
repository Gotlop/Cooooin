import { NeynarAPIClient } from '@neynar/nodejs-sdk';
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY!;
export const neynar = new NeynarAPIClient(NEYNAR_API_KEY);

export async function getFIDFromRequest(req: any) {
  const { trustedData } = req.body;
  const result = await neynar.validateFrameActionSignature(trustedData.messageBytes);
  return result?.action?.interactor?.fid || null;
}

export function buildFrameResponse({ imageUrl, buttons }: {
  imageUrl: string,
  buttons: { label: string; action: string; target: string }[],
}) {
  return {
    image: imageUrl,
    buttons,
    postUrl: '/api/frame',
  };
}
