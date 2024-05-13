
# Photo Explorer

Photo Explorer is a React application that utilizes the Unsplash API to display and search for photos. It features a responsive design, infinite scrolling, and an autocomplete search bar with saved suggestions.
- **Note**: I was Facing error in creating an account on "flickr" so I have used Unsplash APIs for the development of this project. 

## Features

- **Default Image Display**: On initial load, the application displays a set of random photos fetched from the Unsplash API.
- **Search Functionality**: Users can search for photos using a fixed search bar at the top of the page. As users type, search results are displayed in real time. Also Implemented Debouncing in Serach to minimize the number of network calls.
- **Infinite Scroll**: The application loads more images as the user scrolls down, providing a seamless browsing experience.
- **Search Suggestions**: User search queries are saved locally, and previous searches are suggested as tags near the search bar when the user interacts with it again. If the Query does not change for 2 seconds then it will be updated in Local and only the latest 6 resuls will be stored in local storage.
- **Photo Preview Modal**: Clicking on a photo opens it in a modal, allowing for a closer view.
- **Responsive Design**: The application is fully responsive, ensuring a consistent experience across different device sizes.
- **Loaders and Placeholders**: Appropriate loading indicators are shown while photos are being fetched or loaded.
## Technologies Used

- ReactJS
- Material-UI (MUI) for the user interface components
- Unsplash API for fetching photo data

## Local Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/ffxhxd/xtracap-assignment.git
   ```
2. Navigate to the project directory:
   ```
   cd xtracap-assignment
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Caution
- As I am using free version of Unsplash APIs it only allows 50 api calls per hour [403 status error will be shown in UI]), in that case, for testing purposes, after exhausting that limit you can simply change the API Secret key in constants.js to this : 'XSpfZCMwVAh_3E_Wnpc-WgNTXXPpG9aJYC-E-jh8s4Y' , as this is a another project in created on Unsplash this will allow 50 more calls.

## Deployment

[Live Link](https://664159d7bad0a33564052fa6--rainbow-mooncake-bd9bb9.netlify.app/)

## Authors
[Fahad](https://github.com/ffxhxd)

