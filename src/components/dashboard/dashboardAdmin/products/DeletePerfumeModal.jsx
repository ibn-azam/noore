"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

function DeletePerfumeModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isDeleting,
  error,
  productName,
}) {
  return (
    <AlertDialog>
      <AlertDialog.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur"
      >
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="rounded-2xl border border-[#E8E1D6] bg-white">
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <Trash2 size={22} />
              </AlertDialog.Icon>

              <AlertDialog.Heading className="font-heading text-2xl text-[#25221F]">
                Delete Perfume?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-sm leading-6 text-[#77716A]">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-[#25221F]">
                  {productName}
                </span>
                ? This action cannot be undone.
              </p>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="outline"
                isDisabled={isDeleting}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                onPress={onConfirm}
                isDisabled={isDeleting}
                className="rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete Product"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

export default DeletePerfumeModal;
