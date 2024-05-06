
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

## User Input and Report Viewing HTML Pages

This repository contains several HTML files located in the `views` folder, each serving a different purpose for user input and report viewing. These HTML files are very simple and are just to demo the functionality Below are the descriptions of these HTML files:

1. **user-input.html**: This HTML file provides a simple user interface for creating a user and processing text. It includes input fields for the user's email, text content, list of ignored words, and the number of words to be processed. The user can create a new user and then process text, which will fetch the most repeated words from the processed text.

2. **get-single-report.html**: This HTML file allows users to input a report ID and fetch the corresponding report from the server. It includes an input field for the report ID and a button to submit the request. Upon submitting the form, the report details are displayed, showing the words and their respective counts.

3. **get-reports-by-email.html**: This HTML file enables users to send a report by providing the report ID. It includes an input field for the report ID and a button to send the report. Upon submission, the report is sent to the user's email address associated with the provided report ID.

These HTML files provide intuitive interfaces for users to interact with the application, allowing them to create users, process text, view reports, and send reports via email.


## APIs

Swagger Documentation
Swagger documentation is available for both APIs. After running the application locally, navigate to
``` 
http://localhost:3000/api
``` 
to explore the API documentation.

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
