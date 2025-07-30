import { cn } from "@/lib/utils";
const ProductPrice = ({ price, className }: { price: number; className?: string }) => {
    console.log(price)
    const [intValue, floatValue] = price.toFixed(2).split('.');

    return <p className={cn('text-2xl', className)}>
        <span className="text-xs align-super">$</span>
        {intValue}
        <span className="text-xs align-super">{floatValue}</span>
       
    </p>;
};


export default ProductPrice;