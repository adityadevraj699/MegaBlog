import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("Submitting data:", data);

        try {
            let file = null;
            if (data.image && data.image[0]) {
                try {
                    file = await appwriteService.uploadFile(data.image[0]);
                    console.log("Uploaded file:", file);
                } catch (uploadError) {
                    console.error("File upload error:", uploadError);
                }
            }

            if (post) {
                if (file) {
                    try {
                        await appwriteService.deleteFile(post.featuredImage);
                        console.log("Old file deleted");
                    } catch (deleteError) {
                        console.error("Error deleting old file:", deleteError);
                    }
                }

                try {
                    const dbPost = await appwriteService.updatePost(post.$id, {
                        ...data,
                        featuredImage: file ? file.$id : post.featuredImage, // Check for file and assign ID
                    });
                    console.log("Updated post:", dbPost);

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } catch (updateError) {
                    console.error("Post update error:", updateError);
                }
            } else {
                if (file) {
                    data.featuredImage = file.$id; // Ensure file is valid before assigning $id

                    try {
                        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                        console.log("Created post:", dbPost);

                        if (dbPost) {
                            navigate(`/post/${dbPost.$id}`);
                        }
                    } catch (createError) {
                        console.error("Post creation error:", createError);
                    }
                } else {
                    // Handle case where there is no file uploaded (e.g., user didn't upload an image)
                    console.log("No file uploaded, proceeding without featured image.");
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                    console.log("Created post:", dbPost);

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (generalError) {
            console.error("General submission error:", generalError);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-lg"
        >
            {/* Left Column (Title, Slug, Content) */}
            <div className="space-y-6">
                <div>
                    <Input
                        label="Title :"
                        placeholder="Enter the title"
                        className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("title", { required: true })}
                    />
                </div>
                <div>
                    <Input
                        label="Slug :"
                        placeholder="Enter the slug"
                        className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>
                <div>
                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        className="w-full border-2 border-gray-300 rounded-md p-3"
                    />
                </div>
            </div>

            {/* Right Column (Image, Status, Button) */}
            <div className="space-y-6">
                <div>
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && post.featuredImage && (
                        <div className="w-full mt-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("status", { required: true })}
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                        className="w-full text-white font-semibold py-3 rounded-md focus:outline-none"
                    >
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
