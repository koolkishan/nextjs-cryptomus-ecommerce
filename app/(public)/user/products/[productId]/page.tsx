'ues server';

import { SingleProduct } from "@/components/user";
import { getProductFromId } from "@/data/product";

interface SingleProductPageProps {
    params: {
      productId: string;
    }
  };

const SingleProductPage = async ({params}:SingleProductPageProps) => {
    const product = await getProductFromId(params.productId);
    return ( 
        <div>
            <SingleProduct product={product}/> 
        </div>
     );
}
 
export default SingleProductPage;