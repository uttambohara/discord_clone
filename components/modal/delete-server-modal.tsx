import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteServerModal() {
  const { isOpen, openModal, onClose, data, onOpen } = useModal();
  const router = useRouter();

  async function handleDeleteServer() {
    try {
      await axios.delete(`/api/server/${data?.id}`);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  // Open and close state
  const isCurrentlyOpen = isOpen && openModal === "deleteServer";

  function handleClose() {
    onClose();
  }

  return (
    <AlertDialog open={isCurrentlyOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the server{" "}
            <span className="text-xs uppercase tracking-widest text-red-700">
              {data?.name}{" "}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteServer}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
