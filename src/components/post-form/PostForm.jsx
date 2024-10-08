
// // import React, { useCallback, useEffect } from "react";
// // import { useForm } from "react-hook-form";
// // import { Input, Button, RTE, Select } from "../index";
// // import { useSelector } from "react-redux";
// // import appwriteService from "../../appwrite/config";
// // import { useNavigate } from "react-router-dom";

// // function PostForm({ post }) {
// //   const { register, handleSubmit, watch, setValue, control, getValues } =
// //     useForm({
// //       defaultValues: {
// //         title: post?.title || "",
// //         slug: post?.slug || "",
// //         content: post?.content || "",
// //         status: post?.status || "active",
// //       },
// //     });
// //   const navigate = useNavigate();
// //   const userData = useSelector((state) => state.auth.userData);

// //   const submit = async (data) => {
// //     let file;
// //     try {
// //       if (post) {
// //         if (data.image?.[0]) {
// //           const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;  
// //         }
// //         if (file && post.featuredImage) {
// //           await appwriteService.deleteFile(post.featuredImage);
// //         }
// //         const dbpost = await appwriteService.updatePost(post.$id, {
// //           ...data,
// //           featuredImage: file ? file.$id : post.featuredImage,
// //         });
// //         if (dbpost) {
// //           navigate(`/post/${dbpost.$id}`);
// //         }
// //       } else {
// //         const file = await appwriteService.uploadFile(data.image[0]);
// //         if (file) {
// //           const fileId = file.$id;
// //           data.featuredImage = fileId;
// //           const dbPost = await appwriteService.createPost({
// //             ...data,
// //             userId: userData.$id,
// //             userName: userData.name,   //this is added
// //           });
// //           if (dbPost) {
// //             navigate(`/post/${dbPost.$id}`);
// //           }
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error in submit function:", error);
// //     }
// //   };

// //   const slugTransform = useCallback((value) => {
// //     if (value && typeof value === 'string') return value.trim().replace(/ /g, "-");
// //     return '';
// //   }, []);

// //   useEffect(() => {
// //     const subscription = watch((value, { name }) => {
// //       if (name === 'title') {
// //         setValue('slug', slugTransform(value.title), { shouldValidate: true });
// //       }
// //     });

// //     return () => subscription.unsubscribe();
// //   }, [watch, slugTransform, setValue]);

// //   return (
// //     <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
// //     <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
// //       <Input
// //         label="Title:"
// //         placeholder="Title"
// //         className="mb-4"
// //         {...register("title", { required: true })}
// //       />
// //       <Input
// //         label="Slug:"
// //         placeholder="Slug"
// //         className="mb-4"
// //         {...register("slug", { required: true })}
// //         onInput={(e) => {
// //           setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
// //         }}
// //       />
// //       <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
// //     </div>
// //     <div className="md:w-1/3 w-full px-2">
// //       <Input
// //         label="Featured Image:"
// //         type="file"
// //         className="mb-4"
// //         accept="image/png, image/jpg, image/jpeg, image/gif"
// //         {...register("image", { required: !post })}
// //       />
// //       {post && post.featuredImage && (
// //         <div className="w-full mb-4">
// //           <img
// //             src={appwriteService.getFilePreview(post.featuredImage)}
// //             alt={post.title}
// //             className="rounded-lg w-full"
// //           />
// //         </div>
// //       )}
// //       <Select
// //         options={["active", "inactive"]}
// //         label="Status"
// //         className="mb-4"
// //         {...register("status", { required: true })}
// //       />
// //       <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}>
// //       {post ? "Update" : "Submit"}
// //       </Button>
// //     </div>
// //   </form>
// //   );
// // }

// // export default PostForm;

// import React, { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input, Button, RTE, Select as Selectcomp } from "../index";
// import { useSelector } from "react-redux";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import Select from 'react-select';

// function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//     defaultValues: {
//       title: post?.title || "",
//       slug: post?.slug || "",
//       content: post?.content || "",
//       status: post?.status || "active",
//       categories: post?.categories || [],
//     },
//   });
//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);
//   const [file, setFile] = useState(null);


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
//           createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }), // 
//           // userName: userData.name, 
//         });
//         if (dbpost) {
//           navigate(`/posts/${dbpost.$id}`);
//         }
//       } else {
//         const fileResponse = file ? await appwriteService.uploadFile(file) : null;
//         const fileId = fileResponse ? fileResponse.$id : null;
//         const dbPost = await appwriteService.createPost({
//           ...data,
//           createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }),
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

//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === 'string') return value.trim().replace(/ /g, "-");
//     return '';
//   }, []);

//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === 'title') {
//         setValue('slug', slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
//       <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
//         <Input
//           label="Title:"
//           placeholder="Title"
//           className="mb-4"
//           {...register("title", { required: true })}
//         />
//         <Input
//           label="Slug:"
//           placeholder="Slug"
//           className="mb-4"
//           {...register("slug", { required: true })}
//           onInput={(e) => {
//             setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//           }}
//         />
//         <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
//       </div>
//       <div className="md:w-1/3 w-full px-2">
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
//          <Select
//           options={['Technology','Health', 'Travel', 'Education', 'Lifestyle','Food']}
//           isMulti
//           placeholder="Select categories"
//           className="mb-4"
//           onChange={(selected) => setValue("categories", selected.map(option => option.value))}
//           // Registering the categories field manually
//           {...register("category")}
//         />
//         < Selectcomp
//           options={["active", "inactive"]}
          
//           label="Status"
//           className="mb-4"
//           {...register("status", { required: true })}
//         />
//         <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}>
//           {post ? "Update" : "Submit"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default PostForm;

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select as Select } from "../index";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
// import Select from 'react-select';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      categories: post?.categories || "", 
    },
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [file, setFile] = useState(null);
  const categoryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Health', label: 'Health' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Education', label: 'Education' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Food', label: 'Food' },
];

  const submit = async (data) => {
    try {
      if (post) {
        // Handle file upload if a new image is selected
        if (file) {
          if (post.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
          const uploadedFile = await appwriteService.uploadFile(file);
          data.featuredImage = uploadedFile.$id;
        } else {
          data.featuredImage = post.featuredImage; // Retain existing image if no new image is selected
        }

        // Update post with new data
        const dbpost = await appwriteService.updatePost(post.$id, {
          ...data,
          createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }), 
        });
        if (dbpost) {
          navigate(`/posts/${dbpost.$id}`);
        }
      } else {
        const fileResponse = file ? await appwriteService.uploadFile(file) : null;
        const fileId = fileResponse ? fileResponse.$id : null;
        const dbPost = await appwriteService.createPost({
          ...data,
          createdAt: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }),
          userId: userData.$id,
          featuredImage: fileId,
          userName: userData.name, 
        });
        if (dbPost) {
          navigate(`/posts/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error in submit function:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') return value.trim().replace(/ /g, "-");
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap">
      <div className="md:w-2/3 w-full px-2 mb-4 md:mb-0">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="md:w-1/3 w-full px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { onChange: (e) => setFile(e.target.files[0]) })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full"
            />
          </div>
        )}
       <Select
          options={['Technology', 'Health', 'Travel', 'Education', 'Lifestyle', 'Food']}
          label="Status"
          className="mb-4"
          {...register("category", { required: true })}
        />

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
       

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

