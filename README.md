# Functionalities

Functionalities is a collection packages for the backend and frontend that aims to make developers lives a tad bit easier. The packages functionalities aims to provide are focused on utility, flexibility and ease of use in the hope you never have to implement your own versions of these packages in your projects ever again.

## Backend Packages:

- [@functionalities/mediakit](/packages/mediakit/README.md)

## Frontend Packages

A core principle for these packages is that they should be easy to use, accessibility first, and if suitable: configured primarily in HTML markup to reduce the weight of your JS bundle. 

For the same reason, despite being a JS package, we aim to use web standards over creating new implementations that effectively achieve the same thing. Two examples of this are: the @formhandler package makes use of browser built-in form validation, and @animations, which at its core toggles classes. You are required to implement your transitions in CSS.

- [@functionalities/disclosure](/packages/disclosure/README.md)
- [@functionalities/toggler](/packages/toggler/README.md) 
- [@functionalities/animations](/packages/animations/README.md)
- [@functionalities/stickyheader](/packages/stickyheader/README.md)
- [@functionalities/formhandler](/packages/formhandler/README.md)