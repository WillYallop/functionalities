# Form Handler - v1.1.0

Form Handler is a frontend library made to make input validation in forms easier. It handles submissions, error handling, flash messages, and recaptcha with Clourflares Turnstile and Google Recaptcha V2.

## Features

- Uses browser input/form validation API.
- Extends built in validation rules with custom validation.
- Supports file uploads.
- Has a flash message module.
- Supports Cloudflares Turnstile Recaptcha.
- Supports Google Recaptcha V2.

## Install

```
npm install @functionalities/formhandler --save
```

## Initialise in JS/TS

```typescript
import FormHandler from "@functionalities/formhandler";

new FormHandler("#form");
```



## Markup

```html
<form id="form" action="http://localhost:4646/form" method="post">
  <div data-input-relation="name">
    <input type="text" placeholder="Name" name="name" required />
    <div class="error-container">
      <p data-input-error="name"></p>
    </div>
  </div>
  <div data-input-relation="email">
    <input type="email" placeholder="Email Address" name="email" required />
    <div class="error-container">
      <p data-input-error="email"></p>
    </div>
  </div>
  <input type="submit" value="Submit" class="submit" />
</form>
```


## Attributes

### `data-input-relation`

If this attribute is present on an element, whenever the input with the same name fails, the error class will get applied to it.

### `data-input-error`

An element with this attribute will have its innerHTML set to the first error message that corresponds to the input on validation failing.



## Recaptcha

We currently support [Cloudflare's Turnstile](https://developers.cloudflare.com/turnstile/) and [Google Recaptcha V2](https://developers.google.com/recaptcha/docs/invisible) for our Recaptcha. These will append the corresponding script to the site and handle loading and refreshing Recaptcha tokens.

> This is an optional module.

### Turnstile

Import and initialise the Turnstile class and pass it to your FormHandler instance. This requires one parameter which is the site key.

```typescript
import FormHandler, { Turnstile } from "@functionalities/formhandler";

new FormHandler("#form", {
  recaptcha: new Turnstile("site_key")
});
```

> This will be accessible on the backend on the body through the `cf-turnstile-response` key.

### Google Recaptcha V2 (invisible)

Import and initialise the GoogleV2 class and pass it to your FormHandler instance. This requires one parameter which is the site key.

```typescript
import FormHandler, { GoogleV2 } from "@functionalities/formhandler";

new FormHandler("#form", {
  recaptcha: new GoogleV2("site_key")
});
```

> This will be accessible on the backend of the body through the `g-recaptcha-response` key.



## Flash Message

An optional module that allows messages to be toggled on the DOM. It is up to you to style.

```typescript
import FormHandler, { FlashMessage } from "@functionalities/formhandler";

new FormHandler("#form", {
  flashMessage: new FlashMessage("#flash-message", 5000)
});
```

```html
<div id="flash-message">
  <p data-flash-message-message></p>
  <button data-flash-message-close>Close</button>
</div>
```

### `data-flash-message-close`

Any element with this attribute that resides in the flash message container, will have a click event set that will close the popup.

### `data-flash-message-message`

One element should have this attribute set. The innerHTML of this element will be set to the message.

### Classes

- When the flash message is active a class of `is-active` will be set on the container.
- If the message is a successful one, the container will have a class of `is-success` set on it.
- If it's of type error, the container will have a class of `is-error` set on it.

## Config

Here is the config typescript interface:

```typescript
interface Config {
  recaptcha?: Turnstile | GoogleV2;
  resetOnSuccess?: boolean;
  flashMessage?: FlashMessage;
  disableSubmit?: boolean;
  validate?: {
    onChange?: boolean;
    onSubmit?: boolean;
  };
  localisation?: {
    validationError?: string;
    error?: string;
    success?: string;
  };
  errorClass?: string;
  action?: string;
  customValidation?: Array<CustomValidation>;
  attributes?: {
    inputRelation?: string;
    inputError?: string;
  };
  onSuccess?: (form: HTMLFormElement, res: any) => void;
  onError?: (form: HTMLFormElement, res: any) => void;
}
```

### recaptcha

This has been covered [here](#recaptcha).

> default: undefined

### resetOnSuccess

If enabled the form will reset on success.

> default: true

### flashMessage

This has been covered [here](#flash-message).

> default: undefined

### disableSubmit

If enabled this will set the disabled attribute on all of the form submit inputs when it is loading.

> default: true

### validate

- If onChange is true, when an input is changed it will validate that input using the Javascript Validation API.
- If onSubmit is true when the form is submitted all inputs will be validated before sending off the request.

> default: both set to true

### localisation

The default messages are passed to the FlashMessage instance.

- validationError: 'There was a problem validating your form data, please try again.'
- error: 'There was an error with your submission.'
- success: 'Thank you for your submission.'

### errorClass

The default error is appended to all invalid inputs, input relations, and input error elements.

> default: 'error'

### action

This is the URL used on the POST request. It defaults to the action attribute set on the form element, but if not present it will either use this or an empty string.

> default: the forms action value or an empty string

### customValidation

This allows you to define custom validation beyond what the browser has built in. Here is an example:

```typescript
import FormHandler from "@functionalities/formhandler";

new FormHandler("#form", {
  customValidation: [
    {
      name: "firstName", // this is your inputs name
      validator: (value) => {
        if (value === "John") return ""; // '' represents no error
        else return "Validation failed. First name is not equal to 'John'."; // this is your error
      },
    },
  ],
});
```

### attributes

This allows you to update the default attributes used to define an input relation and an input error element.

- inputRelation: 'data-input-relation'
- inputError: 'data-input-error'

### onSuccess

On successful submission, this callback is fired. It receives the form and the response from the POST request as its parameters. You can use this to extend some functionality.

> default: undefined

### onError

On a failed submission this callback is fired. It receives the form and the response from the POST request as its parameters. You can use this to extend some functionality.

> default: undefined