# [Sample plug-in: Add Yourself Plug-in]
## Purpose of the Sample Plug-in
This sample plug-in is available for educational purposes.  
Use this plug-in to understand how Kintone plug-ins work, and how they are structured.
A non-packaged version written with a single JavaScript file can be found here https://kintone.dev/en/tutorials/autofill-data/add-users-to-the-user-field-with-one-click/

## What the plug-in does
This sample plug-in adds yourself to a User Selection field with the click of a button in the record details page.

## Plug-in directory structure
This sample plug-in is created with the following directory structure.

src/  
├── html/  
│        └──── config.html  
├── css/  
│        ├──── 51-modern-default.css  
│        └──── config.css  
├── js/  
│        ├──── config.js  
│        └──── desktop.js  
├── image/  
│        └──── person.png  
└── manifest.json  

## How to use
To simply test out the plug-in on your Kintone domain, follow these steps:

1. Download the plug-in zip file  
Reference: https://github.com/kintone/SAMPLE-Date-input-button-Plug-in/releases
2. Install the plug-in into your domain  
Reference: https://get.kintone.help/hc/en-us/articles/115001519707-Installing-Viewing-Plug-ins
3. Add the plug-in to a specific Kintone App  
Reference: https://get.kintone.help/hc/en-us/articles/115001511188-Adding-Plug-ins-to-an-App
4. Make sure that a User Selection field and Blank Space field (with an Element ID set up) are set inside of the App form.
5. After a record is created, a button should appear where the Blank Space field was. Clicking the button will add the logged-in user to the User Selection field.

## How to modify
1. Fork to your repo
2. Make changes to files under /src
3. Repackage the plug-in by:  
 i. Zipping the manifest.json file, css directory, html directory, image directory and js directory into one zip file.  
 ii. Packaging the file using [kintone plug-in packer](https://plugin-packer.kintone.dev/).

## Pull Request Policy
As this repo exists for educational purposes, we will most likely turn down pull requests that contain updates with new features.  
Please feel free to host plug-ins with new features on your own repository.  
Bug fixes are happily accepted.
