"use client";

import { parseLinkHeader } from '@/utils/github';
import { Combobox } from '@headlessui/react';
import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { GithubCommit, GithubSearch } from '../../types';
import Commit from './Commit';
import CommitSkeleton from './CommitSkeleton';
import ResultsSkeleton from './ResultsSkeleton';

export default function Search() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const search = searchParams.get('repository') || ''
    const [isSearching, setIsSearching] = useState(false);
    const [isLookingForCommit, setIsLookingForCommit] = useState(false);
    const [repositories, setRepositories] = useState<GithubSearch['items']>([]);
    const [firstCommit, setFirstCommit] = useState<GithubCommit | null>(null);

    const updateQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            router.push(pathname + '?' + params.toString())
        },
        [searchParams]
    )

    const onSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearching(true);
        setFirstCommit(null);
        const repository = event.target.value
        updateQueryString("repository", repository)

        if (!repository) {
            setRepositories([]);
            setIsSearching(false);

            return;
        }

        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${repository}&per_page=3`, {
                headers: {
                    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`

                }
            });
            if (response.ok) {
                const data: GithubSearch = await response.json();
                data.items && setRepositories(data.items.sort((a, b) => b.stargazers_count - a.stargazers_count));
            }
        } catch (e) {
            setRepositories([]);
            setFirstCommit(null);
            console.error(e);
        }

        setIsSearching(false);
    }

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 300)
        , []);

    const onSelectRepository = async (repository: string) => {
        setIsLookingForCommit(true);
        updateQueryString("repository", repository)
        let response = await fetch(`https://api.github.com/repos/${repository}/commits`, {
            headers: {
                Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
            }
        });
        const headerLink = response.headers.get('link');

        if (headerLink) {
            const links = parseLinkHeader(headerLink);
            response = await fetch(links.last, {
                headers: {
                    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
                }
            });
        }

        const commits = await response.json() as GithubCommit[];
        const lastCommit = commits[commits.length - 1];
        setFirstCommit(lastCommit);
        setIsLookingForCommit(false);
    }

    useEffect(() => {
        if (search.length > 0) {
            onSelectRepository(search);
        }
    }, [])

    return <>
        <div className="max-w-[90%] md:max-w-[400px] w-full">
            <Combobox value={search} onChange={onSelectRepository}>
                <Combobox.Input onChange={debouncedOnSearch} className="text-[black] bg-[white] text-left h-[30px] text-2xl box-border w-[inherit] px-5 py-[30px] rounded-[10px] border-[3px] border-solid border-[black]" autoFocus placeholder="Search repositories..." />
                {repositories.length > 0 && !isSearching && <Combobox.Options className="text-[17px] [list-style:none] [border-style:dashed_solid_solid] [border-image:initial] z-[111] relative bg-[white] max-w-full box-border overflow-hidden -mt-2.5 mb-0 mx-0 p-0 rounded-br-[10px] rounded-bl-[10px] border-[3px] border-[black]">
                    {
                        repositories.map((repository) => (
                            <Combobox.Option
                                key={repository.id}
                                value={repository.full_name}
                                className={({ active }) => `w-full box-border bg-[white] text-[black] p-4 cursor-pointer  ${active ? 'bg-slate-200' : ''}`}
                            >
                                {repository.full_name}
                            </Combobox.Option>
                        ))
                    }
                </Combobox.Options>}
                {isSearching && <ResultsSkeleton />}
            </Combobox>
        </div>
        {firstCommit ? <Commit commit={firstCommit} /> : isLookingForCommit && <CommitSkeleton />}
    </>
}
