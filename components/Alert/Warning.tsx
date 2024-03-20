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
        <AlertDialog defaultOpen={true}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>此頁面暫時不開放！</AlertDialogTitle>
                        <AlertDialogDescription>
                            若要了解詳情，請聯繫客服人員
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction>關閉</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
    )
}
