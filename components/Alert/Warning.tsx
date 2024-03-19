"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface WarningDialogProps {
    isOpen: boolean;
}

export function WarningDialog({
    isOpen
}: WarningDialogProps) {
    return (
        <AlertDialog open={true}>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>你滑的太快了！</AlertDialogTitle>
                    <AlertDialogDescription>
                        請稍後再繼續瀏覽~~
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
