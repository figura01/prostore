import { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider }from "next-auth/react";
import ProfileForm from "./profile-form";

const metadata: Metadata = {
    title: "Customer Profile",
};

const ProfilePage = async () => {
    const session = await auth();

    return (<>
        <SessionProvider 
            session={session} 
        >
            <div className="max-w-md mx-auto space-y-4">
                <h2 className="h2-bold">
                    Prodile
                </h2>
            </div>
            <ProfileForm />
        </SessionProvider>
    </>);
}
 
export default ProfilePage;