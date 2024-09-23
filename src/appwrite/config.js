import conf from "../conf/conf";
import { Client, ID,Databases,Storage,Query} from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  
async createPost({title, slug, content, featuredImage, status, userId,userName,createdAt,category}) {
    try {
      console.log("Creating post with data:", {title, slug, content, featuredImage, status, userId,userName,createdAt,category});
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        { 
          title,
          content,
          featuredImage,
          status,
          userId,
          userName,
          createdAt,
          category
        }
      );
    } catch (error) {
      console.log("appwrite service error in Creating Post", error);
      return false;
    }
  }
  
  async updatePost(slug, {title, content, featuredImage, status,createdAt,category}) {
    try {
      console.log("Updating post with data:", {slug, title, content, featuredImage, status,category});
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          createdAt,
          category
        }
      );
    } catch (error) {
      console.log("appwrite service error in updating Post", error);
      return false;
    }
  }
  
  async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
        );
        return true
    } catch (error) {
        console.log("appwrite service error in deleting post",error)
        return false;
        
    }
  }
  async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
        );
    } catch (error) {
        console.log("appwrite service error in getPost",error)  ;
        return false
    }
  }
  // async getAllPosts(queries=[Query.equal("status","active")]){
  //   try {
  //       return await this.databases.listDocuments(
  //           conf.appwriteDatabaseID,
  //           conf.appwriteCollectionID,
  //           queries,
  //           );
  //   } catch (error) {
  //       console.log("appwrite service error in getAllPosts",error)  ;
  //       return false
  //   }
  // }
  
  async getAllPosts(queries = [Query.equal("status", "active"),Query.limit(50)]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries, 
      );
    } catch (error) {
      console.log("Appwrite service error in getAllPosts", error);
      return false;
    }
  }
  //increased post limit to 50
  
  
  async uploadFile(file){
    try {
        return await this.storage.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("appwrite service error in uploding File",error)
        return false;
    }
  }

  async deleteFile(fileID){
    try {
        await this.storage.deleteFile(
            conf.appwriteBucketID,
            fileID
        );
        return true
    } catch (error) {
        console.log("appwrite service error in deleting File",error)  ;
        return false
    }
  }
  getFilePreview(fileID){
    return this.storage.getFilePreview(
        conf.appwriteBucketID,
            fileID
    ); 
  }
  async SearchPosts(searchText) {
    
    const queries = [
      Query.search("title", searchText),
      Query.search("content", searchText),
      Query.search("userName", searchText),
    ];

    return this.databases.listDocuments(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      queries.length > 1 ? [Query.or([...queries])] : queries
    );
}

async Category(category) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseID,
      conf.appwriteCollectionID,
      [Query.search("category", category)] // Use Query.equal for exact matches
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return false 
  }
}


}

const service = new Service()
export default service;