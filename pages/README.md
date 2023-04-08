# Blogify

Blogify is a blogging application built using Next.js, Firebase, and TailwindCSS. The application allows users to create an account, write, edit and publish blog posts, and read posts written by other users.

## Table of Contents

1. Installation
2. Features
3. Project Structure

## Installation

To run the application locally, you must have Node.js and npm installed on your system. Follow the steps below to get started:

1. Clone the repository using the command below:

   ```bash
   git clone https://github.com/RaghavT5/blogify.git
   ```

2. Install the dependencies:

   ```bash
   cd blogify
   npm install
   ```

3. Create a Firebase project and configure it. Add your Firebase configuration to `firebase-config.js` in the src directory.

4. Run the development server

   ```bash
   npm run dev

   ```

5. Visit http://localhost:3000 to view the application.

## Features

- User authentication (Sign Up, Sign In, Sign Out)
- Create, Edit, and Publish blog posts
- Read blog posts written by other users
- Categorize blog posts
- Delete blog posts
- Add Comments

## Project Structure

    ```html
    ├── components
    │   ├── CommentForm
    │   ├── CommentsSection
    │   ├── LatestPostsSection
    │   ├── NavBar
    │   ├── SearchBar
    │   └── TrendingSection
    ├── pages
    │   ├── _app.js
    │   ├── _document.js
    │   ├── creatpost
    │   ├── editpost
    │   ├── categories
    │   ├── index.js
    │   ├── signin
    │   ├── searchresults
    │   └── signup
    ├── public
    │   └── firebase-config.js
    ├── styles
    └── README.md
    ```
