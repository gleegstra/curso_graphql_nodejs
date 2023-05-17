import jwt from "jsonwebtoken";
import {userModel} from "../src/models/user.model";
import { config } from "../config/config";
import { GraphQLError } from "graphql";

export const tools = {
    auth:async function (token:any) {
        try {
            let currentUser, decodedInfo:any|undefined;
            if(!token) {
                return {};
            }
            decodedInfo = jwt.verify(token, config.SECRET_TOKEN);
            if (token && decodedInfo){
                currentUser = await userModel.findOne({_id:decodedInfo.id});
                if (!currentUser) throw new GraphQLError ("you must be logged in to query this schema", {
                    extensions: {
                      code: 'UNAUTHENTICATED',
                    },
                  });
            }
            return currentUser;
        } catch (e) {
            console.log(e);
        }

    }
}