import { createContext, useState } from "react";
const [medicineNameFromCamera, setMedicineNameFromCamera] = useState<string>();
const medicineNameContext = createContext({ medicineNameFromCamera, setMedicineNameFromCamera });
export default medicineNameContext;
