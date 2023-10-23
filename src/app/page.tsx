import type { Metadata, ResolvingMetadata } from 'next'

import Search from '@/components/Search';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const repository = searchParams.repository as string;
  const commit = searchParams.commit as string;

  return {
    openGraph: {
      images: [`https://opengraph.githubassets.com/firstcommit/${repository}/commit/${commit}`],
    },
  }
}


export default function Home() {
  return (
    <Search />
  )
}
