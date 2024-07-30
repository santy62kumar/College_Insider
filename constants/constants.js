const carousel_cards = [
    {
        img_src: "/assets/college-overview.jpg",
        title: "Overview",
        description: "Get all round information of the college before joining.",
    },
    {
        img_src: "/assets/connect_student.png",
        title: "Connect",
        description: "Chat with the Almuni of the College.",
    },
    {
        img_src: "/assets/college_ambassdor.jfif",
        title: "Ambassdor",
        description: "Be the Representative of Your College and help other students to find their dream college.",
    },
    {
        img_src: "/assets/need_help.jpg",
        title: "Need Help?",
        description: "Talk to us for clearing any Doubts!",
    },
];


const StateList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];


const htmlInvitation = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ambassador Invitation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: auto;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #555;
                    line-height: 1.5;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #999;
                }
            </style>
        </head>
        <body>

        <div class="container">
            <h1>Become an Ambassador for College Insider!</h1>
            <p>Dear Sir,</p>
            <p>We are excited to invite you to become an ambassador for College Insider! As an ambassador, you will have the opportunity to represent our college, engage with prospective students, and share your experiences.</p>
            <p>Your involvement will help shape the future of our college community and inspire others to join us. We believe you would be a fantastic fit for this role!</p>
            <a href="{invitationUrl}" class="button">Join Us Now</a>
            <p>Thank you for considering this opportunity. We look forward to your positive response!</p>
            <p>Best regards,<br>The College Insider Team</p>
            <div class="footer">
                <p>If you no longer wish to receive these invitations, please unsubscribe.</p>
            </div>
        </div>

        </body>
        </html>`;

        

module.exports = {
    carousel_cards,
    StateList,
    htmlInvitation,
};