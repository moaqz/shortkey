"use client";

import { useRef, useState } from "react";
import { mutate } from "swr";
import type { Link } from "~/types/links";
import DeleteLink from "./delete-link";
import { MoreVerticalIcon, XIcon } from "./icons";
import LinkForm from "./link-form";

const TABS = {
  INFO: "info",
  DELETE: "delete",
};

interface LinkSettingsProps {
  link: Link;
}

export default function LinkSettings({ link }: LinkSettingsProps) {
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

  const onDeleteUpdate = () => {
    closeModal();
    mutate("/api/links");
  };

  return (
    <div>
      <button
        type="button"
        aria-label="Open Link Settings"
        className="rounded-full p-1.5 text-gray-200 hover:bg-zinc-700  hover:transition-colors focus:outline-double focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
        onClick={openModal}
      >
        <MoreVerticalIcon width={16} height={16} />
      </button>

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
            id={link.id}
            slug={link.slug}
            url={link.url}
            onSubmit={onDeleteUpdate}
          />
        )}
        {currentTab === TABS.DELETE && (
          <DeleteLink id={link.id} onSubmit={onDeleteUpdate} />
        )}
      </dialog>
    </div>
  );
}