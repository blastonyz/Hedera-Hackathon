import { NextResponse } from 'next/server';
import { getProjects } from '@/controller/controller';
import { connectDB } from '@/database/db';

export async function GET(request: Request) {
   try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);


    const projects = await getProjects({ page, limit });

    if (!projects || projects.projects.length === 0) {
      return NextResponse.json({ message: 'No projects found' }, { status: 404 });
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }

}