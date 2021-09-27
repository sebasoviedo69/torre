
# Sprint Concept
    
    1. Review Endpoints
    2. Mindstorm
    3. Requirements
        - User Stories
    4. Architecture
        - Programming Language
        - Server
    5. Validation 


## Review Endpoints
    The objective is to generate an image based on the information of the person 
    using this endpoint https://torre.bio/api/bios/$username


## Mindstorm
    - Use the profile of a person
    - Classify users
    - Generate images
    - Implement blockchain


## Requirements

### About...
    - Azure Cloud Services
    - WebApp
    - NodeJS
    - Bootstrap
    - Torre's look and feel
    - Stellar Lumens Service

### User Stories

    1. Create Azure WebApp

        As: Software Developer Intern
        Action: Create an Azure WebApp
        Business Value: Generate a web page where users can access

        As: Software Developer Intern
        Action: Connect GitHub to Azure
        Business Value: Generate Continuos Integration and Continus Delivery in production environment

    2. Front-End

        As: Software Developer Intern
        Action: Create form to send ids
        Business Value: Allow users search by id and generate an image

        As: Software Developer Intern
        Action: Generate endpoint to display users' images
        Business Value: Show users' images based on their description

    3. Process User Information

        As: Software Developer Intern
        Action: Get data from endpoint
        Business Value: Gather information before the classification process

        As: Software Developer Intern
        Action: Find the amount of vocals on their descriptions
        Business Value: Classify users based on their descriptions

        As: Software Developer Intern
        Action: look for, manipulate and apply results to create a new image
        Business Value: Generate Images based on users' description

    4. Stellar Lumens Service (out of scope)

        As: Software Developer Intern
        Action: Post the info on the services
        Business Value: Create an unique record for each user on the specified blockchain


## Architecture


## Tasks

    1. Create Azure WebApp

        - Create NodeJs Server - 1h | Done
        - Create HTML Hello World - 1h | Done
        - Create Azure WebApp - 1h | Done
        - Connect Azure to GitHub for CI/CD - 1h | Done
        - Deploy Azure Hello World - 2h | Done

    2. Front-End

        - Create user form - 1h | Done
        - Post user data - 1h | Done
        - Handle requests on server side - 1h | Done
        - Create view to show results - 1h | Done
        - Create endpoint to handle results - 1h | Done

    3. Process User Information

        - Get data using id from Torre's endpoint - 1h
        - Handle response - 1h
        - Filter data - 1h  
        - Classify users - 2h
        - Convert user data into value colors - 2h
        - Read demo images - 1h
        - Merge user data with demo image - 2h
        - Save new image - 1h
        - Render image on client side - 2h
      
    4. Stellar Lumens Service (out of scope)
        - Call Stellar Service - 1h
        - Generate Blockchain Code - 4h
        - Render te token id on result endpoint - 1h