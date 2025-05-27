# TypeScript Key Features: `keyof` and Type Inference

TypeScript has become a widely adopted language for building scalable and maintainable applications. As a statically typed superset of JavaScript, it provides a host of features that help developers write cleaner, more robust code. In this blog post, we'll dive into two important TypeScript features that significantly enhance the development experience: **the `keyof` keyword** and **type inference**.

## What is the Use of the `keyof` Keyword in TypeScript?

The `keyof` keyword in TypeScript is a powerful tool that allows you to extract the **keys** of a type as a union of string literals. This can be extremely useful in scenarios where you need to operate on specific properties of an object or enforce stricter type constraints.

### Basic Example of `keyof`

Consider a scenario where you want to create a function that can only accept the keys of a given object. Here's how you can leverage the `keyof` keyword:

```typescript
// Define a simple object type
interface User {
  name: string;
  age: number;
  email: string;
}

// Function that takes the key of User object
function getUserProperty(user: User, key: keyof User): string | number {
  return user[key];  // Dynamically access the property based on the key
}

// Usage
const user = { name: "John", age: 30, email: "john@example.com" };
console.log(getUserProperty(user, "name")); // Output: John
console.log(getUserProperty(user, "age"));  // Output: 30
