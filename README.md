# HTTPly
Thomas Jordan, Mason Moore, Thomas Kim

Try it out: https://thomasnjordan.github.io/HTTPly/   

HTTPly is a project aimed at streamlining the way users interact with HTTP requests by providing them with a user-friendly drag-and-drop interface. This platform addresses a significant challenge encountered by both novice and seasoned web developers manipulating HTTP requests - learning how to do it. (Learning about CORS, request creation, JavaScript fetch requests, advanced API token parsing, dealing with incompatable JSON, networking, etc) It's an incredibly complex task that HTTPly was designed to streamline.

This tool woould allow for:

1. **Facilitating Collaborative Design:** HTTPly promotes collaboration among designers by providing a common platform where complex HTTP request workflows can be designed and shared. Teams can work on intricate projects without the need for extensive coding expertise.

2. **Educating Non-Technical Team Members:** HTTPly acts as an educational tool, providing a platform to learn and manipulate web requests.

3. **Streamlining Onboarding:** For new engineers entering the field, HTTPly serves as a valuable resource. It accelerates the onboarding process by offering a hands-on, practical way to learn the intricacies of API interactions and HTTP requests. Which can allow for a quicker way to learn this important task.

4. **Resource to Learn Web Security** This is a valuable tool for new security researchers to learn to manipulate web requests. 

# Demo
### Slides
https://docs.google.com/presentation/d/1Cnj1ZtkwkSxOhgL1aaMsyJ8ZCbutAkqKfOkfzowcaN8/edit#slide=id.p
## Steps to Recreate
First install all the required components:
```
npm install axios@^1.6.0 \
cors@^2.8.5 \
express@^4.18.2 \
blockly@^10.2.2 \
express-session@^1.17.3 \
http-server -save
```
Then start the two servers:   
Blockly Server: In the blockly directory (not `node_server`), run: `http-server`   
Interpreter Server: In the `node_server` directory, run `node server.js`  


Now navigate to http://localhost:8080/ to view the blockly program.    
Begin by placing a "Generate HTTP Request" block. Drag a URL block into the URL slot.   
### Create a block
- Drag the `Generate HTTP Request` block into the workspace. 
- Fill in each of the fields you know, such as the URL and Header and Method
- When you've finished filling in the data with the other blocks, click on <b>`Generate JSON`</b> to preview the request.
### Send a request
- When you're ready to send the request, click `Run Javascript` to send it.
### Results
- Results with be viewable in the panel on the right. 
![Image of our Blockly program](https://github.com/ThomasNJordan/HTTPly/blob/main/docs/img/blockly.png)

# Contributing to This Project
The code to create new blocks can be found in the `/src/custom_blocks.js` file. To change how the server processes or manages requests, that code is in the `src/node_server/server.js` file.