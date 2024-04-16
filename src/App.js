import './App.css';
import SellerModule from './seller/sellerApp';
import UserModule from './user/userApp';

function App() {
  

    if( localStorage.getItem("sellerid") !=null )
      return(<SellerModule/>);
      
    else
      return ( <UserModule/> );
    
}

export default App;
