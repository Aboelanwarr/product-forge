import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { type ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactNode;
}

const MyModal = ({ isOpen, closeModal, title, children }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition
              className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
              )}
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MyModal;
