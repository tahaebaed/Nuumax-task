# Getting Started

this task talks about creating login auth for admin and user with different screen for each of them
## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the needed pancakes.
you will need [Node js](https://nodejs.org/en) to be installed

```bash
npm insall
```

## Usage
- you will need to login through login screen with on of these emails
```python
"email": "admin@example.com"
"password": "password"

"email": "user@example.com"
"password": "password"
```
and you will need to run this command before starting the JSON server
```bash
json-server --watch db.json
```