```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The request's payload is a JSON with the content and date of the note.
    server-->>browser: 201 Created
    Note right of browser: This doesn't reload the page and the browser uses the previous JavaScript code. 
```
