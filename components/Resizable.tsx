"use client"
import React, { useState, useEffect } from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Category from "./Category"
import Avatar from "./Avatar";
import Loader from './Loader';

import { IoCodeSlashOutline } from "react-icons/io5";
import { FaNodeJs, FaReact, FaVuejs, FaAngular } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";

import fetchPublicRepositories from '@/app/actions/fetchRepos'
import { format } from 'date-fns';

interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    };
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    score: number;
}


export function Resizable() {
    const [error, setError] = useState<string | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('useEffect')
        loadRepos();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadRepos = async () => {
        if (loading) return;
            setLoading(true);
            const newRepos = await fetchPublicRepositories(repos.length / 10 + 1);
        if (newRepos) {
            setRepos(prevRepos => [...prevRepos, ...newRepos]);
        }
        setLoading(false); 
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd');
    };
    
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight
        ) return;
        loadRepos();
    };

    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[100vh] w-full max-w-4xl rounded-lg"
            >
                <ResizablePanel className="bg-cyan-700" defaultSize={25}>
                    <div className="grid grid-cols-1 gap-3 p-6 fixed">
                        <Category Icon={<FaReact className="w-4 h-4 me-2" />} label={"React JS"} />
                        <Category Icon={<FaVuejs className="w-4 h-4 me-2" />} label={"Vue JS"} />
                        <Category Icon={<FaAngular className="w-4 h-4 me-2" />} label={"Angular JS"} />
                        <Category Icon={<FaNodeJs className="w-4 h-4 me-2" />} label={"Node JS"} />
                        <Category Icon={<TbBrandNextjs className="w-4 h-4 me-2" />} label={"Next JS"} />
                    </div>
                </ResizablePanel>
                {/* <ResizableHandle disabled withHandle /> */}
                <ResizablePanel defaultSize={75}>
                    <div className="grid grid-cols-1 gap-3 p-4 bg-white">
                        {repos.map((repo: Repository, index: number) => (
                            <article className="border-b" key={index}>
                                <div className="py-2 px-3">
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center'>
                                            <Avatar src={repo.owner.avatar_url} />
                                            <p className="px-2 text-sm text-zinc-500">{repo.owner.login}</p>
                                        </div>
                                        <div>
                                            <p className='text-sm'>{formatDate(repo.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className="py-3">
                                        <p className="text-xl mb-2">{repo.name}</p>
                                        <p className="text-sm text-zinc-500 truncate">{repo.description}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <IoCodeSlashOutline className='w-5 h-5 me-2 text-red-500' />
                                        {repo.topics.length > 0 ? (
                                            repo.topics.slice(0, 3).map((topic: string, index: number) => (
                                                <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                    {topic}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                Null
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                        {loading && <Loader />}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}
