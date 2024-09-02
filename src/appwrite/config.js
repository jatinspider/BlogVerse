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
  
async createPost({title, slug, content, featuredImage, status, userId}) {
    try {
      console.log("Creating post with data:", {title, slug, content, featuredImage, status, userId});
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
        }
      );
    } catch (error) {
      console.log("appwrite service error in Creating Post", error);
      return false;
    }
  }
  
  async updatePost(slug, {title, content, featuredImage, status}) {
    try {
      console.log("Updating post with data:", {slug, title, content, featuredImage, status});
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
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
  async getAllPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            queries,

            );
    } catch (error) {
        console.log("appwrite service error in getAllPosts",error)  ;
        return false
    }
  }

  
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
}

const service = new Service()
export default service;