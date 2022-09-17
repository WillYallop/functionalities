# Form Handler - v1.0.0

Form handler is a wrapper for sending and handling form errors and successes. It uses the browser's built-in input validation to check the form before using your custom submit function to send off the form. We don't inject error messages or markup so as to not limit the style and design of your website. All failed inputs will be passed down to the onError callback function that you set when initialising the class.

It also has support for external validation if you do not wish to use the browsers.

## Install

```
npm install @functionalities/formhandler --save
```

## Example

Below is a simple example of how you could use @formhandler. The only required value is the submitForm callback, but if you wished to add the input error messages onto the form, you would need to add that into the onError callback. 

```typescript
import FormHandler from "@functionalities/formhandler";

new FormHandler("#form", {
  onError: (errors) => {
    console.log("errors", errors);
  },
  submitForm: async (form) => {
    // on success
    const action = form.getAttribute("action");
    const method = form.getAttribute("method");
    if (action && method) {
      const res = await fetch(action, {
        method,
        body: new FormData(form),
      });
      if (res.ok) {
        return {
          success: true,
          message: "Form submission successful",
        };
      } else {
        return {
          success: false,
          message: "Form submission failed",
        };
      }
    }
    return {
      success: false,
      message: "The form must have an action and method attribute",
    };
  },
});
```

> Note this example fetches the action and method attribute from the form. It's up to you, but this setup means the form would still work if a user visited your site without JS enabled!

```html
<form
    id="form"
    action="http://localhost:4646/forms/submit"
    method="post"
>
    <!-- first name -->
    <input
        type="text"
        placeholder="First Name"
        name="firstName"
        minlength="5"
        required
    />
    <div data-input-relation="firstName"></div>
    <!-- email -->
    <input
        type="email"
        placeholder="Email Address"
        name="email"
        required
    />
    <div data-input-relation="email"></div>
    <!-- telephone -->
    <input
        type="tel"
        placeholder="Telephone"
        name="telephone"
        required
    />
    <div data-input-relation="telephone"></div>
    <!-- form status -->
    <div class="form-status" data-form-status>
        <p data-form-message></p>
    </div>
    <!-- submit -->
    <input data-form-submit type="submit" value="Submit" />
</form>
```

> Use HTML validation attributes on inputs to set your constraints

## Config

```typescript
new FormHandler("#form", {
    validateOnChange: false,
    externalValidation: false,
    errorClass: "error",
    customValidation: [],
    reset: true,
    showMessageDuration: 3000,
    onError: (errors) => {},
    submitForm: async (form) => {
        return {
            success: false,
            message: "The form must have an action and method attribute",
        };
    },
});
```

### validateOnChange

If set to true, on the form change event (fires when exiting an input) this will run the internal validate method against the input you updated. This validation method uses the browser's built-in form/input validation to check if the input's value you entered fits within the constraints you have set on the input through attributes such as required, minlength etc.

> If you have externalValidation set to true, this value will be ignored.

### errorClass

This is the class that is applied to all failing inputs and elements with an attribute of  ``data-input-relation`` that has the value of the input's name.

### customValidation

This allows you to define custom validation beyond what the browser has built-in. Here is an example:

```typescript
new FormHandler("#form", {
    customValidation: [
        {
            name: 'firstName', // this is your inputs name
            validator: (value) => {
                if(value === 'John') return ''; // '' represents no error
                else return 'Validation failed. First name is not equal to John.' // this is your error
            }
        }
    ],
    submitForm: async (form) => {
        return {
            success: true,
            message: "Pass",
        };
    },
});
```

### reset

If set to true, on a successful form submission, all form inputs will be reset. This also handles whether or not we hide the success message after the showMessageDuration has run its course.

### showMessageDuration

This defines how long a success message should be visible before being removed. This has to have the reset value set to true for it to hide the success message.

### onError

This is a callback function that receives an array of objects containing all of the failed inputs. It is on you to implement a solution to display this on the form if that's what you want. Here is an example of the data it receives.

```typescript
new FormHandler("#form", {
    onError: (errors) => {
        /*
            errors: [
                {
                    name: 'firstName',
                    message: 'Please fill in this field.',
                    valid: false,
                },
                {
                    name: 'email',
                    message: 'Please fill in this field.'.
                    valid: false,
                }
            ]
        */
    },
});
```

> The messages received are the default browser messages. You can either use these to explain the reason an input failed, or you could create your own.

### submitForm

This callback is responsible for sending off the form data. This is called when a user clicks a submit input/button and it returns a form element as its only parameter. You must return an object in this to tell the package if it was successful, and what message should it display.

```typescript
new FormHandler("#form", {
  onError: (errors) => {
    console.log("errors", errors);
  },
  submitForm: async (form) => {
    // on success
    const action = form.getAttribute("action");
    const method = form.getAttribute("method");
    if (action && method) {
      const res = await fetch(action, {
        method,
        body: new FormData(form),
      });
      if (res.ok) {
        return {
          success: true,
          message: "Form submission successful",
        };
      } else {
        return {
          success: false,
          message: "Form submission failed",
        };
      }
    }
    return {
      success: false,
      message: "The form must have an action and method attribute",
    };
  },
});
```

If you have the externalValidation value set to true, you need to handle return errors in this as well. An example of this response looks like this:

```typescript
const externalValidationExample = new FormHandler("#form", {
    externalValidation: true,
    submitForm: async (form) => {
        const res = await fetch(action, {
            method,
            body: new FormData(form),
        });
        const data = await res.json();
        if (data.errors) {
            return { success: false, errors: data.errors }; // this data.errors value is accessible in the onErrors callback - see bellow
        } 
        else {
            return {
                success: true,
                message: "Form submitted successfully",
            };
        }
    },
    onError: (errors) => {
        for (let key in errors) {
            externalValidationExample.setInputError(key); // the set input error method requires an input name.
        }
    },
});
```

### externalValidation

If you want to use your own validation instead of the browser's built-in system for it. Set this value to true. In doing so this ships some more responsibility to you when it comes to the submitForm and onError callbacks.

For example, with the submitForm callback, you now can now return an extra errors value, this will be passed to the onError callback where you can handle it there. In the onError callback, you will need to use the public setInputError method that the FormHandler class exposes. Here is an example:

```typescript
const externalValidationExample = new FormHandler("#form", {
    externalValidation: true,
    submitForm: async (form) => {
        const res = await fetch(action, {
            method,
            body: new FormData(form),
        });
        const data = await res.json();
        if (data.errors) {
            return { success: false, errors: data.errors }; // this data.errors value is accessible in the onErrors callback - see bellow
        } 
        else {
            return {
                success: true,
                message: "Form submitted successfully",
            };
        }
    },
    onError: (errors) => {
        for (let key in errors) {
            externalValidationExample.setInputError(key); // the set input error method requires an input name.
        }
    },
});
```

## Attributes

### data-input-relation

Adding this attribute to an element within the form will link it to a specific input. All it needs to the value to be set to the inputs name. Any element that has this, will also get the errorClass applied to it if its corresponding input fails validation.

```html
<div data-input-relation="firstName">
    <input
        type="text"
        placeholder="First Name"
        name="firstName"
        minlength="5"
        required
    />
    <div data-input-relation="firstName">
        <!-- Use the onError callback to add errors here, and use the error class on this element to show/hide it -->
    </div>
</div>
```
> You can have as many as you like all with the same name.

### data-form-submit

This should be placed on the form submit input/button. It is used to add and remove the disabled attribute so you cannot trigger the form again if it is still processing.

```html
<input data-form-submit type="submit" value="Submit" />
```

### data-form-status

Any element with this attribute on it will have its data-form-status value updated depending on the state of the form. It can have the following values:

- data-form-submit=""
- data-form-submit="loading"
- data-form-submit="error"
- data-form-submit="success"

You can use this in your CSS to show and hide certain content. For instance, you could use it to display a loading state or hide the data-form-message.

```html
<div class="form-status" data-form-status>
    <p class="form-status__message" data-form-message></p>
    <p class="form-status__loading">Loading</p>
</div>
```

### data-form-message

Any element with this attribute will have its innerHTML set to the message response value of the submitForm callback.

## Notes

- To find examples of this, check out the repo that the package is a part of and find the ``/apps/playground-fr`` directory!
- This shouldn't be used in any JS framework that has a virtual DOM!