import MerchantContext from "./MerchantContext";
const state = "anshu sahd asd12332";
const fecthMerchantId = ()=>{
  
}
const isUserLoggedIn =()=>{

}
const MerchantDetails = ({ children }) => {
  return (
    <MerchantContext.Provider value={state}>
      {children}
    </MerchantContext.Provider>
  );
};

export default MerchantDetails