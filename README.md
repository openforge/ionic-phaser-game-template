# Mobile Game Template - Ionic & Phaser Monorepo

This is a template project for all you aspiring video game developers out there!   Want to use your web application skills for creating an awesome video game? 

This repository will give you a great starting point! 

# Instructions

1. Clone the repository using 'Use template' (and don't forget to give us a Star / Follow on Github, please!)
2. Search + Replace all instances of 'example-app-e2e' with your app name (important to do this first)
3. Search + Replace all instances of 'example-app' with your app name
4. Change the folder names for example-app and example-app-e2e to what you named for steps #1 and #2
5. Search + Replace all instances of 'openforge-ionic-monorepo-example' with your project name
6. Search + Replace 'company-name' with your company name.  This is the NX project scope that allows you to import libraries using @company-name

That's it for the renaming!  Now to test...

```npm install```

```npx nx run example-app:serve``` (where example-app is the name you replaced with above)

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

The normal NX command to generate an app is `nx g @nrwl/react:app my-app` ; however, there are some special steps to generate an Ionic App.  These are defined well in [Eric Jeker's post here](https://medium.com/@eric.jeker/how-to-integrate-ionic-in-nrwl-nx-3493fcb7e85e)

When using Nx, you can create multiple applications and libraries in the same workspace.

# NX Original Instructions

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@openforge-ionic-monorepo-example/mylib`.

## Development server

Run `npx nx run example-app:serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

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

