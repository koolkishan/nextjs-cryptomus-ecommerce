import {  Order } from "@/components/user";

interface OrderProps {
    params: {
      OrderId: string;
    };
  }
  
const Orderpage = ({params}:OrderProps) => {
  const orderId = params.OrderId;
    return ( 
        <div>
            <Order orderId={orderId}/>
        </div>
     );
}
 
export default Orderpage;