"use client";
import React, { useState } from "react";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "../ui/avatar";
import { IoLocationSharp } from "react-icons/io5";
import { useAuthUser } from "@/hooks/useAuthUser";
import { UserProfileSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { updateProfileAction } from "@/actions/update-profile-action";

const ProfileSetting = () => {
  const user = useAuthUser();
  const router = useRouter();
  const { userAndProfile } = useAppStore();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [IsDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      firstName: userAndProfile?.name ? userAndProfile.name.split(" ")[0] : "",
      lastName: userAndProfile?.name ? userAndProfile.name.split(" ")[1] : "",
      updatedEmail: userAndProfile?.email ? userAndProfile.email : "",
      phone:
        userAndProfile?.profile &&
        userAndProfile?.profile[0] &&
        userAndProfile?.profile[0].mobileNo
          ? userAndProfile?.profile[0].mobileNo
          : "",
      address:
        userAndProfile?.profile &&
        userAndProfile?.profile[0] &&
        userAndProfile?.profile[0].addresses &&
        userAndProfile?.profile[0]?.addresses.length > 0 &&
        userAndProfile?.profile[0]?.addresses[0]
          ? userAndProfile?.profile[0]?.addresses[0]
          : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserProfileSchema>) => {
    console.log("onSubmit ~ values:", values);
    if (userAndProfile?.profile) {
      console.log(userAndProfile?.profile[0].id);
      console.log(userAndProfile?.id)
      const { error, success } = await updateProfileAction(
        values,
        uploadedImageUrl,
        userAndProfile?.profile[0].id,
        userAndProfile?.id,
      );
    }
    
    router.push("/");
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;

  const handleUploadSuccess = (uploaded: any) => {
    if (uploaded?.event === "success") {
      setUploadedImageUrl(() => uploaded.info.url);
    }
  };

  return (
    <div className="h-full rounded-xl px-6">
      {user ? (
        userAndProfile && userAndProfile.image ? (
          <div className="h-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <div className="flex gap-5 mb-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              First name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type here"
                                className=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              Last name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Type here" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-5 mb-4">
                      <FormField
                        control={form.control}
                        name="updatedEmail"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="example@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mb-4 ">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-normal">
                                  Address
                                </FormLabel>
                                <FormControl>
                                  {/* Ensure that the value is always a string */}
                                  <Input placeholder="Type here" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col items-center justify-center gap-8">
                    <Avatar className="h-40 w-40">
                      <AvatarImage
                        src={
                          uploadedImageUrl.length
                            ? uploadedImageUrl
                            : userAndProfile.image
                        }
                      />
                    </Avatar>
                    <CldUploadButton
                      options={{ multiple: true }}
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                      }
                      onUpload={handleUploadSuccess}
                    >
                      <Button
                        variant={"ghost"}
                        className="border border-zinc-300 px-6 font-medium"
                        type="button"
                      >
                        Upload
                      </Button>
                    </CldUploadButton>
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    size={"sm"}
                    type="submit"
                    disabled={isLoading}
                    className="bg-secondary-blue border-none hover:bg-secondary-blue rounded-lg"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileSetting;
