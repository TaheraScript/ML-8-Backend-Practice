'use client'
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
const DeleteDestinationDialog = ({id}:{id:string}) => {
    const handleDeleteDestination =async()=>{
        const res = await fetch(`http://localhost:5000/destination/${id}`,{
            method: "DELETE",
        })
        const data = await res.json()
        redirect('/destinations')
    }
    return (
        <AlertDialog>
  <AlertDialogTrigger
  render={
    <Button
      variant="outline"
      className="h-[clamp(20px,3.44vw,44px)] gap-1.5 rounded-[4px] border-red-300 px-[clamp(8px,1.52vw,16px)] text-[clamp(8.5px,1.52vw,18px)] font-medium text-red-500 hover:bg-red-50 hover:text-red-500"
    >
      <Trash2 className="size-[clamp(8px,1.52vw,18px)]" />
      Cancel
    </Button>
  }
/>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteDestination }>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    );
};

export default DeleteDestinationDialog;