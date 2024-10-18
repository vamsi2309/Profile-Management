## Getting Started

For initial setup run:

```bash
npm i
# or
yarn install
```
Then, run the Josn server with different port
```bash
json-server --watch db.json --port 3001
```
Then, run the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For build run:

```bash
npm run build
# or
yarn build
```

Addtional Information:

 Performance Optimizations: I implemented lazy loading for components, used useMemo for memoizing derived data, and useCallback for optimizing function references.
 File Structure: I followed a better code-splitting approach to ensure maintainability and efficient loading of the application.