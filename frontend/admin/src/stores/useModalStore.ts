import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalState {
  // State
  isOpen: boolean;
  modalType: string | null;
  modalData: unknown;
  
  // Actions
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  devtools(
    (set) => ({
      // Initial state
      isOpen: false,
      modalType: null,
      modalData: null,
      
      // Actions
      openModal: (type, data = null) => {
        set({
          isOpen: true,
          modalType: type,
          modalData: data,
        });
      },
      
      closeModal: () => {
        set({
          isOpen: false,
          modalType: null,
          modalData: null,
        });
      },
    }),
    { name: 'ModalStore' }
  )
);

// Selectors
export const selectModalState = (state: ModalState) => ({
  isOpen: state.isOpen,
  modalType: state.modalType,
  modalData: state.modalData,
});
