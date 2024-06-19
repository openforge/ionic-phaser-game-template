# Mobile Game Template - Ionic & Phaser Monorepo

This is a template project for all you aspiring video game developers out there! Want to use your web application skills for creating an awesome video game?

This repository will give you a great starting point!

# Instructions

1. Clone the repository using 'Use template' (and don't forget to give us a Star / Follow on Github, please!)
2. Select which framework from 'apps/' folder you are going to use and remove the others if necessary.
3. Search + Replace all instances of 'example-app-"frameworkName"-e2e' with your app name (important to do this first)
4. Search + Replace all instances of 'example-app-"frameworkName"' with your app name
5. Change the folder names for example-app-frameworkName and example-app-frameworkName-e2e to what you named for steps #1 and #2
6. Search + Replace all instances of 'openforge-ionic-monorepo-example' with your project name
7. Search + Replace 'company-name' with your company name. This is the NX project scope that allows you to import libraries using @company-name

That's it for the renaming! Now to test...

`npm install`

`npx nx run example-app-angular:serve` (where example-app-angular is the name you replaced with above)

You should now load your example app!

# Checking Licenses

To run the license checker, use
`npx license-checker --summary` or vanilla `npx license-checker`

# Important - Utilizing this Repo

Most of the commands to generate projects/capabilities/apps are default to NX, Ionic, or Angular (in that order), so we will NOT include their specific instructions since as the packages update so will the documentation.

With that said, there are some special things to keep in mind...

## Generating a Project - Additional Step

After any project is created by NX, we MUST add StyleLint

nx g nx-stylelint:configuration --project <projectName>

## Generate an application

The normal NX command to generate an app is `nx g @nx/react:app my-app` ; however, there are some special steps to generate an Ionic App. These are defined well in [Eric Jeker's post here](https://medium.com/@eric.jeker/how-to-integrate-ionic-in-nrwl-nx-3493fcb7e85e)

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a VUE application

Since Nx doesn't _officially_ support Vue, we configured this project to make it work for you 😎

Nx supports Vite [Visit Nx Official docs for Vite](https://nx.dev/packages/vite) to learn more, and Vite supports Vue, so we used this configs to run Vue into our monorepos!

1. Run `npm create vite@latest my-vue-app -- --template vue`.
2. Run `cd my-vue-app && npm install`.
3. Go to `apps/my-vue-app` and create a new `project.json`.
4. Copy the `properties` from the `project.json` file from `apps/example-vue-app` and paste it inside the new `project.json` file generated for the new Vue application in the step 3.
5. Inside the new `project.json` file generated, replace all `example-app-vue` instances with the name of your Vue app created in step 1.
6. Now you just need to `extends` the `tsconfig.json` root file in your `tsconfig.json` Vue application file by adding `"extends": "../../tsconfig.json"` at the top of the array.

And that's it! You will be able to run and serve your Vue application by running `nx serve your-app-name` (where your-app-name is the name of the application you created).

## Adding Capacitor to your application

We are using Capacitor to run the project in mobile. We configured Capacitor to be able to run in monorepos, so if you want to add capacitor into your application follow this steps:

1. Make sure you have run `nx build your-app-name` (Where `your-app-name` will be the name of your application).
2. Make sure your application has the `package.json` created, if not create one at the root of you application folder `apps/your-application-folder` and add the folowing properties: `"name": your-app-name`, `"version": "0.0.0"`, `"licence: "MIT""`, `"private: true"`, `"dependencies: {}"`, `"devDependencies": {}` (where `your-app-name` will be replaced with your currently application name).
3. Go to `apps/your-app-name` and run `npm install @capacitor/cli --save-dev`, then run `npm install @capacitor/core`.
4. Nowe it's time to initialize Capacitor. Go to `apps/your-app-name` and run `npx cap init`.
5. In the project root folder, search for the `ionic.config.json` file and add `your-app-name` as a new project in the `projects` array. You can copy&paste the example one and just replace all instances.

## Adding a Capacitor Platform to your application

1. At the root of your project, run `ionic capacitor add platform --project=your-app-name` (Where `platform` could be `ios` | `android`) (Where `your-project-name` will be the project name you set into the `ionic.config.json` file).

## Running your application with Capacitor

1. Run `nx build your-app-name` (Where `your-app-name` will be the name of your application).
2. Run `cd apps/your-app-name && npx cap copy`.
3. Run `cd apps/your-app-name && npx cap sync`.
4. Run `cd apps/your-app-name && npx cap open platform`. (Where `platform` could be `ios` | `android`)

# NX Original Instructions

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Generate a library

Run `nx g @nx/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@openforge-ionic-monorepo-example/mylib`.

## Development server

Run `npx nx run example-app-angular:serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nx/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
