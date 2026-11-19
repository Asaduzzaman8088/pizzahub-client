import { toast } from "sonner"

export function confirmAction(
  message: string,
  onConfirm: () => void,
  confirmLabel = "Delete"
) {
  toast(message, {
    action: {
      label: confirmLabel,
      onClick: onConfirm,
    },
    duration: 8000,
  })
}
