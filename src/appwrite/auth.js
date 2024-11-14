import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
           throw new error;
        }
    }

    async login({email, password}) {
        try {
            const rul = await this.account.createEmailPasswordSession(email, password);
            //console.log("rule", rul)
            return rul ;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
               throw error;
            }
        }
        
    }

    async getCurrentUser() {
        try {
            const current = await this.account.get();
            //console.log("current", current);
            return current;
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            // Check if the error is a 401 (unauthorized) error
            if (error.code === 401) {
                console.log("User is not authenticated.");
            }
           
        }
        return null;
    }
    

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


