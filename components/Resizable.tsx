"use client"
import React, { useState, useEffect } from 'react';

import Category from "./Category"
import { FaNodeJs, FaReact, FaVuejs, FaAngular } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RepoList } from './RepoList/RepoList';


export function Resizable() {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-[_2fr,_8fr]'>
                <div className="bg-cyan-700 rounded-s-xl hidden md:block">
                    <div className="grid grid-cols-1 gap-3 p-6 fixed">
                        <Category Icon={<FaReact className="w-4 h-4 me-2" />} label={"React JS"} />
                        <Category Icon={<FaVuejs className="w-4 h-4 me-2" />} label={"Vue JS"} />
                        <Category Icon={<FaAngular className="w-4 h-4 me-2" />} label={"Angular JS"} />
                        <Category Icon={<FaNodeJs className="w-4 h-4 me-2" />} label={"Node JS"} />
                        <Category Icon={<TbBrandNextjs className="w-4 h-4 me-2" />} label={"Next JS"} />
                    </div>
                </div>
                <RepoList />
            </div>
        </>
    )
}
