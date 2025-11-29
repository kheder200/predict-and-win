to make the deploy works :
go to the setting and enable build pages from github actions.
in the file https://github.com/kheder200/predict-and-win/blob/main/vite.config.ts
and make the base is the repo name.
then go the 
https://github.com/kheder200/predict-and-win/blob/main/src/App.tsx
and make the 
            <Route path="/repo name " element={<Index />} />
