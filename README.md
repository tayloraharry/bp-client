## Blueprint Coding Exercise

### Hosted Application
You can access the live version of the application [here](https://main.d3ig8tc0zwl0rb.amplifyapp.com/)

### Running the Code Locally

To run the code locally, follow these steps:

1. **Clone the  front-end repository**:
```
  $ git clone https://github.com/tayloraharry/bp-client.git
```
2. **Navigate to the project directory**:
```
$ cd bp-client
```

3. **Install dependencies**:
```
$ yarn //or npm install
```
4. **Start the development serve**:
```
$ yarn dev //or npm run dev
```
4. **Open your browser**

 The application should now be running locally at [ http://localhost:3000]( http://localhost:3000)



1. **Clone the  back-end repository**:
```
  $ git clone https://github.com/tayloraharry/bp-server.git
```
2. **Navigate to the project directory**:
```
$ cd bp-server
```

3. **Install dependencies**:
```
$ yarn //or npm install
```

3. **Add a .env file in the root of the project with the following variable defined **:
```
$ MONGO_DB_URI=[INSERT CONNECTION STRING HERE]
```

4. **Start the development serve**:
```
$ sls offline start
```
4. **Open your browser**

 The application should now be running locally at [ http://localhost:3000]( http://localhost:3000)

### Problem ###
The exercise simulates a real-world scenario where engineers build both front-end and back-end components of a feature. The challenge involves creating a system for administering standardized clinical assessments via a web interface and automating the assignment of assessments based on patient responses.

### Solution ###
#### Backend: ####
 Developed a NestJS API to accept and score patient screener responses, returning appropriate Level-2 Assessments.
#### Front-End: ####
Created a React-based UI using React Query and MUI, guiding patients through the screener one question at a time. The application is deployed using AWS Amplify for the front-end and Serverless (AWS Lambda and API Gateway) for the back-end.
#### Reasoning Behind Technical Choices: ####
1. React: Chosen for its component-based architecture, allowing for modular and reusable code.
2. React Query: Simplifies data fetching, caching, and synchronization, ensuring the UI stays updated with minimal boilerplate.
3. MUI: Provides a comprehensive set of pre-built, visually appealing components, speeding up the UI development process.
4. NestJS: Selected for its robust, modular architecture, making it a great choice for building scalable and maintainable backend applications with strong TypeScript integration.
5. AWS Amplify: Used for rapid front-end deployment during development. However, a more customizable solution would be used in production.
6. Serverless (AWS Lambda & API Gateway): Ensures scalability, cost efficiency, and ease of deployment without managing servers.
MongoDB: A highly available MongoDB database is chosen for its strong consistency, automatic failover, and horizontal scaling.

### Production Deployment Strategy ###
#### High Availability and Performance Front-End: ####

1. Alternative to AWS Amplify: While AWS Amplify is excellent for rapid development, I would likely not use it in a production environment due to its limitations in customization and scaling. Instead, I would use AWS S3 for static hosting and CloudFront as a CDN, or a containerized solution on AWS ECS or Kubernetes.

2. Multi-Region Deployment: Deploy the front-end across multiple AWS regions to ensure redundancy and reduce latency.

3. Content Delivery Network (CDN): Utilize Amazon CloudFront to serve the front-end assets, improving load times by caching content closer to users.

#### Back-End: ####

1. Auto-Scaling: AWS Lambda’s auto-scaling handles spikes in demand automatically.
API Gateway Caching: Reduce backend load and improve response times for frequently accessed data.
2. Database: A highly available MongoDB database ensures resilience and can handle increased load without sacrificing performance.

### Security ###
Front-End:

1. HTTPS Everywhere: Enforce HTTPS to encrypt all data transmitted between the client and server.
Content Security Policy (CSP): Implement a strict CSP to prevent XSS attacks.
Back-End:

2. API Authentication and Authorization: Implement OAuth 2.0 or JWTs for secure API access, and RBAC for permission control.

3. Data Encryption: Encrypt sensitive data both in transit and at rest using AWS KMS.

4. Web Application Firewall (WAF): Deploy AWS WAF to protect the backend from common web exploits.

5. Monitoring and Troubleshooting: Logging: Use AWS CloudWatch Logs for collecting and monitoring logs.

6. Tracing: Implement distributed tracing with AWS X-Ray to trace requests and identify bottlenecks.

7. Health Checks and Monitoring: Set up health checks and use AWS CloudWatch Alarms for real-time alerts.

8. Error Reporting: Integrate with Sentry or Rollbar for real-time error reporting and diagnostics.


### Trade-Offs and Future Improvements ###
1. Time Constraints: Focused on core functionality and deferred advanced features and optimizations.

2. Front-End Deployment: Used AWS Amplify for simplicity, with plans for a more scalable solution in production.

3. Performance Optimizations: Conduct performance audits and optimize where necessary.
User Experience Enhancements: Refine the UI, especially for mobile users, with added responsiveness.

4. User Authentication
An initial screen is added when starting a screener that requires a user’s last name and date of birth (DOB). This allows the application to save progress and retrieve results from previous screeners, serving as a simple form of authentication.
