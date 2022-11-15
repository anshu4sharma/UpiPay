import { useState } from "react";
import MerchantContext from "./MerchantContext";
const MerchantDetails = ({ children }) => {
  const [MerchantId, setMerchantId] = useState("")
  return (
    <MerchantContext.Provider value={{MerchantId,setMerchantId}}>
      {children}
    </MerchantContext.Provider>
  );
};

export default MerchantDetails