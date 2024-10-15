import { useDialogModalStore } from "../../game/store/modal-store";
import { motion } from "framer-motion";
import { ErrorCircle, SvgProjectLogo } from "./Icons";
import { LoadingSpinner } from "./Spinners";

//TODO - fine tune these animations

export default function ModalDialog() {
  const { modal, reset } = useDialogModalStore((state) => state);

  const modalBgVariants = {
    open: {
      opacity: 1,
      // y: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      // y: -1000,
      transition: {
        duration: 0.3,
      },
    },
  };

  const modalVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.75,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`${modal.isOpen ? "block" : "hidden"} relative z-10`}>
      <motion.div
        initial={modal.isOpen ? "closed" : "open"}
        animate={modal.isOpen ? "open" : "closed"}
        variants={modalBgVariants}
        className="fixed inset-0 bg-neutral-25 bg-opacity-50 backdrop-blur transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-second">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-4">
          <motion.div
            initial={modal.isOpen ? "closed" : "open"}
            animate={modal.isOpen ? "open" : "closed"}
            variants={modalVariants}
            className="relative transform overflow-hidden rounded-xl bg-almostblack text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md"
          >
            <div className="bg-almostblack px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto text-neutral-22 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  {modal.type === "Default" ? (
                    <SvgProjectLogo size={28} />
                  ) : modal.type === "Loading" ? (
                    <LoadingSpinner size={28} />
                  ) : modal.type === "Success" ? (
                    <img className="w-10 h-10" src="./success_circle.png" />
                  ) : (
                    modal.type === "Error" && <ErrorCircle size={28} />
                  )}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-neutral-22"
                    id="modal-title"
                  >
                    {modal.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-300">{modal.message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-almostblack px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {modal.modalAction && (
                <button
                  onClick={modal.modalAction}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
              )}
              {modal.outLink && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={modal.outLink}
                  type="button"
                  className="inline-flex w-full text-almostblack justify-center rounded-md bg-primary-1 px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                >
                  {modal.outLinkTitle}
                </a>
              )}
              <button
                onClick={reset}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {modal.type === "Success" ? "Close" : "Cancel"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
