import { useEffect, useRef } from "react";

export function useOutsideClick(handler, handleCapturing = true) {

  const ref = useRef();

  useEffect(function () {
      function handleCloseModal(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      // i pass true to prevent to add event in bubbling just in Capturing
      document.addEventListener("click", handleCloseModal, handleCapturing);
      return () =>
        document.removeEventListener(
          "click",
          handleCloseModal,
          handleCapturing
        );
    },
    [handler, handleCapturing]
  );

  return ref;
}
