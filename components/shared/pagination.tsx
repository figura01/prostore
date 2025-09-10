"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
    page: number | string;
    totalPages: number;
    urlParamName?: string; // default to 'page'
}

const Pagination = ({ page, totalPages, urlParamName} : PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = (btnType: string) => {
        const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value: pageValue.toString()
        });
        
        if(newUrl) router.push(newUrl);
        return;
    }

    return (
        <div className="flex gap-2">
            <Button 
                size="lg" 
                variant="outline" 
                className="w-28" disabled={Number(page) <= 1}
                onClick={() => handleClick('previus')}
            >
                Previus
            </Button>
            <Button 
                size="lg" 
                variant="outline" 
                className="w-28" 
                disabled={Number(page) >= totalPages}
                onClick={() => handleClick('next')}
            >
                Next
            </Button>
        </div>

    );
}
 
export default Pagination;