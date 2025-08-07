"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, CheckCircle, CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: {item: CartItem}) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);

        if(!res.success) {
            toast.error('Fail to add this item to the cart', {
                icon: <CircleAlert className="h-5 w-5 text-red-500"/>,
                description: 'test',
                className: "bg-red-50 border-red-200 text-red-900",

            })
        }
        toast.success('Item added to the cart', {
            description: 'test',
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
            className: "bg-green-50 border-green-200 text-green-900",
            action: (
                <Button
                    onClick={() => router.push("/cart")}
                    className="flex flex-end bg-primary text-white hover:bg-gray-800"
                >
                    Go to Cart
                </Button>
            )

        })
    }

    return (
        <Button 
            className="w-full" 
            type="button"
            onClick={handleAddToCart}
        >
           <Plus /> Add to Cart
        </Button>
    );
}
 
export default AddToCart;