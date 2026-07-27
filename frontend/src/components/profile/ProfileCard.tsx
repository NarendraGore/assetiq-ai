"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useAuthStore } from "@/store/auth.store";

export default function ProfileCard() {

    const user =
        useAuthStore(
            state => state.user
        );

    return (

        <Card className="max-w-xl">

            <CardHeader>

                <CardTitle>

                    My Profile

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                <Avatar className="h-20 w-20">

                    <AvatarFallback>

                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}

                    </AvatarFallback>

                </Avatar>

                <div>

                    <p className="text-sm text-muted-foreground">
                        Name
                    </p>

                    <p className="font-medium">

                        {user?.firstName}
                        {" "}
                        {user?.lastName}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-muted-foreground">
                        Email
                    </p>

                    <p>{user?.email}</p>

                </div>

                <div>

                    <p className="text-sm text-muted-foreground">
                        Role
                    </p>

                    <p>{user?.role}</p>

                </div>

            </CardContent>

        </Card>

    );

}