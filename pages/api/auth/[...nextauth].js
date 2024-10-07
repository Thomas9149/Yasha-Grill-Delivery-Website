import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../util/mongo";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";
dbConnect();


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
});

// export default NextAuth({
//   /*  adapter: MongoDBAdapter(clientPromise), */
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials.email;
//         const password = credentials.password;
//         const user = await User.findOne({ email: email });
//         if (!user) {
//           throw new Error("You haven't registered yet!");
//         }
//         if (user) {
//           return signInUser({ user, password });
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   database: process.env.MONGODB_URI,
//   secret: "secret",
// });
//
// const signInUser = async ({ user, password }) => {
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Incorrect password!");
//   }
//   return user;
// };
