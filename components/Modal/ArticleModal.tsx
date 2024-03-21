import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
interface ArticleModalProps {
    isOpen: boolean;
}

export function ArticleModal({
    isOpen
}: ArticleModalProps) {
    return (
        <Dialog defaultOpen={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>ArticleModal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    ArticleModal
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
