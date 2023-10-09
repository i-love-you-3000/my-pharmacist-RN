import { createContext, useState, ReactNode, useContext } from "react";

interface MyContextType {
    medicineNameFromCamera: string | undefined;
    setMedicineNameFromCamera: (name: string | undefined) => void;
}

const medicineNameContext = createContext<MyContextType | undefined>(undefined);

export function useMedicineNameContext() {
    const context = useContext(medicineNameContext);
    if (context === undefined) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
}
export default medicineNameContext;
