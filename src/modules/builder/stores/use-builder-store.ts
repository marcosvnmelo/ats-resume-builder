import { create } from 'zustand';

type SidebarView = 'builder' | 'options';

interface State {
  sidebarView: SidebarView;
}

interface Actions {
  changeSidebarView: (sidebarView: SidebarView) => void;
}

export const useBuilderStore = create<State & Actions>((set) => ({
  sidebarView: 'builder',
  changeSidebarView: (sidebarView) => set({ sidebarView }),
}));
