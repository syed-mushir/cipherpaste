# CipherPaste

CipherPaste is a secure, temporary text-pasting service that encrypts your content in the browser using AES-256-GCM encryption. Built with Node.js, it ensures your data remains private and is only accessible for a limited time and to only you.

**Demo URL - https://paste.mushir.dev/**

---

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v22+ , LTS recommended)
- npm (included with Node.js)
- Redis (v8+)

---

## Setting Enviornment Variables

- Copy .env.example file to .env by running
- ```cp .env.example .env```
- ```nano .env```
- Enter all the enviornment variables
- Save the file

--- 

## Installation Commands

- ```npm install```

- ```npm start```

- Project will start running on the PORT you entered in the .env file, after that you can forward that port on your DOMAIN & all set!

---

## ⚠️ Data Loss

All pastes may be lost if the server restarts or shuts down, as this project uses Redis, which stores data in memory by default.

---

Thank you ❤️

— Syed Mushir
