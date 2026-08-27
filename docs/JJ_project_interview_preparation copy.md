# 1. Introduction

## Tell me about yourself

Hi, I'm Mateusz. I'm a Software Engineer with around four years of commercial experience, mainly with React, Next.js and TypeScript.

My background is mostly in B2B and business applications, including API integrations, forms, server-state management, testing and accessibility.

Recently I've also been developing my backend skills with Node.js, Express, PostgreSQL and Prisma.

I'm now looking for a longer-term project where I can work in a mature engineering environment and gradually grow towards full-stack development.

# 2. Current / Recent Project

## Tell me about your recent project

My most recent assignment was a short-term internal project where I worked on an interactive data visualization.

The application visualized relationships between different technology domains, application areas, industries and technology trends.

My main responsibility was to redesign the way the graph was presented because the original visualization displayed too much information at once and was difficult to navigate.

I prepared a proof of concept where the visualization initially displayed a simplified overview and allowed users to progressively explore more detailed relationships.

The project also required me to work with unclear and changing requirements, discuss different ideas with stakeholders and quickly validate possible solutions.

The assignment was planned as short-term support until the end of August, so now I'm looking for a longer-term project where I can work within a larger engineering team.

# 3. JavaScript

## What is a closure?

A closure happens when a function keeps access to variables from its lexical scope even after the outer function has finished executing.

Closures are commonly used for encapsulation, callbacks and function factories.

```js
function counter() {
  let count = 0;

  return () => ++count;
}

const increment = counter();

increment(); // 1
increment(); // 2
```

## Explain the event loop

JavaScript executes synchronous code on the call stack.

Asynchronous operations are handled by the runtime environment and their callbacks are scheduled in queues.

Promise callbacks are placed in the microtask queue, while operations such as `setTimeout` use the task or macrotask queue.

When the call stack becomes empty, JavaScript processes microtasks before moving to the next macrotask.

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Output:

```text
A
D
C
B
```

## What is the difference between var, let and const?

`var` is function-scoped and can be redeclared.

`let` and `const` are block-scoped.

`var` is hoisted and initialized with `undefined`, while `let` and `const` are hoisted but remain in the temporal dead zone until initialization.

I normally use `const` by default and `let` only when reassignment is necessary.

## What is hoisting?

Hoisting means that declarations are processed before code execution.

Function declarations can generally be called before their definition.

`var` is hoisted and initialized with `undefined`.

`let` and `const` are also hoisted, but they cannot be accessed before initialization because of the temporal dead zone.

## What is the difference between == and ===?

`==` performs type coercion before comparison.

`===` compares both the type and the value.

In production code I normally use strict equality because it is more predictable.

## What is the difference between map, filter and reduce?

`map` transforms every element and returns a new array.

`filter` returns only elements that match a condition.

`reduce` combines multiple values into a single result.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);
const even = numbers.filter((n) => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## Promise.all vs Promise.allSettled

`Promise.all` rejects when any of the promises rejects.

`Promise.allSettled` waits until all promises finish and returns the result of every operation.

I would use `Promise.all` when all operations are required to succeed and `Promise.allSettled` when partial success is acceptable.

## Shallow copy vs deep copy

A shallow copy creates a new top-level object, but nested objects still share references with the original object.

A deep copy also creates independent copies of nested structures.

For example, `{ ...original }` creates only a shallow copy.

---

# 4. TypeScript

## What is the difference between type and interface?

Both can describe object structures.

Interfaces work particularly well with extension and declaration merging.

Types are more flexible when working with unions, intersections and more complex type compositions.

In most application code, I mainly care about consistency within the codebase.

## What is the difference between any and unknown?

`any` effectively disables type checking.

`unknown` represents a value whose type is not yet known, but TypeScript requires us to narrow the type before using it.

Because of that, I prefer `unknown` when dealing with genuinely unknown values.

## What are generics?

Generics allow us to create reusable functions, components or types while preserving type information.

```ts
function identity<T>(value: T): T {
  return value;
}
```

## What is a union type?

A union means that a value can have one of several possible types.

```ts
type Status = 'idle' | 'loading' | 'success' | 'error';
```

## What is an intersection type?

An intersection combines multiple types.

```ts
type Admin = User & Permissions;
```

## What is type narrowing?

Type narrowing means reducing a broader type into a more specific type.

We can use:

- `typeof`
- `instanceof`
- `in`
- custom type guards
- discriminated unions

```ts
function printValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

## Useful TypeScript utility types

- `Partial<T>` makes all properties optional
- `Required<T>` makes all properties required
- `Pick<T, K>` creates a type containing selected properties
- `Omit<T, K>` creates a type without selected properties
- `Record<K, T>` creates an object type with specific keys and values
- `Readonly<T>` makes properties immutable
- `keyof` creates a union containing the keys of another type

```ts
type User = {
  id: number;
  name: string;
};

type UserKey = keyof User;
// "id" | "name"
```

---

# 5. React

## What causes a React component to re-render?

A component can re-render when:

- its state changes
- its parent re-renders
- a consumed context value changes

A React render does not necessarily mean that the DOM will be updated.

React first performs reconciliation and updates only the necessary parts of the DOM.

## useMemo vs useCallback

`useMemo` memoizes a calculated value.

`useCallback` memoizes a function reference.

I don't use them automatically because memoization also has a cost.

I normally use them when referential stability matters or when profiling shows that an expensive calculation or unnecessary render is causing a real performance problem.

## What does React.memo do?

`React.memo` can prevent a component from re-rendering if its props have not changed.

However, I usually introduce memoization only after identifying an actual performance problem rather than using it everywhere.

## When should you use useEffect?

I mainly use `useEffect` when React needs to synchronize with something outside React.

For example:

- browser APIs
- subscriptions
- third-party libraries
- some asynchronous side effects

I try not to use effects for values that can simply be calculated during rendering.

## What should be included in the useEffect dependency array?

The dependency array should contain reactive values used inside the effect.

Missing dependencies can create stale closures.

Incorrect dependencies can also cause unnecessary effect executions.

## Controlled vs uncontrolled components

A controlled input gets its value from React state and updates through event handlers.

An uncontrolled input stores its value directly in the DOM and can be accessed using a ref.

I have worked extensively with React Hook Form, which can use uncontrolled inputs efficiently and reduce unnecessary renders in complex forms.

## Why are keys important in React?

Keys allow React to identify elements between renders.

Stable unique keys help React preserve component identity and state during reconciliation.

## Why can using an array index as a key cause problems?

If elements are reordered, inserted or removed, React may associate component state with the wrong element.

Therefore I prefer stable identifiers coming from the data whenever possible.

## Context vs state management library

Context works well for relatively stable global values such as authentication, theme or configuration.

For more complex and frequently changing client-side state, a dedicated state management solution may be a better fit.

I also distinguish client state from server state.

## Context vs React Query

I distinguish between client state and server state.

React Context works well for relatively stable global values such as authentication, theme or configuration.

For server state I normally prefer React Query because it handles:

- caching
- loading states
- background refetching
- invalidation
- synchronization with the server

## What is React Query useful for?

React Query handles server state such as fetching, caching, synchronization, invalidation, background refetching, loading states and error states.

It helps separate server state from local UI state and removes a lot of manual data-fetching logic.

## How would you optimize a slow React application?

First, I would measure the application using tools such as React DevTools Profiler and browser performance tools.

Then I would identify the actual bottleneck.

Depending on the problem, possible solutions could include:

- reducing unnecessary renders
- splitting large components
- memoization
- list virtualization
- code splitting
- improving API usage
- caching
- reducing bundle size

I prefer optimizing based on measurements rather than adding `useMemo` or `useCallback` everywhere.

---

# 6. Testing

## What is your approach to testing React applications?

I prefer testing behavior rather than implementation details.

With React Testing Library, I focus on what the user can see and interact with instead of testing internal component state.

I also have experience with Playwright for end-to-end testing.

## Unit vs integration vs E2E tests

Unit tests verify small isolated pieces of logic.

Integration tests verify how multiple parts of an application work together.

End-to-end tests verify complete user flows in an environment that is close to the real application.

## What should you test in React?

I prefer to test observable behavior.

For example, instead of checking internal component state, I test whether:

- the correct content is rendered
- the user can interact with the UI
- validation works
- API-driven states are handled correctly
- important user flows work as expected

---

# 7. Behavioral / General Questions

## Why are you interested in this project?

What attracted me to this opportunity is the combination of the technology stack and the team structure.

React and TypeScript are already my strongest technologies, while I'm actively developing my Node.js and backend skills.

I'm also looking for a longer-term project where I can work with other engineers, participate in code reviews, work with testing and architecture and gradually take more ownership.

From what I've heard so far, this project seems aligned with the direction in which I would like to develop.

## What are you looking for in your next assignment?

I'm mainly looking for a longer-term project with a mature engineering environment.

I would like to work within a larger technical team where development includes things like code review, testing, architecture discussions and a structured release process.

Technically, I would like to continue working with React and TypeScript while gradually gaining more production experience with Node.js and backend development.

I'm also looking for a project where I can take increasing ownership as I become more familiar with the product.

## Tell me about your recent project

My most recent assignment was a short-term internal project focused on interactive data visualization.

I worked on redesigning a complex graph so users could explore relationships more clearly instead of seeing everything at once.

I prepared a proof of concept, validated it with stakeholders and iterated on the solution based on feedback.

The project also gave me experience working with unclear requirements and quickly validating different technical approaches.

Because the assignment was temporary from the beginning, I'm now looking for a longer-term project where I can develop within a larger engineering team.

## How do you handle unclear requirements?

First, I try to separate confirmed requirements from assumptions.

I ask stakeholders questions about the expected outcome and priorities.

When appropriate, I prepare a small proof of concept to validate the direction before investing too much time into the full implementation.

I also like documenting important decisions because it helps make sure that everyone has the same understanding afterwards.

## How do you work with other developers, QA and stakeholders?

I believe communication between development, QA and stakeholders is very important.

With other developers, I like discussing technical decisions, participating in code reviews and sharing context instead of treating tasks as completely isolated pieces of work.

With QA, I prefer involving them early enough so that acceptance criteria and potential edge cases are clear before the implementation is finished.

With stakeholders, I try to understand the business problem behind the requirement rather than only implementing the exact request.

If something is technically risky or unclear, I try to communicate it early and propose possible alternatives.

## What would you like to develop further?

The main area I would like to develop further is backend engineering.

My commercial experience is currently much stronger on the front-end, especially with React and TypeScript.

I've already been developing backend skills using Node.js, Express, PostgreSQL and Prisma, but I would like to gain more production experience and work with backend engineers who can help me understand architecture and good practices at a deeper level.

In the longer term, I'm interested in becoming a stronger full-stack engineer and gradually taking more technical ownership.

## What are your strengths?

I would say my main strengths are adaptability, ownership and communication.

I'm comfortable entering unfamiliar codebases and trying to understand both the technical implementation and the business context.

I also care about maintainability and usability rather than only making something technically work.

When I encounter something I don't know, I'm comfortable researching it, asking questions and learning quickly.

## What is one of your weaknesses?

My commercial experience is significantly stronger on the front-end than on the backend.

I already understand backend fundamentals and have been actively working with Node.js, Express, PostgreSQL and Prisma, but production backend engineering is still an area where I have more to learn.

That's also one of the reasons why a project that allows me to gradually work across the stack is interesting to me.

## How do you deal with disagreement in code review?

I try to separate personal preference from technical arguments.

If there is an established convention in the project, I normally follow it.

Otherwise, I explain the trade-offs behind my approach and I'm happy to change it if another solution is more maintainable or better suited to the requirements.

For larger architectural disagreements, I prefer discussing maintainability, complexity and business requirements rather than personal coding style.

## What do you do when you make a mistake?

I try to communicate it early, understand the impact and fix the immediate problem.

After that, I try to understand why the issue happened and whether we can improve the process, tests or code structure to prevent the same problem in the future.

---

# 8. Node.js Minimum

## Authentication vs authorization

Authentication answers: "Who is the user?"

Authorization answers: "What is this user allowed to do?"

## What is Express middleware?

Middleware is a function executed during the request-response lifecycle.

It can:

- inspect the request
- modify the request or response
- terminate the request
- pass control to another middleware

Typical examples include:

- authentication
- authorization
- validation
- logging
- error handling

## REST API basics

- `GET` reads data
- `POST` creates a new resource
- `PUT` replaces or fully updates a resource
- `PATCH` partially updates a resource
- `DELETE` deletes a resource

## Common HTTP status codes

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

## JWT

A JWT is a signed token that can contain claims about a user.

A common authentication flow is:

1. User logs in.
2. The server verifies credentials.
3. The server issues a token.
4. The client sends the token with future requests.
5. The backend verifies the token and identifies the user.

A JWT should not contain sensitive data just because it is encoded.

---

# 9. What to Say When You Don't Know Something

Never guess confidently when you don't know the answer.

Useful phrases:

> Let me think about this for a moment.

> I haven't worked with this particular case before, so I don't want to guess.

> My initial understanding would be..., but I would verify that before making a technical decision.

> I'm familiar with the general concept, although I haven't used it directly in production.

> I haven't encountered this exact situation before, but the way I would approach it is...

> That's not something I've worked with directly yet, but I'm interested in learning it.

Taking a few seconds to think is completely fine.

---

# 10. Questions to Ask Them

Do not finish the interview with:

> No, everything is clear.

Ask at least 2 or 3 questions.

## Product

> Could you tell me more about the actual product and what I would be working on?

> Is this mainly a new development project, a redesign of an existing product, or ongoing development of an existing application?

## Team

> How is the development team currently structured?

> How many front-end and back-end developers are currently working on the project?

> Who would I work with most closely on a day-to-day basis?

## Workflow

> What does the typical development workflow look like from picking up a ticket through development, code review, testing and deployment?

> How does the team organize its work day to day?

> Do you work with Scrum, Kanban or another Agile approach?

## Code Review

> How does the code review process work within the team?

> Are pull requests normally reviewed by one developer or multiple developers?

## Testing

> What is the current approach to automated testing?

> Do you use unit, integration and end-to-end tests?

> How closely do developers and QA work together during implementation?

## Architecture

> How are technical and architectural decisions usually made in the team?

> Is there a dedicated architect involved in the project?

> What are the main technical challenges the team is currently dealing with?

## React and Node.js

> How is the work divided between React and Node.js?

> Would I be expected to work across both from the beginning, or would I gradually take on more backend responsibilities?

> What does the current backend stack look like?

## Expectations

> What would you expect from me during my first two or three months in the project?

> What would success look like for someone joining this role?

## Project Duration

> How long is the engagement currently expected to continue?

> Is there a possibility of extending the assignment beyond the end of the year?

---

# My Top 5 Questions

1. Could you tell me more about the actual product and what I would be working on?
2. How is the development team structured?
3. What does the typical development workflow look like from picking up a ticket through code review, testing and deployment?
4. How is the work divided between React and Node.js?
5. What would you expect from me during my first two or three months in the project?

---

# Seven Questions to Practice Out Loud

## 1. Tell me about yourself

Hi, I'm Mateusz. I'm a Software Engineer with around four years of commercial experience, primarily focused on front-end development with React, Next.js and TypeScript.

Most of my experience comes from B2B platforms and business applications. I've worked with API integrations, complex forms, server-state management, testing, accessibility and reusable component architectures.

Recently, I've also been expanding towards full-stack development with Node.js, Express, PostgreSQL and Prisma.

I'm now looking for a longer-term project where I can work in a mature engineering environment and continue developing both front-end and backend skills.

## 2. Why are you interested in this project?

What attracted me to this opportunity is the combination of the technology stack and the team structure.

React and TypeScript are already my strongest technologies, while I'm actively developing my Node.js and backend skills.

I'm also looking for a longer-term project where I can work with other engineers, participate in code reviews, work with testing and architecture and gradually take more ownership.

From what I've heard so far, this project seems aligned with the direction in which I would like to develop.

## 3. What are you looking for in your next assignment?

I'm mainly looking for a longer-term project with a mature engineering environment.

I would like to work within a larger technical team where development includes code review, testing, architecture discussions and a structured release process.

Technically, I want to continue working with React and TypeScript while gradually gaining more production experience with Node.js and backend development.

## 4. Tell me about your recent project

My most recent assignment was a short-term internal project focused on interactive data visualization.

I worked on redesigning a complex graph so users could explore relationships more clearly instead of seeing everything at once.

I prepared a proof of concept, validated it with stakeholders and iterated on the solution based on feedback.

The assignment was temporary from the beginning, so I'm now looking for a longer-term engineering project.

## 5. How do you handle unclear requirements?

First, I try to separate confirmed requirements from assumptions.

I ask stakeholders questions about the expected outcome and priorities.

When appropriate, I prepare a small proof of concept to validate the direction before investing too much time into the full implementation.

I also like documenting important decisions so everyone has the same understanding afterwards.

## 6. How do you work with other developers, QA and stakeholders?

With other developers, I like discussing technical decisions, participating in code reviews and sharing context.

With QA, I prefer involving them early enough so acceptance criteria and edge cases are clear before implementation is finished.

With stakeholders, I try to understand the business problem behind a requirement instead of only implementing the literal request.

If something is technically risky or unclear, I communicate it early and suggest alternatives.

## 7. What would you like to develop further?

The main area I would like to develop further is backend engineering.

My commercial experience is much stronger on the front-end, especially with React and TypeScript.

I've already been working with Node.js, Express, PostgreSQL and Prisma, but I would like to gain more production backend experience.

In the longer term, I would like to become a stronger full-stack engineer and gradually take more technical ownership.

---

# Final Interview Reminders

- Speak slowly.
- You do not need to answer immediately.
- Take a few seconds to think when necessary.
- Do not pretend to know something you do not know.
- Do not criticize the current Emerging Tech project.
- Present the current assignment as intentionally short-term.
- Be honest that front-end is currently your strongest area.
- Present backend as an area you are actively developing.
- Show interest in the product, team and engineering process.
- Ask at least two or three questions at the end.
- Do not memorize every answer word for word.
- Practice explaining the same idea in your own words.
