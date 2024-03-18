import Modal from "react-modal";
import { IModal } from "../type";
import { IoClose } from "react-icons/io5";

const CustomModal: React.FC<IModal> = (props: IModal) => {
  const { isOpen, onRequestClose, children } = props;
  return (
    <div className="xi">
      <Modal
        isOpen={isOpen}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div
          className="modal-overlay absolute w-full h-full opacity-50 dark:bg-bgDark"
          onClick={onRequestClose}
        />
        <div className="relative animate-scale-up-center modal-container bg-white dark:bg-bgDark w-11/12 md:max-w-xl mx-auto rounded-sm shadow-bxShadowPrimary z-50 overflow-y-auto">
          <button
            className="absolute right-3 p-3 cursor-pointer text-2xl dark:text-white"
            onClick={onRequestClose}
          >
            <IoClose />
          </button>
          <div className="modal-content py-4 px-6 my-6">{children}</div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
