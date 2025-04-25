# Diagnostyka recruitment task
Bartosz Sosin
bartoszsosin3@gmail.com

## Instalation
###  1. Install PHP dependecies
`composer install`
### 2. Install JS(React) dependencies
`npm install`
### 3. Add env file attached to mail to root dir 
### 4. Run migrations
`php artisan migrate`
### 5. Run app in dev mode
`composer run dev`

## Functionalities

### Forms list
- list forms and it's fields
- enables to view example form implementation
- make deleting forms possible with refetching after deleting

### Add form 
- form allowing to build form field 
- preview table displaying all created fields
- preview table enables user to change order of fields in form
- "Create form" button which displays modal
- in modal user can give form name, description and action url
- user is constrained to add single button type field

### Form example
- example implementation of form
- it is flexible and can be placed in any component just by calling api endpoint and specyfing form ID
- input styles are customizable because of class property (my app uses tailwind so tailwind styles apply)
- inputs are validated and action url is being called after submiting
- form data is stored and handled when specifying action_url that my api serves

I've created logic for storing form data of whatever shape and it works but in laravel simple 
form with action prop crashes app. I might not handle it correctly but wanted to hold on task specyfication.

## Laravel + React Starter Kit
A modern Laravel 12 + React 19 application powered by Inertia.js, Tailwind CSS, TypeScript, and Vite.

### Requirements
- PHP ^8.2
- Node.js (v18+ recommended)
- Composer
- A SQL database (e.g., MySQL, PostgreSQL)

### Project dependencies
#### PHP (Composer)
Runtime
- laravel/framework – Laravel 12.x
- inertiajs/inertia-laravel – Inertia.js backend adapter
- laravel/sanctum – API token authentication
- laravel/tinker – REPL for Laravel
- tightenco/ziggy – Route access in JS
  Development
  fakerphp/faker – Fake data generator

Development

- laravel/pail – Developer-friendly logs
- laravel/pint – Code style fixer
- laravel/sail – Docker environment
- mockery/mockery – Mocking for unit tests
- nunomaduro/collision – Pretty CLI error handling
- phpunit/phpunit – Testing framework
- 
#### JavaScript (npm)
Runtime
- react, react-dom – React 19
- @inertiajs/react – Inertia React adapter
- tailwindcss, tailwind-merge, tailwindcss-animate
- @radix-ui/react*, @headlessui/react – Accessible UI components
- clsx, class-variance-authority – Class utilities
- lucide-react – Icon library
- zod – Type-safe schema validation
- react-hook-form – Form state management
- next-themes, sonner, vite, laravel-vite-plugin

### Development
- typescript, @types/react, @types/node
- eslint, prettier, and plugins – Code quality tools
- concurrently – Run multiple processes in parallel
