# Postman API Fundamentals Student Expert <img align="right" width="200" height="200" alt="Postman - Postman API Fundamentals Student Expert - 2025-11-22" src="https://github.com/user-attachments/assets/620ba291-22d7-4434-9d1b-c80cbbd24969" />

This repository contains my **Postman API Fundamentals Student Expert Certification** project completed as a **Web Engineering Lab** task at my university.

**Student:** Redwan Rahman  
Department of Computer Science and Engineering  
Daffodil International University   
**Course Name:** Web Engineering Lab  
**Course Code:** CSE416

**Lab Instructor:**  
Mr. Md. Alvee Ehsan  
Lecturer, Department of Computer Science and Engineering  
Daffodil International University  
https://faculty.daffodilvarsity.edu.bd/profile/cse/alveehsan.html

**Fork Link for Evaluation:**  
[Postman API Fundamentals Student Expert Test Collection](https://www.postman.com/postman-student-programs/postman-api-fundamentals-student-expert-test-your-collection/collection/21521806-59fdb8a1-f928-43c0-b3f7-04fbc987c9f4/collection-test/fork?origin=tab)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [API Endpoints Implemented](#api-endpoints-implemented)
- [File Structure](#file-structure)
- [Key Learning Outcomes](#key-learning-outcomes)
- [Technical Implementation](#technical-implementation)
- [Automation & Scripting](#automation--scripting)
- [How to Use](#how-to-use)

## 🎯 Project Overview

This project demonstrates mastery of API testing and automation using Postman. The implementation includes comprehensive testing of a library management system API with full CRUD operations, authentication, and advanced scripting features.

### Core Features Implemented:

- ✅ Complete CRUD operations for book management
- ✅ Query parameter filtering and search functionality
- ✅ Dynamic variable management and data persistence
- ✅ API authentication with API keys
- ✅ Automated testing with pre/post-request scripts
- ✅ Collection organization and documentation

## 🔗 API Endpoints Implemented

### 1. **Get All Books**

- **Method:** `GET`
- **URL:** `{{baseUrl}}/books`
- **Description:** Retrieve all books from the library collection
- **Query Parameters:** None

### 2. **Get Fiction Books (Filtered)**

- **Method:** `GET`
- **URL:** `{{baseUrl}}/books`
- **Description:** Retrieve fiction books that are not checked out
- **Query Parameters:**
  - `genre=fiction`
  - `checkedOut=false`

### 3. **Get Book by ID**

- **Method:** `GET`
- **URL:** `{{baseUrl}}/books/:id`
- **Description:** Retrieve a specific book using its unique identifier
- **Path Variables:** `:id` (replaced with actual book ID)

### 4. **Add New Book**

- **Method:** `POST`
- **URL:** `{{baseUrl}}/books`
- **Description:** Add a new book to the library collection
- **Body (JSON):**

```json
{
  "id": "123",
  "title": "Sahih al-Bukhari",
  "author": "Imam Muhammad ibn Ismail al-Bukhari",
  "genre": "hadith-collection",
  "yearPublished": 846
}
```

- **Post-Request Script:** Saves book ID to collection variable

### 5. **Checkout Book**

- **Method:** `PATCH`
- **URL:** `{{baseUrl}}/books/:id`
- **Description:** Update book status to checked out
- **Body (JSON):**

```json
{
  "checkedOut": true
}
```

### 6. **Delete Book**

- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/books/:id`
- **Description:** Remove a book from the library collection
- **Path Variables:** `:id` (uses saved collection variable)

### 7. **Skill Check Endpoint**

- **Method:** `POST`
- **URL:** `{{skillcheckBaseUrl}}/post`
- **Description:** Certification validation endpoint
- **Query Parameters:** `movieName=Kingdom of Heaven`
- **Authorization:** API Key (`student-expert: skillcheck`)
- **Body (JSON):**

```json
{
  "actorName": "Orlando Bloom"
}
```

- **Post-Response Script:** Saves `actorName` as `favoriteActor` variable

## 📁 File Structure

```
postman-api-fundamentals-student-expert/
├── Request JSON/                    # API request specifications
│   ├── get-all-books.json          # Get all books request
│   ├── get-fiction-books.json      # Get filtered fiction books
│   ├── get-book-by-id.json         # Get book by ID request
│   ├── add-book.json               # Add new book request
│   ├── checkout-book.json          # Checkout book request
│   ├── delete-book.json            # Delete book request
│   └── skillcheck.json             # Skill check request
├── Scripts/                        # Postman automation scripts
│   ├── save id.js                  # Script to save book ID
│   ├── skillcheck.js               # Skill check automation
│   ├── postman test script.js      # General testing script
│   ├── final check.js              # Final validation script
│   └── halfway check.js            # Intermediate validation
├── Response Examples/              # API response samples
│   ├── add book response.json      # Sample add book response
│   ├── Sahih Bukhari.json          # Book data example
│   └── checkout.json               # Checkout response example
└── README.md                       # Project documentation
```

## 🎓 Key Learning Outcomes

### **API Fundamentals**

- Understanding of RESTful API principles and HTTP methods
- Mastery of request-response lifecycle and status codes
- Proper handling of JSON payloads and data structures
- Knowledge of API endpoints, paths, and parameter usage

### **Postman Proficiency**

- Advanced collection and request organization
- Efficient use of environment and collection variables
- Query parameter manipulation and path variable usage
- Response interpretation and data extraction techniques

### **Authentication & Security**

- Implementation of API key authentication
- Understanding of request-level authorization
- Secure handling of credentials and sensitive data

### **Automation & Scripting**

- Pre-request script implementation for dynamic data
- Post-response script automation for data persistence
- JavaScript-based testing and validation logic
- Variable management and data flow between requests

### **Testing & Validation**

- Comprehensive API endpoint testing strategies
- Status code validation and error handling
- Response data verification and extraction
- Automated test suite development

## ⚙️ Technical Implementation

### **Variable Management**

The project implements sophisticated variable management:

- **Collection Variables:** `id`, `favoriteActor`
- **Environment Variables:** `baseUrl`, `skillcheckBaseUrl`
- **Dynamic Data Flow:** Automatic ID capture and reuse across requests

### **Authentication Strategy**

- **API Key Authentication:** Implemented at request level
- **Key-Value Pairs:** `student-expert: skillcheck`
- **Secure Credential Management:** No hardcoded sensitive data

### **Data Persistence**

- Automatic extraction and storage of response data
- Cross-request data sharing through collection variables
- Persistent state management across test sessions

## 🔄 Automation & Scripting

### **Post-Request Scripts**

**Save Book ID Script (`save id.js`):**

```javascript
// Save the "id" value from the response to a variable named "id"
const id = pm.response.json().id;
// Save the id as a collection variable named "id"
pm.collectionVariables.set("id", id);
```

**Skill Check Script (`skillcheck.js`):**

```javascript
// Parse the JSON response
const jsonData = pm.response.json();

// Check if actorName exists in the response
if (jsonData.json && jsonData.json.actorName) {
  // Save it as a collection variable named "favoriteActor"
  pm.collectionVariables.set("favoriteActor", jsonData.json.actorName);
  console.log("favoriteActor variable set to:", jsonData.json.actorName);
} else {
  console.warn("actorName not found in response");
}
```

## 🚀 How to Use

1. **Import Collection:** Import the Postman collection using the fork link provided
2. **Set Environment:** Configure `baseUrl` and `skillcheckBaseUrl` variables
3. **Run Requests:** Execute requests in sequence for proper data flow
4. **Monitor Variables:** Check collection variables for automatically saved data
5. **Validate Responses:** Review response data and status codes
6. **Execute Scripts:** Post-request scripts will automatically manage variables

## 🏆 Certification Achievement

This project successfully demonstrates all required competencies for the **Postman API Fundamentals Student Expert** certification, including:

- ✅ API request creation and execution
- ✅ Response handling and data extraction
- ✅ Variable management and automation
- ✅ Authentication implementation
- ✅ Script-based testing and validation
- ✅ Collection organization and documentation
