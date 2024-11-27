I've made several projects where I've incorporated Authentication and Authorization: 

1. Deployed link : https://travelitenary.vercel.app/ , Github link : https://github.com/karthik11135/travelitenary ( Used NextAuth )
2. Deployed link : https://socialize-eosin.vercel.app , Github link : https://github.com/karthik11135/socialize ( Used clerk )
3. Deployed link : https://next-blog-iota-two.vercel.app/ , Github link : https://github.com/karthik11135/nextBlog ( Used NextAuth )

However I've not made any project where Role based access control was necessary. Hence I've made a new NextJS application focussing on all three aspects. 

This is a NEXTJS + Typescript + Postgres + TailwindCSS project which implements Authentication, Authorization and Role based Access control. 

I've deployed the website here : https://rbcadassignment.vercel.app/


(email, password)

USER CREDENTIALS : user1@gmail.com , 123456

MODERATOR CREDS  : moderator8@gmail.com , 123456

ADMIN CREDS      : admin@gmail.com , 123456

Oauth : Google, Github. 


Role-Based Access Control (RBAC) System

This project implements a secure Authentication, Authorization, and Role-Based Access Control (RBAC) system using Next.js, NextAuth.js, and manual email-based authentication. It ensures that users can securely log in, register, and access resources based on their assigned roles.

Features

Authentication:

OAuth integration using NextAuth.js for services like Google, Github.
Custom email-based authentication with secure cookies (this was manually implemented).

Authorization:

Users are assigned one of the following roles upon registration and they are checked when they are accessing specific endpoints:
Admin, User and Moderator
Access to resources and routes is restricted based on roles.


RBAC:

Admin: Can delete users and demote moderators to users.

Moderator: Can look at all the other users.

User: Can read the welcome message.


# How does the app work 

A user can sign up using their email and password or choose an Outh option which is Google or Github in this case. When the user signs up, their id and their role (user or moderator or admin) is stored in a jwt token and is sent to the client using cookies. Client can access routes if they have the cookie and otherwise not. Server always checks if the correct token is sent by verifying it. Passwords are hashed using bcrypt library before storing in the database. I've used NextAuth to implement Oauth and have used tailwind component libraries to make the website look decently well.
