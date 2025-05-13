"use client";

import { useEffect, useState } from "react";
// import { AddLinkModal } from "@/components/links/add-link-modal"
// import { DeleteLinkModal } from "@/components/links/delete-link-modal"

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* <AddLinkModal />
      <DeleteLinkModal /> */}
    </>
  );
}
