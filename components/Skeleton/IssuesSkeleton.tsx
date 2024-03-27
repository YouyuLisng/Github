import { Skeleton } from "@/components/ui/skeleton"

export function IssuesSkeleton() {
    return (
        <>
            <div className="py-2 px-3">
                <div className="flex items-center space-x-4 mb-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-[50px]" />
                </div>
                <div className="flex items-center space-x-4">
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[280px]" />
                        <Skeleton className="h-4 w-[240px]" />
                        <Skeleton className="h-4 w-[280px]" />
                    </div>
                </div>
            </div>
        </>
    )
}
