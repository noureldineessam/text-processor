
# Text Processing, User, and Reports Management APIs

This project demonstrates the implementation of text processing and user management APIs using NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

## Features

- **Text Processing API**: Analyze text content to determine the most frequent words and their frequencies.
- **User Management API**: Create, retrieve, and update user information, including email notification for report updates.

## Installation

1. Clone the repository:

    ```
    git clone <repository-url>
    ```

2. Install dependencies:

    ```
    cd <project-directory>
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Define the following environment variables:
  
        ```
        # Mailer Configuration
        EMAIL_HOST=your-smtp-host
        EMAIL_USERNAME=your-email-username
        EMAIL_PASSWORD=your-email-password
        ```

4. Run the application:

    ```
    npm run start:dev
    ```

## APIs

### Text Processing API

- **Endpoint**: `/processor`
- **Description**: Process text content to determine the most frequent words and their frequencies.
- **Method**: `POST`
- **Request Body**:
  
    ```json
    {
      "content": "Text content to process",
      "ignoredWords": ["word1", "word2"],
      "numberOfWords": 5,
      "userId": "user-id"
    }
    ```

### User Management API

- **Endpoint**: `/users`
- **Description**: Manage user information, including creation, retrieval, and updates.
- **Methods**:
  
  - `GET /users/:userId`: Retrieve user information by user ID.
  - `POST /users`: Create a new user.
  - `PATCH /users/:userId`: Update user information by user ID.

## Testing

This project includes unit tests for both text processing and user management APIs. To run the tests:

```bash
npm run test



Swagger Documentation
Swagger documentation is available for both APIs. After running the application locally, navigate to http://localhost:3000/api to explore the API documentation.