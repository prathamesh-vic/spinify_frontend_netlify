# track-app-spinify

## 📖 Resources

- [Track Apps](https://hubn.qa20.narvar.qa/admin/apps)
- [Video Tutorials](https://drive.google.com/drive/folders/1UOBbGJByu9Bf-dlaegyYDlOhjanvDGoO?usp=drive_link)

## 🏗️ Create Your App

> [!NOTE]
> Skip this section if you have already created an new app in Hub and
> installed it.

1. Navigate to https://hubn.qa20.narvar.qa/admin/apps
2. Click the `Create New App` button
3. Fill in the form fields with the all the form inputs
4. Navigate back to https://hubn.qa20.narvar.qa/admin/apps
5. Find your application in the list and click the `Install` button

A beta app version `v0.1.0` is created automatically once your application has
been created and an initial manifest.json file will be available to download via
the details page you are taken to after application creation. Along with this
you can also get started quickly by downloading our Devkit.

## 📦 Get Started w/ Devkit

> [!NOTE]
> Using the Devkit is not required, if you prefer something like Vite
> App w/ React & Typescript you can always fire up a new app using your preferred
> development setup. Ensure to copy the `manifest.json` to your project and
> install `cth` SDK to your project.

> [!TIP]
> The Devkit is built with JavaScript and requires node to run. If you do not
> have the latest LTS version of Node installed on your machine, go to the
> [NodeJS](https://nodejs.org/en) website and download the latest LTS version and
> install on your machine before continuing.

1. This DevKit includes the following files:

```
├── src
│   ├── lib
│   │   ├── cth
│   ├── main.js
├── index.html
├── package.json
```

2. The `package.json` includes a few helpful packages to help get started.
   This project is based on vite. Run the following in the prefferred shell to
   start your development environment:

```shell
npm install
npm run dev
```

3. Take note of the `manifest.json` file, you can edit this file and update it
   to take advantage of how your application interacts with track page and your
   development environment. (More on that below).
4. The development environment should start up at `http://localhost:5173`. This
   should match the `component_url` property in the initial `0.1.0` version of
   your manifest.

## ⚙️ Configure Track Experience

You will need to opt-in to Custom Components by installing them. You will now
install the custom component on your own tenant/retailer.

Go to https://hubn.qa20.narvar.com/admin/apps to view already installed
components. In order to install new custom component, click the Install
Component button which will lead you to a new page where you can browse all
available custom components. Press the Install button and you should see a
successful response.

Navigate to https://hubn.qa20.narvar.com/track/versions and choose the Track
Experience you want to add the custom component to. Choose an empty block or
modify an existing block and choose your new custom component.

The right-hand menu will display a rendered version of your properties file.
Choose values for the required fields.

Press the Save button in the upper right hand corner when done. Press the
Preview button to see the Track page. Your custom component should be visible.

## 🆕 Update App Version

Updates to your manifest can happen at any time. To propogate those you will
need to upload your new manifest.

1. Navigate to https://hubn.qa20.narvar.qa/admin/apps
2. Find your app in the list
3. Navigate the application's details page
4. Upload your updated `manifest.json` file

## 🧠 Definitions

### Manifest Configuration

- The `manifest_version` parameter allows Narvar to modify the manifest schema
  without breaking compatibility with existing custom component manifests. It
  will always be the value 1 until we decide to create a new version.
- The `component_version` parameter allows the custom component developer to
  version their component.
- The `component_url` parameter is the URL that Dynamic Track will use to load
  the component.
- The `properties` parameter describes how the UI will be displayed when the
  retailer is configuring the custom component.
  - The `id` parameter is the canonical name of the property. This id should be
    a stable value that can be used for localization and allow the custom
    component developer to reference later when displaying the custom component
    on Dynamic Track.
  - The `name` parameter is what will be shown to the user.
  - The `description` parameter is an optional value that explains what the
    value is for. You can use basic HTML elements in the description, including
    anchor tags for links.
  - The `dataType` parameter is the type that the data will be stored as. We
    only support string, number and boolean. If an optional parameter is not
    specified, we will store that value as null.
  - The `inputType` parameter is the HTML form field type that will be displayed
    to the user. We only support text, select and checkbox types.
  - The `required` parameter determines whether or not the property is required.
    A retailer-user must specify all required properties.
  - The `scopes` parameter lists the data permission scopes that component
    requires. These will be shown to the retailer-user when they are viewing the
    component in the list of available components. The retailer-user will have
    to accept these scopes when installing the component. Dynamic Track will
    only send data that matches the scopes the retailer has agreed to.
