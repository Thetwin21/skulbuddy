import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      include: { uploadedBy: true },
    });
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, fileUrl } = await req.json();

  try {
    const material = await prisma.material.create({
      data: {
        title,
        description,
        fileUrl,
        uploadedById: userId,
      },
    });
    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload material' },
      { status: 500 }
    );
  }
}