import {  Order } from "@/components/user";

interface OrderProps {
    params: {
      orderId: string;
    };
  }
  
const Orderpage = ({params}:OrderProps) => {
  const orderId = params.orderId;
    return ( 
        <div>
            <Order orderId={orderId}/>
        </div>
     );
}
 
export default Orderpage;