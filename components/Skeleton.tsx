import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonItem() {
    return (
        <div className="border-b">
            <div className="py-2 px-3">
                <div className="flex items-center space-x-4 mb-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-[50px]" />
                </div>
                <div className="flex items-center space-x-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[350px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}
