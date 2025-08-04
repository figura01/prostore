import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import UserButton from "@/components/shared/header/user-button";

const Menu = () => {
    return (
        <div className="flex justify-end gap-3">
            <nav className="hidden md:flex w-full max-w-xs gap-1">
                <ModeToggle />
                <Button asChild variant="ghost">
                    <Link href="/cart">
                        <ShoppingCart /> Cart
                    </Link>
                </Button>  
             
                <UserButton />
                
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild className="align-middle">
                       <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent side="right" className="flex flex-col items-start">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <ModeToggle />
                        <Button asChild variant="ghost">
                            <Link href="/cart">
                                <ShoppingCart /> Cart
                            </Link>
                        </Button>
                        <UserButton />
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )       
}

export default Menu;