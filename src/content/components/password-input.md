---
title: Password Input
description: A password field with a control that reveals what was typed.
category: Forms
registryItem: password-input
---

## Usage

```tsx
<PasswordInput>
  <PasswordInputLabel>Registry token</PasswordInputLabel>
  <PasswordInputControl>
    <PasswordInputInput placeholder="Paste the token" />
    <PasswordInputVisibilityTrigger>
      <PasswordInputIndicator fallback={<EyeOff />}>
        <Eye />
      </PasswordInputIndicator>
    </PasswordInputVisibilityTrigger>
  </PasswordInputControl>
</PasswordInput>
```

```vue
<template>
  <PasswordInput>
    <PasswordInputLabel>Registry token</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Paste the token" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator>
          <template #fallback>
            <EyeOff />
          </template>
          <Eye />
        </PasswordInputIndicator>
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</template>
```

## The indicator

`PasswordInputIndicator` renders its children while the value is visible and its fallback while it
is hidden, so the two icons live in one place rather than behind a ternary of your own.

## Why a reveal control at all

Hidden input is where typos go unnoticed, and a hidden field defeats a long passphrase more than it
protects it. The reveal button is a button, so it is reachable by keyboard, and the state is
announced through the trigger's label rather than only by the icon changing.

## Password managers

`ignorePasswordManagers` adds the attributes the common extensions look for to stay out of the
way. Turn it on for a field that holds a token or a recovery code rather than a password, where an
autofill offer is noise.
