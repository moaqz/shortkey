"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

import type { Link } from "~/types/links";

import { MoreVerticalIcon, XIcon } from "~/components/common";
import { IconButton } from "~/components/ui";
import { TLinkSchema } from "~/lib/schemas/link";
import { linkServices } from "~/lib/services/link.service";
import { DeleteLinkForm } from "./delete-link-form";
import { LinkForm } from "./form";

const TABS = {
  INFO: "info",
  DELETE: "delete",
};

interface LinkSettingsProps {
  link: Link;
}

export function LinkSettings({ link }: LinkSettingsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentTab, setCurrentTab] = useState(TABS.INFO);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
  };

  const onClose = () => {
    closeModal();
    mutate("/api/links");
  };

  const updateLink = async (data: Partial<TLinkSchema>, linkId: number) => {
    linkServices
      .updateLink(data, linkId)
      .then(() => toast.success("Successfully updated link!"))
      .catch(() => toast.error("Link could not be updated. Please try again."))
      .finally(() => onClose());
  };

  const deleteLink = async (linkId: number) => {
    linkServices
      .deleteLink(linkId)
      .then(() => toast.success("Successfully deleted link!"))
      .catch(() => toast.error("Link could not be deleted. Please try again."))
      .finally(() => onClose());
  };

  return (
    <div>
      <IconButton aria-label="Open Link Settings" onClick={openModal}>
        <MoreVerticalIcon width={16} height={16} />
      </IconButton>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/80 text-zinc-100 w-full max-w-md bg-zinc-900 p-6 rounded-lg space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            type="button"
            onClick={closeModal}
            className="hover:scale-105 hover:transition-transform"
            aria-label="Close Settings"
          >
            <XIcon width={24} height={24} />
          </button>
        </div>

        <div
          role="tablist"
          className="border border-zinc-800 rounded-lg overflow-hidden grid grid-cols-2"
        >
          <button
            type="button"
            onClick={() => switchTab(TABS.INFO)}
            role="tab"
            className={`${
              currentTab === TABS.INFO
                ? "bg-zinc-800 text-white"
                : "opacity-60 hover:opacity-100 hover:transition-opacity"
            } py-1 font-medium`}
          >
            General
          </button>

          <button
            type="button"
            onClick={() => switchTab(TABS.DELETE)}
            role="tab"
            className={`${
              currentTab === TABS.DELETE
                ? "bg-zinc-800  text-white"
                : "opacity-60 hover:opacity-100 hover:transition-opacity"
            } py-1 font-medium`}
          >
            Delete Link
          </button>
        </div>

        {currentTab === TABS.INFO && (
          <LinkForm
            prePopulatedData={{ url: link.url }}
            handleFormSubmit={async (data) => updateLink(data, link.id)}
          />
        )}

        {currentTab === TABS.DELETE && (
          <DeleteLinkForm onSubmit={() => deleteLink(link.id)} />
        )}
      </dialog>
    </div>
  );
}
