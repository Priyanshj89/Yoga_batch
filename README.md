# Mock Yoga Payment Batch Form

This is a simple application that takes basic user details and gives the option to select the timings of the batch for the current month and pay for it. The user cannot
pay again for the same month. Validation have been added to the form to get the required fields as well as other validation such as age restriction.

There are a few cases that needs to be tackeled for this problem statement.</br>
1] The customer, if paying for the first time, then his personal details as well as the batch timings selected are stored in the database.</br>
2] The customer, if tries to pay again for the same month with different or same batch timings, a error notification is shown.</br>
3] The customer, if paying again with the same email for another month then only the new batch timings are stored for that user.</br>

A three tier architecture is being used to seperate the view, business logic and database. It allows flexibility in presentation and better handling of business logic. The Tech stack used is MERN stack.</br>
- React is being used for frontend.</br>
- Nodejs for backend with express framework.</br>
- MongoDB database for storing all the details.</br></br>

Some more Information:-</br>
1] The application has been deployed on Cyclic.</br>
2] Axios is being used to make the REST Api call.</br>
3] At the start of every month at 1am, a job is scheduled to expire the enrolled status of all the enrolled individuals for the past month.</br>
4] A user's past history of enrolment's month and year is stored for future reference and studying trends as well as customer retention.</br>

LIVE URL: https://fine-rose-coral-suit.cyclic.app/ </br>
GITHUB URL: https://github.com/Priyanshj89/Yoga_batch

## ER Diagram
![Screenshot (1695)](https://user-images.githubusercontent.com/55475866/207077278-5e05ab36-a535-4ff2-8283-d0e2e0eeb555.png)
