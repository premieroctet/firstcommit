import type { Metadata } from 'next';

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
      title: `First commit of ${repository}`,
      description: 'Fetch the first commit of any repository on GitHub.',
      images: [`/og?repository=${repository}&commit=${commit}`],
    },
  }
}

export default function Home() {
  return (
    <Search />
  )
}
