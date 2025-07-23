# Socket Connection Test

This section explains the integration tests that verify the connection and authentication logic for the multiuserblog WebSocket namespace.

The tests confirm that::

- Clients can successfully connect to the Socket.IO server with valid authentication

- Upon connection, the server sets the user’s status as online

- When the client disconnects, the server updates the user’s status to offline and records the last seen timestamp

- The server emits a `connected event` that includes the authenticated user’s information

## Requirements

- The test user must have an ACTIVE status

- A valid JWT token must be included in the client authentication payload

- The socket server must be running locally at http://localhost:8026/multiuserblog

## Test: Connect to the Socket Server and Set User Online

The tests ensure that when a client connects with valid credentials:

- The socket connection is established successfully

- The socket receives a unique socket ID

- The user’s isOnline status is set to true, indicating the user is online

## Test: Disconnect from the Socket Server and Set User Offline

When the client disconnects:

- The user’s isOnline status is updated to false

- The lastSeen timestamp is recorded in the database, reflecting the user’s last activity time

## Test: Connected Event Returns User Info

Upon successful connection and authentication, the server emits a `connected event` containing:

- A user object with details of the authenticated user

- This event confirms the client’s identity and completes the handshake process
