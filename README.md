
bookingApp
===================

Features
----------------------------------------------------------
- Locale Translations support
- Auto fetch translations from app
- Unit testing
- Sonar coverage and testing integration
- eslint and prettier configured
- CRA4
- React 17
- Easy Support for All Styles(Less, Scss, Css, module.css, Style Components)
- SVG can be import and use in img tag
- VSCode settings
- Redux-Toolkit
- Redux-Batch as enhancer
- Redux Thunk

Commands/ Scripts
----------------------------------------------------------
to run scripts you can use yarn or npm both
```javascript
npm run start
npm run build
npm run start:prod
npm run test
npm run coverage
npm run lint
npm run translations
npm run generate [module, atom, molecule, page] // generate code e.g npm run generate module
Theme=antd File=sample.json npm run crud // generate crud against the json file

```
## How to use code Generator
1. run `npm run  generate module` e.g `npm run  generate atom` 

## How to use Crud Generator
1. visit http://3.84.52.202:3269/
2. add entities and their attributes alongwith necessary information
3. generate output json file
4. place json file into your project root
5. run the command `npm run crud` with variables Theme, File e.g -> `Theme=antd File=sample.json npm run crud`
6. options : Theme can be material or antd
7. For example, CRUD for **employee** entity is generated via steps 1 to 6, now below steps are required to get it running: <br/>
   a. Add employee reducer in src/store/rootReducers.ts, example: 
   ```javascript
    // import
    import { employeeReducer } from 'app/modules/Employee/ducks/slice';

    // add below key in reducers object
    employee: employeeReducer,
   ```
   b. Add a page in src/app/pages folder, example:
   ```javascript
    import React from 'react';
    import EmployeeModule from 'app/modules/Employee';

    const employeePage = () => <EmployeeModule />;

    export default employeePage;

   ```
   c. Add a route in src/routing/Pages.tsx, example:
   ```javascript
    // import
    import employeePage from 'app/pages/employee';

    // add route inside <Switch>
    <Route path={`${path}employee`} component={employeePage} />
   ``` 
   d. If you are using material-ui, CRUD Generator will generator a validators file for each entity. 
   Run below command to get them running
   ```javascript
    npm i yup --save
   ``` 

CI/CD Pipeline Setup
----------------------------------------------------------
Bitbucket pipeline CI/CD is already setup with AWS S3.
you just need to set below repository variables
```
NPM_REGISTRY=3.84.52.202:4873
NPM_TOKEN='ASK MANAGER'
SONAR_PROJECT_KEY='SONAR CLOUD Project KEY'
SONAR_TOKEN
AWS_ACCESS
AWS_SECRET
AWS_REGION
```
DEV CI/CD Variables
```
ENCRYPTION_KEY_DEV=''
API_BASE_URL_DEV='https://abc.com'
ADMIN_BUCKET_DEV
```
TEST CI/CD Variables
```
ENCRYPTION_KEY_TEST=''
API_BASE_URL_TEST='https://abc.com'
ADMIN_BUCKET_TEST
```
PROD CI/CD Variables
```
ENCRYPTION_KEY_PROD=''
API_BASE_URL_PROD='https://abc.com'
ADMIN_BUCKET_PROD
```

**License**
MIT
