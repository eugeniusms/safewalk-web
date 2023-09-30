import createStore from "zustand";

type ShowShareAddressState = {
  showShareAddress: boolean;
  setShowShareAddress: (show: boolean) => void;
};

const useShareAddressStore = createStore<ShowShareAddressState>((set) => ({
  showShareAddress: false,
  setShowShareAddress: (show: boolean) => set({ showShareAddress: show }),
}));

export default useShareAddressStore;
