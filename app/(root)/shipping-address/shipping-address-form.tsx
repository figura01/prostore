"use client"

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validators";
import { shippingAddressDefaultValues } from "@/lib/constants";

import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.actions";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    });

    const [isPending, startTransition] = useTransition();

    const onSubmit:SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
        startTransition( async () => {

            console.log(values)
            const res = await updateUserAddress(values)
            if(!res.success) {
                toast.error('Fail to update your shipping address', {
                    description: res.message
                })
                return;
            }
            toast.success('Updated your shipping address', {
                description: res.message
            })
            router.push('/payment-method')
        })
        return;
    }

    return (<>
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt-4">Shipping Address</h1>
            <p className="text-sm text-muted-forground">
                Please enter and address to ship to
            </p>
            <Form {...form}>
                <form 
                    method="post" className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field, fieldState, formState }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="streetAddress"
                            render={({ 
                                field 
                            } : {
                                field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>>}
                            ) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Address" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ 
                                field 
                            } : {
                                field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>>}
                            ) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter City" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ 
                                field 
                            } : {
                                field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>>}
                            ) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Postal Code" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ): (
                                <ArrowRight className="w-4 h-4" />

                            )}{' '}
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </>);
}
 
export default ShippingAddressForm;