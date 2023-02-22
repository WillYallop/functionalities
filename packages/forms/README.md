# Forms - v1.2.1

Forms is a front-end library designed to facilitate input validation in forms. It handles form submissions, error handling, flash messages, and Recaptcha integration with Cloudflare's Turnstile and Google Recaptcha V2. All validation rules are managed through input attributes like "required," "minlength," "pattern," etc., which are set in the markup.

## Features

- Uses browser input/form validation API.
- Extends built-in validation rules with custom validation.
- Supports file uploads.
- Includes a flash message module.
- Supports Cloudflare's Turnstile Recaptcha.
- Supports Google Recaptcha V2.

## Install

```
npm install @functionalities/forms --save
```

## Initialise in JS/TS

```typescript
import Forms from "@functionalities/forms";

new Forms("#form");
```

## Markup

```html
<form id="form" action="http://localhost:4646/form" method="post">
  <div data-i-relation="name">
    <input type="text" placeholder="Name" name="name" required />
    <div class="error-container">
      <p data-i-error="name"></p>
    </div>
  </div>
  <div data-i-relation="email">
    <input type="email" placeholder="Email Address" name="email" required />
    <div class="error-container">
      <p data-i-error="email"></p>
    </div>
  </div>
  <input type="submit" value="Submit" class="submit" />
</form>
```

## Attributes

### `data-i-relation`

When this attribute is present on an element, the error class gets applied to the input element with the same name, whenever the input fails.

### `data-i-error`

The first error message that corresponds to the input on validation failure is set as the innerHTML of the element that has this attribute.

### `accept`

By default, the accept attribute does not work with the browser input validation API. It simply tells the file browser window what files can be selected. This library extends this functionality so that if it is present, an error will be returned if the uploaded file does not match one of the values.

### `accept-max`

A new attribute for files that specifies the maximum file size. This value must be in KB. For example, 1MB is equal to 1024KB. This works on each file uploaded if the input has the multiple attribute.

### `accept-min`

A new attribute for files that specifies the minimum file size. This value must be in KB. For example, 1MB is equal to 1024KB. This works on each file uploaded if the input has the multiple attribute.

## Recaptcha

This is an optional module.

### Turnstile

Import and initialise the Turnstile class and pass it to your Forms instance. This requires one parameter which is the site key.

Read more about [Cloudflare's Turnstile](https://developers.cloudflare.com/turnstile/).

```typescript
import Forms, { Turnstile } from "@functionalities/forms";

new Forms("#form", {
  recaptcha: new Turnstile("site_key")
});
```

> This will be accessible on the backend on the body through the `cf-turnstile-response` key.

### Google Recaptcha V2 (invisible)

Import and initialise the GoogleV2 class and pass it to your Forms instance. This requires one parameter which is the site key.

Read more about [Google Recaptcha V2](https://developers.google.com/recaptcha/docs/invisible).

```typescript
import Forms, { GoogleV2 } from "@functionalities/forms";

new Forms("#form", {
  recaptcha: new GoogleV2("site_key")
});
```

> This will be accessible on the backend of the body through the `g-recaptcha-response` key.

## Flash Message

The Flash Message is an optional module that enables messages to be displayed on the DOM. Styling is left to the user's discretion.

```typescript
import Forms, { FlashMessage } from "@functionalities/forms";

new Forms("#form", {
  flashMessage: new FlashMessage("#flash-message", 5000)
});
```

```html
<div id="flash-message">
  <p data-fm-message></p>
  <button data-fm-close>Close</button>
</div>
```

### `data-fm-close`

Any element with this attribute that resides within the flash message container will have a click event set that will close the popup.

### `data-fm-message`

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
    messages?: {
        validationError?: string;
        error?: string;
        success?: string;
    };
    errorClass?: string;
    action?: string;
    customValidation?: Array<{
        name: string;
        validator: (value: string) => string;
    }>;
    attributes?: {
        inputRelation?: string;
        inputError?: string;
    };
    onSuccess?: (form: HTMLFormElement, res: any) => void;
    onError?: (form: HTMLFormElement, res: any) => void;
    send?: (action: string, data: FormData) => Promise<{
        success: boolean;
        message: string;
        errors?: ResErrors;
    }>;
}
```