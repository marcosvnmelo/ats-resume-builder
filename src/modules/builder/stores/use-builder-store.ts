import { create } from 'zustand';

interface State {
  isFormVisible: boolean;
}

interface Actions {
  toggleFormVisibility: () => void;
}

export const useBuilderStore = create<State & Actions>((set) => ({
  isFormVisible: true,
  toggleFormVisibility: () => set((state) => ({ isFormVisible: !state.isFormVisible })),
}));
