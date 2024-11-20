## Ground Signal Take-home Coding Assignment

### Technologies Utilized

#### Frontend

- **React**: Implemented with a data store and custom hooks to encapsulate data-related logic. The application comprises:
  - A map component powered by react-map-gl
  - A search input component for text-based queries
  - A drawer component housing the add new location/place form and existing locations list
  - A modal popup displaying selected location details
  - A clickable tab for exporting starred location data
- **react-map-gl**: Chosen over Google Maps due to API key recognition issues
- **Recharts**: Utilized for rendering average store traffic bar charts
- **Zustand**: Employed for global state management, storing place data from JSON file for cross-component access
- **React Icons**: Provides a comprehensive icon collection for React
- **TailwindCSS**: Facilitates component styling without separate CSS files

#### Backend

- **json-server**: Sufficient for this assignment, though a more robust solution like Express.js or Apollo/GraphQL would be preferable in a production environment

### Requirement Implementation Notes

1. **Autocomplete Search Field**: Implements a 300ms debounce to optimize API calls during user input.
2. **Locations/Markers**: Persist on the map until a new search is executed.
3. **Location Starring**: Retrieves starred locations from the API by checking the "starred" property in each location object. Note: Initial implementation revealed inconsistencies in json-server's handling of boolean values and object IDs.
4. **CRUD/Data Synchronization**: Generally effective between Zustand store and json-server, with some areas requiring further investigation for real-time updates.
5. **User Interface**: Further refinement opportunities exist, particularly for the Place list in the right drawer.
6. **Unit Testing**: If time permits, I would implement unit tests to ensure the reliability of critical components and functions. This would involve writing tests that validate the expected behavior of the application’s features, such as the search functionality and data synchronization processes. Utilizing frameworks like Jest or Mocha would facilitate automated testing, helping to catch bugs early and improve overall code quality.

## Application Setup Instructions

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Launch the frontend application:
   ```
   npm run dev
   ```
4. Start json-server:
   ```
   npx json-server --watch data/db.json
   ```
