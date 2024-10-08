# Dev.io - A Blog Website for Developers

[Dev.io](https://dev-io-fe.onrender.com) is a MERN stack-based blog platform designed specifically for developers to share their knowledge, experiences, and insights.

## Features

- **Login/Signup Page**: Secure authentication system allowing users to sign up and log in.
- **Home Page**: Displays a list of all blogs, serving as the landing page.
- **Filter by Tags**: Users can filter blogs based on tags to find relevant content easily.
- **Blog Page**: Displays detailed information about a blog, including the image, title, body, likes, and comments.
- **Liked Blogs**: Users can view a list of blogs they have liked.

## Technologies Used


- **Frontend**: React.js, Material-UI
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Text Editor**: TinyMCE
- **Version Control**: Git & GitHub
- **Deployment**: Render
- **Testing**: Postman

## API Endpoints

### Auth
- `POST auth/signup`: Register a new user
- `POST auth/login`: Authenticate a user

### Users
- `GET users/:id`: Retrieve user information

### Blogs
- `POST blogs/`: Create a new blog
- `GET blogs/:id`: Retrieve a specific blog
- `GET blogs/`: Retrieve all blogs
- `GET blogs/tags`: Retrieve blogs by tags

### Comments
- `POST comments/`: Add a new comment
- `GET comments/`: Retrieve comments

### Likes
- `DEL likes/`: Remove a like
- `POST likes/`: Add a like
- `GET status/`: Get like status
- `GET :blog_id/`: Get likes for a specific blog
- `GET user/:user_id`: Get likes by a specific user

## Deployment

The application is deployed on Render. You can access it at: https://dev-io-fe.onrender.com/

## Screenshots

### Home Page
#### Laptop
![image](https://github.com/user-attachments/assets/bef94264-ec20-4077-86c9-4a7b3089042b)
#### Tablet
![image](https://github.com/user-attachments/assets/f61763e2-02d7-4556-ac70-2449d4f5de25)

#### Mobile
![image](https://github.com/user-attachments/assets/f79afb5b-d5a4-4680-b30a-ea9a725bc204)

### Blog Detail Page
#### Laptop 
![image](https://github.com/user-attachments/assets/673b285b-4d53-41af-aa11-3a17bb2b1885)

#### Tablet
![image](https://github.com/user-attachments/assets/eb2c1e6e-c44d-4431-ac93-a48a8b0cae6c)

#### Mobile
![image](https://github.com/user-attachments/assets/daca1823-739d-4670-a7b3-266bd079a39a)


### Favourites Page
#### Laptop 
![image](https://github.com/user-attachments/assets/20a60568-274c-4544-bb27-a8d09a41b58f)

#### Tablet 
![image](https://github.com/user-attachments/assets/883cd414-9357-4dc6-a06f-6c40280bdc7f)

#### Mobile
![image](https://github.com/user-attachments/assets/345a9a8f-1497-47e4-9d21-96e819ef5ec7)



## Local Setup

1. Clone the repository:
   ```
   git clone https://github.com/parthkaul-bit/dev.io-prod.git
   ```
2. Install dependencies:
   ```
   cd dev.io-prod
   npm install
   ```
3. Set up environment variables (create a `.env` file in the root directory):
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TINY_MCE_API_KEY = your_tiny_mce_api_key
   ```
4. Run the development server:
   ```
   npm run dev
   ```
## Contact Information
For any questions or suggestions, feel free to reach out to me at pkaul432@gmail.com.
