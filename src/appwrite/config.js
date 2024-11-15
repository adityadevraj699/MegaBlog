import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import authService from '../appwrite/auth'; // Adjust the path as necessary

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
       // console.log("..............................title",title,"slug", slug, "content",content,"image", featuredImage,"status", status,"userid", userId)
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                
                conf.appwriteCollectionId,
                
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file) {
        

        try {
            //console.log('Uploading file:', file);
    
            // Ensure you are authenticated before this call
            const buc = await this.bucket.createFile(
                conf.appwriteBucketId,  // Ensure this ID is correct
                ID.unique(),            // Unique ID for the file
                file                    // File object
            );
    
            //console.log('File uploaded successfully:', buc);
            return buc;
        } catch (error) {
            console.error('Appwrite service :: uploadFile :: error', error.message, error.code);
            return false;
        }
    }
    

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        const filePer = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
       // console.log("fileper",filePer)
        return filePer
    }
}


const service = new Service()
export default service