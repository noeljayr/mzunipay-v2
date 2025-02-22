import { create } from 'zustand';

interface SecurityModalState {
    securityModalActive: boolean;
    setSecurityModalActive: () => void;
}


const useSecurityModalStore = create<SecurityModalState>((set) => ({
    securityModalActive: false,
    setSecurityModalActive: () => set((state) => ({securityModalActive: !state.securityModalActive})),
}));

export default useSecurityModalStore;