import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select } from "../index";  // Import necessary components
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

function PostForm({ post }) {
  const { register, handleSubmit, setValue, control, getValues, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "", // Update category field if present
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [file, setFile] = useState(null);

  // Slug transformation logic
  const slugTransform = (value) => value?.trim().replace(/ /g, "-") || '';

  // Set default values on post change
  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("slug", post.slug || slugTransform(post.title)); // Set the slug from title or default
      setValue("content", post.content);
      setValue("status", post.status);
      setValue("category", post.category); 
    }
  }, [post, setValue]);

  // Update slug automatically when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // Handle form submission (both create and update logic)
  const submit = async (data) => {
    try {
      // Handle file upload (only when a file is selected)
      if (file) {
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        const uploadedFile = await appwriteService.uploadFile(file);
        data.featuredImage = uploadedFile.$id;
      } else {
        data.featuredImage = post?.featuredImage || null;
      }

      const postData = {
        ...data,
        createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true }),
        userId: userData.$id,
        userName: userData.name,
      };

      const dbPost = post 
        ? await appwriteService.updatePost(post.$id, postData) 
        : await appwriteService.createPost(postData);

      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Error in submit function:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
      <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
        {/* Title Input */}
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        
        {/* Slug Input */}
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
        />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

        {/* Rich Text Editor for Content */}
        <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
      </div>
      
      <div className="md:w-1/3 w-full px-2">
        {/* Featured Image Input */}
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { onChange: (e) => setFile(e.target.files[0]) })}
        />
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}

        {/* Category Select */}
        <Select
          options={['Technology', 'Health', 'Travel', 'Education', 'Lifestyle', 'Food', 'Entertainment']}
          label="Category"
          className="mb-4"
          {...register("category", { required: "Category is required" })}
        />
        {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}

        {/* Status Select */}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: "Status is required" })}
        />
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}

        <div className="text-sm text-gray-500 mt-4">
          <p><strong>Tips for better posts:</strong></p>
          <ul className="list-disc pl-5">
            <li>Ensure the title is clear and concise for better searchability.</li>
            <li>Choose the correct category to help your post reach the right audience.</li>
            <li>Be mindful of your post's status. Mark it as 'active' when ready to publish.</li>
            <li>Use high-quality images for better engagement.</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          bgColor={post ? "bg-green-500" : undefined} 
          className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;




// // // import React, { useEffect, useState } from "react";
// // // import { useForm } from "react-hook-form";
// // // import { Input, Button, RTE, Select } from "../index";  // Import necessary components
// // // import { useNavigate } from "react-router-dom";
// // // import { useSelector } from "react-redux";
// // // import appwriteService from "../../appwrite/config";

// // // function PostForm({ post }) {
// // //   const { register, handleSubmit, setValue, control, getValues, watch, formState: { errors } } = useForm({
// // //     defaultValues: {
// // //       title: post?.title || "",
// // //       slug: post?.slug || "",
// // //       content: post?.content || "",
// // //       status: post?.status || "active",
// // //       categories: post?.category || "", // Update category field if present
// // //     },
// // //   });
  
// // //   const navigate = useNavigate();
// // //   const userData = useSelector((state) => state.auth.userData);
// // //   const [file, setFile] = useState(null);

// // //   // Transform slug based on title
// // //   const slugTransform = (value) => {
// // //     if (value && typeof value === 'string') return value.trim().replace(/ /g, "-");
// // //     return '';
// // //   };

// // //   // Automatically update slug when title changes
// // //   useEffect(() => {
// // //     if (post) {
// // //       setValue("title", post.title);
// // //       setValue("slug", post.slug || slugTransform(post.title)); // Set the slug from title or default
// // //       setValue("content", post.content);
// // //       setValue("status", post.status);
// // //       setValue("categories", post.category); // Update category value
// // //     }
// // //   }, [post, setValue]);

// // //   // Watch for title change and update slug dynamically
// // //   useEffect(() => {
// // //     const subscription = watch((value, { name }) => {
// // //       if (name === 'title') {
// // //         setValue('slug', slugTransform(value.title), { shouldValidate: true });
// // //       }
// // //     });
// // //     return () => subscription.unsubscribe();
// // //   }, [watch, setValue]);

// // //   // Handle form submission
// // //   const submit = async (data) => {
// // //     try {
// // //       if (post) {
// // //         // Handle file upload if a new image is selected
// // //         if (file) {
// // //           if (post.featuredImage) {
// // //             await appwriteService.deleteFile(post.featuredImage);
// // //           }
// // //           const uploadedFile = await appwriteService.uploadFile(file);
// // //           data.featuredImage = uploadedFile.$id;
// // //         } else {
// // //           data.featuredImage = post.featuredImage; // Retain existing image if no new image is selected
// // //         }

// // //         // Update post with new data
// // //         const dbpost = await appwriteService.updatePost(post.$id, {
// // //           ...data,
// // //           createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true }), 
// // //         });
// // //         if (dbpost) {
// // //           navigate(`/posts/${dbpost.$id}`);
// // //         }
// // //       } else {
// // //         const fileResponse = file ? await appwriteService.uploadFile(file) : null;
// // //         const fileId = fileResponse ? fileResponse.$id : null;
// // //         const dbPost = await appwriteService.createPost({
// // //           ...data,
// // //           createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true }),
// // //           userId: userData.$id,
// // //           featuredImage: fileId,
// // //           userName: userData.name, 
// // //         });
// // //         if (dbPost) {
// // //           navigate(`/posts/${dbPost.$id}`);
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error in submit function:", error);
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
// // //       <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
// // //         {/* Title Input */}
// // //         <Input
// // //           label="Title:"
// // //           placeholder="Title"
// // //           className="mb-4"
// // //           {...register("title", { required: "Title is required" })}
// // //         />
// // //         {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        
// // //         {/* Slug Input */}
// // //         <Input
// // //           label="Slug:"
// // //           placeholder="Slug"
// // //           className="mb-4"
// // //           {...register("slug", { required: "Slug is required" })}
// // //           onInput={(e) => {
// // //             setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
// // //           }}
// // //         />
// // //         {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

// // //         {/* Rich Text Editor for Content */}
// // //         <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
// // //         {errors.content && <p className="text-red-500">{errors.content.message}</p>}
// // //       </div>
      
// // //       <div className="md:w-1/3 w-full px-2">
// // //         {/* Featured Image Input */}
// // //         <Input
// // //           label="Featured Image:"
// // //           type="file"
// // //           className="mb-4"
// // //           accept="image/png, image/jpg, image/jpeg, image/gif"
// // //           {...register("image", { onChange: (e) => setFile(e.target.files[0]) })}
// // //         />
// // //         {post && post.featuredImage && (
// // //           <div className="w-full mb-4">
// // //             <img
// // //               src={appwriteService.getFilePreview(post.featuredImage)}
// // //               alt={post.title}
// // //               className="rounded-lg w-full"
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Category Select */}
// // //         <Select
// // //           options={['Technology', 'Health', 'Travel', 'Education', 'Lifestyle', 'Food', 'Entertainment']}
// // //           label="Category"
// // //           className="mb-4"
// // //           {...register("categories", { required: "Category is required" })}
// // //         />
// // //         {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}

// // //         {/* Status Select */}
// // //         <Select
// // //           options={["active", "inactive"]}
// // //           label="Status"
// // //           className="mb-4"
// // //           {...register("status", { required: "Status is required" })}
// // //         />
// // //         {errors.status && <p className="text-red-500">{errors.status.message}</p>}

// // //         <div className="text-sm text-gray-500 mt-4">
// // //           <p><strong>Tips for better posts:</strong></p>
// // //           <ul className="list-disc pl-5">
// // //             <li>Ensure the title is clear and concise for better searchability.</li>
// // //             <li>Choose the correct category to help your post reach the right audience.</li>
// // //             <li>Be mindful of your post's status. Mark it as 'active' when ready to publish.</li>
// // //             <li>Use high-quality images for better engagement.</li>
// // //           </ul>
// // //         </div>

// // //         {/* Submit Button */}
// // //         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}>
// // //           {post ? "Update" : "Submit"}
// // //         </Button>
// // //       </div>
// // //     </form>
// // //   );
// // // }

// // // export default PostForm;

// // import React, { useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { Input, Button, RTE, Select } from "../index";  // Import necessary components
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import appwriteService from "../../appwrite/config";

// // function PostForm({ post }) {
// //   const { register, handleSubmit, setValue, control, getValues, watch, formState: { errors } } = useForm({
// //     defaultValues: {
// //       title: post?.title || "",
// //       slug: post?.slug || "",
// //       content: post?.content || "",
// //       status: post?.status || "active",
// //       categories: post?.category || "", // Update category field if present
// //     },
// //   });

// //   const navigate = useNavigate();
// //   const userData = useSelector((state) => state.auth.userData);
// //   const [file, setFile] = useState(null);

// //   // Slug transformation logic
// //   const slugTransform = (value) => value?.trim().replace(/ /g, "-") || '';

// //   // Set default values on post change
// //   useEffect(() => {
// //     if (post) {
// //       setValue("title", post.title);
// //       setValue("slug", post.slug || slugTransform(post.title)); // Set the slug from title or default
// //       setValue("content", post.content);
// //       setValue("status", post.status);
// //       setValue("categories", post.category);
// //     }
// //   }, [post, setValue]);

// //   // Update slug automatically when title changes
// //   useEffect(() => {
// //     const subscription = watch((value, { name }) => {
// //       if (name === 'title') {
// //         setValue('slug', slugTransform(value.title), { shouldValidate: true });
// //       }
// //     });
// //     return () => subscription.unsubscribe();
// //   }, [watch, setValue]);

// //   // Handle form submission (both create and update logic)
// //   const submit = async (data) => {
// //     try {
// //       // Handle file upload (only when a file is selected)
// //       if (file) {
// //         if (post?.featuredImage) {
// //           await appwriteService.deleteFile(post.featuredImage);
// //         }
// //         const uploadedFile = await appwriteService.uploadFile(file);
// //         data.featuredImage = uploadedFile.$id;
// //       } else {
// //         data.featuredImage = post?.featuredImage || null;
// //       }

// //       const postData = {
// //         ...data,
// //         createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true }),
// //         userId: userData.$id,
// //         userName: userData.name,
// //       };

// //       const dbPost = post 
// //         ? await appwriteService.updatePost(post.$id, postData) 
// //         : await appwriteService.createPost(postData);

// //       if (dbPost) {
// //         navigate(`/posts/${dbPost.$id}`);
// //       }
// //     } catch (error) {
// //       console.error("Error in submit function:", error);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
// //       <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
// //         {/* Title Input */}
// //         <Input
// //           label="Title:"
// //           placeholder="Title"
// //           className="mb-4"
// //           {...register("title", { required: "Title is required" })}
// //         />
// //         {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        
// //         {/* Slug Input */}
// //         <Input
// //           label="Slug:"
// //           placeholder="Slug"
// //           className="mb-4"
// //           {...register("slug", { required: "Slug is required" })}
// //           onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
// //         />
// //         {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

// //         {/* Rich Text Editor for Content */}
// //         <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
// //         {errors.content && <p className="text-red-500">{errors.content.message}</p>}
// //       </div>
      
// //       <div className="md:w-1/3 w-full px-2">
// //         {/* Featured Image Input */}
// //         <Input
// //           label="Featured Image:"
// //           type="file"
// //           className="mb-4"
// //           accept="image/png, image/jpg, image/jpeg, image/gif"
// //           {...register("image", { onChange: (e) => setFile(e.target.files[0]) })}
// //         />
// //         {post?.featuredImage && (
// //           <div className="w-full mb-4">
// //             <img
// //               src={appwriteService.getFilePreview(post.featuredImage)}
// //               alt={post.title}
// //               className="rounded-lg w-full"
// //             />
// //           </div>
// //         )}

// //         {/* Category Select */}
// //         <Select
// //           options={['Technology', 'Health', 'Travel', 'Education', 'Lifestyle', 'Food', 'Entertainment']}
// //           label="Category"
// //           className="mb-4"
// //           {...register("category", { required: "Category is required" })}
// //         />
// //         {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}

// //         {/* Status Select */}
// //         <Select
// //           options={["active", "inactive"]}
// //           label="Status"
// //           className="mb-4"
// //           {...register("status", { required: "Status is required" })}
// //         />
// //         {errors.status && <p className="text-red-500">{errors.status.message}</p>}

// //         <div className="text-sm text-gray-500 mt-4">
// //           <p><strong>Tips for better posts:</strong></p>
// //           <ul className="list-disc pl-5">
// //             <li>Ensure the title is clear and concise for better searchability.</li>
// //             <li>Choose the correct category to help your post reach the right audience.</li>
// //             <li>Be mindful of your post's status. Mark it as 'active' when ready to publish.</li>
// //             <li>Use high-quality images for better engagement.</li>
// //           </ul>
// //         </div>

// //         {/* Submit Button */}
// //         <Button 
// //           type="submit" 
// //           bgColor={post ? "bg-green-500" : undefined} 
// //           className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}
// //         >
// //           {post ? "Update" : "Submit"}
// //         </Button>
// //       </div>
// //     </form>
// //   );
// // }

// // export default PostForm;


// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input, Button, RTE, Select } from "../index";  // Import necessary components
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import appwriteService from "../../appwrite/config";

// function PostForm({ post }) {
//   const { register, handleSubmit, setValue, control, getValues, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       title: post?.title || "",
//       slug: post?.slug || "",
//       content: post?.content || "",
//       status: post?.status || "active",
//       categories: post?.category || "", // Update category field if present
//     },
//   });
  
//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);
//   const [file, setFile] = useState(null);

//   // Transform slug based on title
//   const slugTransform = (value) => {
//     if (value && typeof value === 'string') return value.trim().replace(/ /g, "-");
//     return '';
//   };

//   // Automatically update slug when title changes
//   useEffect(() => {
//     if (post) {
//       setValue("title", post.title);
//       setValue("slug", post.slug || slugTransform(post.title)); // Set the slug from title or default
//       setValue("content", post.content);
//       setValue("status", post.status);
//       setValue("category", post.category); // Update category value
//     }
//   }, [post, setValue]);

//   // Watch for title change and update slug dynamically
//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === 'title') {
//         setValue('slug', slugTransform(value.title), { shouldValidate: true });
//       }
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, setValue]);

//   // Handle form submission
//   const submit = async (data) => {
//     try {
//       if (post) {
//         // Handle file upload if a new image is selected
//         if (file) {
//           if (post.featuredImage) {
//             await appwriteService.deleteFile(post.featuredImage);
//           }
//           const uploadedFile = await appwriteService.uploadFile(file);
//           data.featuredImage = uploadedFile.$id;
//         } else {
//           data.featuredImage = post.featuredImage; // Retain existing image if no new image is selected
//         }

//         // Update post with new data
//         const dbpost = await appwriteService.updatePost(post.$id, {
//           ...data,
//           createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true }), 
//         });
//         if (dbpost) {
//           navigate(`/posts/${dbpost.$id}`);
//         }
//       } else {
//         const fileResponse = file ? await appwriteService.uploadFile(file) : null;
//         const fileId = fileResponse ? fileResponse.$id : null;
//         const dbPost = await appwriteService.createPost({
//           ...data,
//           createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: true }),
//           userId: userData.$id,
//           featuredImage: fileId,
//           userName: userData.name, 
//         });
//         if (dbPost) {
//           navigate(`/posts/${dbPost.$id}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error in submit function:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
//       <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
//         {/* Title Input */}
//         <Input
//           label="Title:"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: "Title is required" })}
//         />
//         {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        
//         {/* Slug Input */}
//         <Input
//           label="Slug:"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: "Slug is required" })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//           }}
//         />
//         {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

//         {/* Rich Text Editor for Content */}
//         <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
//         {errors.content && <p className="text-red-500">{errors.content.message}</p>}
//       </div>
      
//       <div className="md:w-1/3 w-full px-2">
//         {/* Featured Image Input */}
//         <Input
//           label="Featured Image:"
//           type="file"
//           className="mb-4"
//           accept="image/png, image/jpg, image/jpeg, image/gif"
//           {...register("image", { onChange: (e) => setFile(e.target.files[0]) })}
//         />
//         {post && post.featuredImage && (
//           <div className="w-full mb-4">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-lg w-full"
//             />
//           </div>
//         )}

//         {/* Category Select */}
//         <Select
//           options={['Technology', 'Health', 'Travel', 'Education', 'Lifestyle', 'Food', 'Entertainment']}
//           label="Category"
//           className="mb-4"
//           {...register("category", { required: "Category is required" })}
//         />
//         {errors.category && <p className="text-red-500">{errors.category.message}</p>}

//         {/* Status Select */}
//         <Select
//           options={["active", "inactive"]}
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: "Status is required" })}
//         />
//         {errors.status && <p className="text-red-500">{errors.status.message}</p>}

//         <div className="text-sm text-gray-500 mt-4">
//           <p><strong>Tips for better posts:</strong></p>
//           <ul className="list-disc pl-5">
//             <li>Ensure the title is clear and concise for better searchability.</li>
//             <li>Choose the correct category to help your post reach the right audience.</li>
//             <li>Be mindful of your post's status. Mark it as 'active' when ready to publish.</li>
//             <li>Use high-quality images for better engagement.</li>
//           </ul>
//         </div>

//         {/* Submit Button */}
//         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}>
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default PostForm;
