"use client"
import { updateProfileSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage, 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/user.actions";

const ProfileForm = () => {
    const { data: session, update } = useSession();
    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || ""
        }
    });

    const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
        const res = await updateProfile(values);
        if (res.success) {

        const nextSession = {
            ...session,
            user: {
                ...session?.user,
                ...values
            }
        };

        await update(nextSession);
        toast.success("Profile updated successfully");
        } else {
            toast.error("Failed to update profile");
        }

    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col max-w-md mx-auto gap-5"
            >
                <div className="flex flex-col gap-5">
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        disabled
                                        placeholder="Email"
                                        className='input-field'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        className='input-field'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button 
                    type="submit"
                    size="lg"
                    className="button col-span-2 w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
                </Button>
            </form>

        </Form>
    )
}
 
export default ProfileForm;